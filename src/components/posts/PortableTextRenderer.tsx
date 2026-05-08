import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { AdSensePlaceholder } from "./AdSensePlaceholder";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value.asset).width(1200).auto("format").quality(85).url();
      return (
        <figure className="my-8 not-prose">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <Image src={src} alt={value.alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 740px" />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-neutral-400 dark:text-neutral-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value.href}
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

interface Props {
  body: PortableTextBlock[];
}

export function PortableTextRenderer({ body }: Props) {
  // Inject AdSense placeholder between paragraphs 3 and 4
  const blocks = [...body];
  const adBlock = { _type: "__ad__", _key: "ad-insert" } as unknown as PortableTextBlock;

  let paragraphCount = 0;
  let insertIndex = -1;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i] as PortableTextBlock & { style?: string };
    if (b._type === "block" && (!b.style || b.style === "normal")) {
      paragraphCount++;
      if (paragraphCount === 3) {
        insertIndex = i + 1;
        break;
      }
    }
  }

  if (insertIndex > 0) {
    blocks.splice(insertIndex, 0, adBlock);
  }

  const customComponents: PortableTextComponents = {
    ...components,
    types: {
      ...components.types,
      __ad__: () => <AdSensePlaceholder />,
    },
  };

  return <PortableText value={blocks} components={customComponents} />;
}
