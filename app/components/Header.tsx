"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Lang = "pt" | "en";

export default function Header() {
  const pathname = usePathname() ?? "";
  const currentLang: Lang = pathname.startsWith("/en") ? "en" : "pt";

  const getLinkStyle = (lang: Lang) =>
    `px-4 py-2 rounded-lg text-sm sm:text-base font-medium cursor-pointer transition-all duration-300
     ${
       currentLang === lang
         ? "bg-gradient-to-r from-primary-light to-primary-dark text-white font-bold shadow-lg"
         : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
     }`;

  return (
    <header className="bg-gray-50 dark:bg-gray-900 shadow-md sticky top-0 z-50 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        <div className="flex space-x-2">
          <Link href="/pt" className={getLinkStyle("pt")} aria-current={currentLang === "pt" ? "page" : undefined}>
            Português
          </Link>
          <Link href="/en" className={getLinkStyle("en")} aria-current={currentLang === "en" ? "page" : undefined}>
            English
          </Link>
        </div>
        <span className="text-xs sm:text-sm uppercase tracking-widest font-medium text-gray-500 dark:text-gray-400">
          {currentLang === "en" ? "International" : "Brasil"}
        </span>
      </nav>
    </header>
  );
}
