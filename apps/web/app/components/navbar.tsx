"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/features", label: "Fonctionnalités" },
    { href: "/pricing", label: "Tarifs" },
    { href: "/negotiate", label: "Analyser" },
    { href: "/coaching", label: "Coaching" },
    { href: "/refer", label: "Parrainer" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl" role="img" aria-label="handshake">
              🤝
            </span>
            <span className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
              AI Negotiator
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              Connexion
            </Link>
            <Link href="/negotiate" className="btn-primary text-sm !px-4 !py-2">
              Essai gratuit
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-fade-in-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-gray-100" />
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-brand-600"
              >
                Connexion
              </Link>
              <div className="px-4 pt-2">
                <Link
                  href="/negotiate"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-sm text-center"
                >
                  Essai gratuit
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
