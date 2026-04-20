import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タイピング道場",
  description: "ローマ字タイピングゲーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, background: "#1a1a2e", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
