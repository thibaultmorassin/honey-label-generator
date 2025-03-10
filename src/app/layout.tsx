import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Générateur étiquette miel",
  description: "Pour le miel de Papou",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={
          {
            'backgroundImage': 'url(/background.jpg)',
            'backgroundSize': 'cover',
            'backgroundAttachment': 'fixed',
            'backgroundPosition': 'center',
          }}
      >
        <main className="container mx-auto py-12">{children}</main>
      </body>
    </html>
  );
}
