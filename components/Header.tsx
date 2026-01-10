"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <header className="border-b border-light dark:border-dark bg-surface-light dark:bg-surface-dark">
      <div className="container flex items-center justify-between py-4">
        {/* Logo / Nome */}
        <Link
          href="/"
          className="text-xl font-bold animate-textGradient"
          aria-label="Home"
        >
          Sergio Santos
        </Link>

        {/* Navegação principal */}
        <nav className="flex gap-6">
          <Link
            href="/pt/projects"
            className="nav-link"
          >
            Projetos
          </Link>
          <Link
            href="/pt/about"
            className="nav-link"
          >
            Sobre
          </Link>
          <Link
            href="/pt/contact"
            className="nav-link"
          >
            Contato
          </Link>
        </nav>

        {/* Language Switcher integrado */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
