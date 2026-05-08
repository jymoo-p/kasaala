"use client";

import ReactMarkdown from "react-markdown";
import { AdSensePlaceholder } from "./AdSensePlaceholder";

interface Props {
  body: string;
}

export function MarkdownBody({ body }: Props) {
  // Split into blocks on double newlines, inject ad after 3rd paragraph
  const blocks = body.split(/\n\n+/).filter((b) => b.trim());
  const result: React.ReactNode[] = [];
  let paraCount = 0;
  let adInserted = false;

  blocks.forEach((block, i) => {
    const isParagraph =
      !block.startsWith("#") &&
      !block.startsWith(">") &&
      !block.startsWith("- ") &&
      !block.startsWith("* ");

    if (isParagraph) paraCount++;

    result.push(
      <ReactMarkdown key={i}>{block}</ReactMarkdown>
    );

    if (isParagraph && paraCount === 3 && !adInserted) {
      result.push(<AdSensePlaceholder key="ad" />);
      adInserted = true;
    }
  });

  return <>{result}</>;
}
