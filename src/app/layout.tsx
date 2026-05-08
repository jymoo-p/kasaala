import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kasaala",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ml" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
