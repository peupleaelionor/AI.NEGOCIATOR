"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSupabase } from "../../lib/auth";
import axios from "axios";

interface UserData {
  id: string;
  email: string;
}

interface DashboardStats {
  total_analyses: number;
  credits_remaining: number;
  referrals_count: number;
  plan: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await getSupabase().auth.getUser();
      if (data?.user) {
        setUser({ id: data.user.id, email: data.user.email || "" });

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
          const res = await axios.get(`${apiUrl}/dashboard/stats`, {
            params: { user_id: data.user.id },
          });
          setStats(res.data);
        } catch {
          setStats({
            total_analyses: 0,
            credits_remaining: 3,
            referrals_count: 0,
            plan: "Découverte",
          });
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-lg">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-3">Accès réservé</h1>
          <p className="text-gray-600 mb-6">
            Connectez-vous pour accéder à votre tableau de bord.
          </p>
          <Link href="/login" className="btn-primary">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  const dashboardCards = [
    {
      icon: "📊",
      title: "Analyses effectuées",
      value: stats?.total_analyses ?? 0,
      color: "bg-blue-50 text-blue-700",
    },
    {
      icon: "🎟️",
      title: "Crédits restants",
      value: stats?.credits_remaining ?? 0,
      color: "bg-green-50 text-green-700",
    },
    {
      icon: "🎁",
      title: "Parrainages",
      value: stats?.referrals_count ?? 0,
      color: "bg-purple-50 text-purple-700",
    },
    {
      icon: "⭐",
      title: "Plan actuel",
      value: stats?.plan ?? "Découverte",
      color: "bg-amber-50 text-amber-700",
    },
  ];

  const quickActions = [
    {
      icon: "🤖",
      title: "Nouvelle analyse",
      description: "Analysez une offre d'emploi avec l'IA",
      href: "/negotiate",
    },
    {
      icon: "🎁",
      title: "Parrainer un ami",
      description: "Gagnez 1 mois gratuit par parrainage",
      href: "/refer",
    },
    {
      icon: "🎯",
      title: "Réserver un coaching",
      description: "Session avec un expert en négociation",
      href: "/coaching",
    },
    {
      icon: "💳",
      title: "Gérer mon abonnement",
      description: "Changer de plan ou acheter des crédits",
      href: "/pricing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto section-padding !py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Bonjour 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Se déconnecter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {dashboardCards.map((card) => (
          <div key={card.title} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${card.color}`}
              >
                {card.icon}
              </span>
              <p className="text-sm text-gray-500">{card.title}</p>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="card p-5 hover:border-brand-200 hover:-translate-y-0.5 transition-all group"
          >
            <span className="text-2xl mb-3 block group-hover:animate-float">{action.icon}</span>
            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-500">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
