import type { Metadata } from "next";
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-roboto",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "800"],
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: "Palletric - Daily Color Palette Suggestion",
  description:
    "Daily color palette suggestion. Generate inspiring color palettes based on the user's location, weather, or chosen emotions. \nIdeal for artists, designers, or anyone seeking visual inspiration.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${open_sans.variable}`}>
        {children}
      </body>
    </html>
  );
}
