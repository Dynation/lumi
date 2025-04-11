import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Head from "next/head";
import GlobalSkeletonOverlay from "../app/components/common/GlobalSkeletonOverlay";
import { LoadingProvider } from "@/context/LoadingContext"; 
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L.U.M.I. - Your Beauty Scheduler",
  description: "The ultimate scheduling solution for beauty professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-[var(--background-color)] text-[var(--text-color)]`}
      >
        <LoadingProvider>
          <Header />
          {children}
          <Toaster richColors position="top-center" />
          <Footer />
          <GlobalSkeletonOverlay />
        </LoadingProvider>
      </body>
    </html>
  );
}

