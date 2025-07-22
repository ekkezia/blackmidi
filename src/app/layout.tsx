import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const mono = Space_Mono({
  subsets: [ 'latin' ],
  variable: '--font-bitcount',
  weight: '400'
});

export const metadata: Metadata = {
  title: "blackmidi | @ekezia",
  description: "@ekezia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mono.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
