import Link from "next/link";
import { Logo } from "./Logo";
import { getAllCategories } from "@/lib/content";

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800
                        bg-white/90 dark:bg-[#0f1117]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center">
          <Logo />
        </div>
      </div>

      <div className="border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Category navigation"
            className="flex gap-1 overflow-x-auto py-2 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium
                           text-neutral-600 dark:text-neutral-400
                           hover:text-brand-600 dark:hover:text-brand-400
                           hover:bg-brand-50 dark:hover:bg-brand-950/30
                           transition-colors whitespace-nowrap"
              >
                {cat.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
