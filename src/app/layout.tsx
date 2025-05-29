import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const gartis = localFont({
  src: '../../public/fonts/gartis.otf',
  variable: '--gartis'
});

const inter = Inter({
  variable: '--inter',
  subsets: ['latin'],
});;

export const metadata: Metadata = {
  title: "WAWEF",
  description: "Empowering Women, Transforming Futures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col justify-between ${inter.variable} ${gartis.variable} antialiased`}
        >
        <Navbar/>
       <main className="flex-1">{children}</main> 
      <Footer/>
      </body>
    </html>
  );
}
