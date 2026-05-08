// Replace with real AdSense <ins> tag once approved
export function AdSensePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="my-8 w-full min-h-[90px] rounded-xl bg-neutral-100 dark:bg-neutral-800
                 flex items-center justify-center border border-dashed
                 border-neutral-300 dark:border-neutral-700 not-prose"
    >
      <span className="text-xs text-neutral-400 select-none">Advertisement</span>
    </div>
  );
}
