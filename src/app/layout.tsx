import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar";
import { Banner } from "./_components/banner";


export const metadata: Metadata = {
  title: "E commerce app",
  description: "Ishita's e commerce app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
      <Navbar />
      <Banner />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
