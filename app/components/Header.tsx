"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Lang = "pt" | "en";

export default function Header() {
  const pathname = usePathname() ?? "";
  const currentLang: Lang = pathname.startsWith("/en") ? "en" : "pt";

  const getLinkStyle = (lang: Lang) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
    ${currentLang === lang ? "bg-blue-900 text-blue-200 font-semibold" : "text-gray-300 hover:bg-gray-700"}
  `;

  return (
    <header className="bg-gray-800 dark:bg-gray-900 shadow-md">
      <nav className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-2">
          <Link href="/pt" className={getLinkStyle("pt")} aria-current={currentLang === "pt" ? "page" : undefined}>Português</Link>
          <Link href="/en" className={getLinkStyle("en")} aria-current={currentLang === "en" ? "page" : undefined}>English</Link>
        </div>
        <span className="text-xs uppercase tracking-widest font-medium text-gray-400">{currentLang === "en" ? "International" : "Brasil"}</span>
      </nav>
    </header>
  );
}
