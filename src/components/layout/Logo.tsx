import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" aria-label="Kasaala home" className="flex items-center">
      <Image
        src="/logo-light.png"
        alt="Kasaala"
        width={332}
        height={72}
        priority
        className="block dark:hidden h-10 w-auto"
      />
      <Image
        src="/logo-dark.png"
        alt="Kasaala"
        width={332}
        height={72}
        priority
        className="hidden dark:block h-10 w-auto"
      />
    </Link>
  );
}
