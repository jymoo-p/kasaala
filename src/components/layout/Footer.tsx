import Link from "next/link";
import { Logo } from "./Logo";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "RSS Feed", href: "/feed.xml" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800
                        bg-neutral-50 dark:bg-[#080b10] mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Footer navigation" className="flex items-center gap-5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-neutral-500 dark:text-neutral-400
                           hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400 dark:text-neutral-600">
          © {new Date().getFullYear()} Kasaala — Malayalam stories, crafted with care.
        </p>
      </div>
    </footer>
  );
}
