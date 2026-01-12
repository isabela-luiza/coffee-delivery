import type { Metadata } from "next";
import { Baloo_2, Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-baloo",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Coffee Delivery",
  description: "Projeto Coffee Delivery",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${baloo.variable} ${roboto.variable} antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}


