// "use client"


import type { Metadata } from "next";
import "./globals.scss";
import StyledComponentsRegistry from "../lib/registry";
import ReactQueryProvider from "@/providers/reactQuery";
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = {
  //   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  // <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  // <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  // <link rel="manifest" href="/site.webmanifest">
  // <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  // <meta name="msapplication-TileColor" content="#da532c">
  // <meta name="theme-color" content="#ffffff"></meta>
  title: "KeepFit Booking",
  description: "Book the best trainers online with ease.",
  // alternates: "/favicon.ico"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root">
        <ReactQueryProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}