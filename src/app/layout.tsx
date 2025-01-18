import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "@next/font/google";
import { GlobalProvider } from "@context/GlobalContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expenses Budget | Controla tus gastos",
  description: "Expenses Budget es un simple app para controlar tus gastos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className='dark'>
      <body
        className={`${inter.className} antialiased`}
      >
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
