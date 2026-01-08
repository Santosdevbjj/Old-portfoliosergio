"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Lang = "pt" | "en";

export default function Header() {
  const pathname = usePathname() ?? "";

  const currentLang: Lang = pathname.startsWith("/en") ? "en" : "pt";

  const getLinkStyle = (lang: Lang) => {
    const base =
      "px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer";

    const active =
      "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold";

    const inactive =
      "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

    return `${base} ${currentLang === lang ? active : inactive}`;
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-sm">
      <nav
        className="max-w-4xl mx-auto flex justify-between items-center p-4"
        aria-label="Language navigation"
      >
        <div className="flex space-x-2">
          <Link
            href="/pt"
            className={getLinkStyle("pt")}
            aria-current={currentLang === "pt" ? "page" : undefined}
          >
            Português
          </Link>

          <Link
            href="/en"
            className={getLinkStyle("en")}
            aria-current={currentLang === "en" ? "page" : undefined}
          >
            English
          </Link>
        </div>

        <span className="text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-400">
          {currentLang === "en" ? "International" : "Brasil"}
        </span>
      </nav>
    </header>
  );
}
