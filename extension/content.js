(function () {
  "use strict";

  function injectButton(jobCard) {
    if (jobCard.querySelector(".ai-negotiator-btn")) return;

    const button = document.createElement("button");
    button.textContent = "🤝 Analyser avec AI Negotiator";
    button.className = "ai-negotiator-btn";
    button.style.cssText =
      "background:#2563eb;color:#fff;border:none;padding:8px 14px;border-radius:6px;cursor:pointer;font-size:13px;margin-top:8px;";

    button.addEventListener("click", () => {
      const descEl =
        document.querySelector(".job-description") ||
        document.querySelector(".description__text") ||
        document.querySelector("[data-test='job-description']");

      const offerText = descEl ? descEl.innerText : jobCard.innerText;
      if (!offerText) return;

      button.textContent = "Analyse en cours...";
      button.disabled = true;

      chrome.runtime.sendMessage(
        { action: "analyzeOffer", offerText },
        (response) => {
          button.textContent = "🤝 Analyser avec AI Negotiator";
          button.disabled = false;

          if (response && response.success) {
            showModal(response.response);
          } else {
            const errorDetail = (response && response.error) ? `: ${response.error}` : "";
            alert(`Erreur lors de l'analyse${errorDetail}. Vérifiez votre connexion ou réessayez.`);
          }
        }
      );
    });

    jobCard.appendChild(button);
  }

  function showModal(content) {
    const existing = document.getElementById("ai-negotiator-modal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "ai-negotiator-modal";
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;";

    const modal = document.createElement("div");
    modal.style.cssText =
      "background:#fff;border-radius:12px;padding:24px;max-width:600px;width:90%;max-height:80vh;overflow-y:auto;position:relative;";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    closeBtn.style.cssText =
      "position:absolute;top:12px;right:12px;background:none;border:none;font-size:18px;cursor:pointer;";
    closeBtn.addEventListener("click", () => overlay.remove());

    const title = document.createElement("h2");
    title.textContent = "AI Negotiator – Analyse";
    title.style.cssText = "font-size:18px;font-weight:bold;margin-bottom:16px;";

    const pre = document.createElement("pre");
    pre.style.cssText = "white-space:pre-wrap;font-size:13px;line-height:1.6;";
    pre.textContent = content;

    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(pre);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  function observeJobCards() {
    const observer = new MutationObserver(() => {
      document.querySelectorAll(".job-card-container, .jobs-search-results__list-item").forEach(
        injectButton
      );
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial injection
    document.querySelectorAll(".job-card-container, .jobs-search-results__list-item").forEach(
      injectButton
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeJobCards);
  } else {
    observeJobCards();
  }
})();
