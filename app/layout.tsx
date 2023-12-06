import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WordCard",
  description: "Novopak Work card generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" >
      <body className={inter.className + " bg-background text-onBackground no-scrollbar"}>
        {children}
      </body>
    </html>
  );
}