"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReferPage() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser({ id: data.user.id });
    });
  }, []);

  const shareLink =
    typeof window !== "undefined" && user
      ? `${window.location.origin}/signup?ref=${user.id}`
      : "";

  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <p className="text-gray-600">
          Connectez-vous pour accéder à votre lien de parrainage.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Parrainez vos amis</h1>
      <p className="text-gray-600 mb-6">
        Gagnez <strong>1 mois gratuit</strong> pour chaque ami inscrit via votre lien !
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={shareLink}
          readOnly
          className="flex-1 p-2 border rounded-lg bg-gray-50 text-sm"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {copied ? "Copié !" : "Copier"}
        </button>
      </div>
    </div>
  );
}
