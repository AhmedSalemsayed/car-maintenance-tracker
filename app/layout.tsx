import type { Metadata } from "next";
import { Luckiest_Guy, Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const LuckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "RoboCar",
  description: "Your car maintenance Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${roboto.variable} ${LuckiestGuy.variable} antialiased max-w-[1440px] m-auto`}
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
