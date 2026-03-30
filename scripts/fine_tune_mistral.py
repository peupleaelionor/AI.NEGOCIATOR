"""
Fine-tune Mistral-7B with LoRA (4-bit quantization).
Requires a GPU with at least 16GB VRAM (or use Google Colab).
Usage: python scripts/fine_tune_mistral.py
"""
import torch
from pathlib import Path
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_dataset

MODEL_NAME = "mistralai/Mistral-7B-v0.1"
DATASET_PATH = "data/negotiation_dataset.jsonl"
OUTPUT_DIR = "models/fine_tuned_mistral"


def tokenize(examples, tokenizer):
    full_texts = [
        f"### Instruction:\n{inp}\n\n### Réponse:\n{out}"
        for inp, out in zip(examples["input"], examples["output"])
    ]
    return tokenizer(full_texts, truncation=True, max_length=512, padding="max_length")


def main():
    dataset_path = Path(DATASET_PATH)
    if not dataset_path.exists():
        print(f"Dataset not found: {dataset_path}. Run generate_dataset.py first.")
        return

    print(f"Loading base model: {MODEL_NAME}")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    tokenizer.pad_token = tokenizer.eos_token

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        load_in_4bit=True,
        device_map="auto",
        torch_dtype=torch.float16,
    )
    model = prepare_model_for_kbit_training(model)

    lora_config = LoraConfig(
        r=8,
        lora_alpha=32,
        target_modules=["q_proj", "v_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
    )
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    dataset = load_dataset("json", data_files=str(dataset_path), split="train")
    tokenized_dataset = dataset.map(
        lambda x: tokenize(x, tokenizer), batched=True, remove_columns=dataset.column_names
    )

    training_args = TrainingArguments(
        output_dir="./results",
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        num_train_epochs=3,
        fp16=True,
        save_steps=50,
        logging_steps=10,
        report_to="none",
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
        data_collator=DataCollatorForLanguageModeling(tokenizer, mlm=False),
    )
    trainer.train()

    Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
    model.save_pretrained(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)
    print(f"Model saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
