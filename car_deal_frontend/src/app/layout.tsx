import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@/lib/fontawesome"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

config.autoAddCss = false

const open_sans = Open_Sans({
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Car_deal",
  description: "Buy your favourite car at ease",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${open_sans.className} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}