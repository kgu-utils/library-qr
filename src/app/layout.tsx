import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "도서관 QR 코드",
  description: "학번 기반 QR 코드 생성 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
