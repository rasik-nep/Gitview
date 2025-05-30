import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/providers/SessionProvider"; // Import the wrapper

const geistRaleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitView",
  description: "A GitHub profile viewer",
  openGraph: {
    title: "GitView",
    description: "A GitHub profile viewer",
    type: "website",
    siteName: "GitView",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistRaleway.variable} antialiased`}>
        <SessionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
