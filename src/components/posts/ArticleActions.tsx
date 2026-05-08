"use client";

import { useState } from "react";

interface ArticleActionsProps {
  title: string;
  url: string;
}

const SHARE_PLATFORMS = [
  {
    name: "WhatsApp",
    color: "hover:text-[#25D366] hover:border-[#25D366]",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + "\n" + url)}`,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.535a.75.75 0 0 0 .916.932l5.849-1.53A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.178-1.432l-.36-.215-3.742.98.999-3.645-.236-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
  {
    name: "X",
    color: "hover:text-[#000] dark:hover:text-white hover:border-neutral-800 dark:hover:border-white",
    getUrl: (url: string, title: string) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    color: "hover:text-[#1877F2] hover:border-[#1877F2]",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    color: "hover:text-[#2AABEE] hover:border-[#2AABEE]",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.916l-2.95-.924c-.64-.203-.654-.64.136-.948l11.526-4.445c.537-.194 1.006.131.37.65z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2]",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function ArticleActions({ title, url }: ArticleActionsProps) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleLike() {
    if (liked) return;
    setLiked(true);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openShare(shareUrl: string) {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  }

  return (
    <div className="my-10 not-prose space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        Share this story
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {/* Social share buttons */}
        {SHARE_PLATFORMS.map((platform) => (
          <button
            key={platform.name}
            onClick={() => openShare(platform.getUrl(url, title))}
            aria-label={`Share on ${platform.name}`}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium
                        border-neutral-200 dark:border-neutral-700
                        text-neutral-500 dark:text-neutral-400
                        transition-all duration-150 ${platform.color}`}
          >
            {platform.icon}
            <span className="hidden sm:inline">{platform.name}</span>
          </button>
        ))}

        {/* Copy link */}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium
                     border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400
                     hover:text-brand-600 hover:border-brand-400 transition-all duration-150"
        >
          {copied ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy link"}</span>
        </button>

        {/* Like */}
        <button
          onClick={handleLike}
          aria-pressed={liked}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium
                      transition-all duration-150 ml-auto
                      ${liked
                        ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-red-200 hover:text-red-500"
                      }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="hidden sm:inline">{liked ? "Liked" : "Like"}</span>
        </button>
      </div>
    </div>
  );
}
