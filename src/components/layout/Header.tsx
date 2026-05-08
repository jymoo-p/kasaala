import Link from "next/link";
import { Logo } from "./Logo";
import { getAllCategories } from "@/lib/content";

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800
                        bg-white/90 dark:bg-[#0f1117]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-sm font-medium
                           text-neutral-600 dark:text-neutral-400
                           hover:text-brand-600 dark:hover:text-brand-400
                           hover:bg-brand-50 dark:hover:bg-brand-950/30
                           transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100
                        dark:hover:bg-neutral-800 transition-colors"
            aria-label="Open menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
