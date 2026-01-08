"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <header className="p-4 bg-gray-100 dark:bg-gray-800 shadow">
      <nav className="max-w-4xl mx-auto flex justify-between">
        <div className="flex space-x-4">
          <Link href="/pt" className={path.startsWith("/pt") ? "font-bold" : ""}>Português</Link>
          <Link href="/en" className={path.startsWith("/en") ? "font-bold" : ""}>English</Link>
        </div>
      </nav>
    </header>
  );
}
