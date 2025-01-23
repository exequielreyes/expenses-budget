import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "@next/font/google";
import { GlobalProvider } from "@context/GlobalContext";
import { Toaster } from "sonner";

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
        <Toaster
          toastOptions={{
            classNames: {
              toast: "bg-custom-black/35 border-neutral-800 border backdrop-blur-lg shadow-md outline-none text-neutral-50",
              info: "bg-custom-black/35 border-neutral-800 border backdrop-blur-lg shadow-md outline-none text-blue-300",
              success: "bg-custom-black/35 border-neutral-800 border backdrop-blur-lg shadow-md outline-none text-green-300",
              warning: "bg-custom-black/35 border-neutral-800 border backdrop-blur-lg shadow-md outline-none text-yellow-300",
              error: "bg-custom-black/35 border-neutral-800 border backdrop-blur-lg shadow-md outline-none text-red-300",
            },
          }}
        />
      </body>
    </html>
  );
}
