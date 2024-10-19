import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "@next/font/google";
import { Header } from "../components/Header";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expenses Budget | Controla tus gastos de la mejor manera perro",
  description: "Expenses Budget es un simple app para controlar tus gastos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
