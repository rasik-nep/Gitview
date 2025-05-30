import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/providers/SessionProvider"; // Import the wrapper
import QueryProvider from "@/components/providers/QueryProvider";

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
          <QueryProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
