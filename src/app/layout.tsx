import type { Metadata } from "next";
import "./globals.css";

// const mono = Space_Mono({
//   subsets: ['latin'],
//   variable: '--font-space-mono',
//   weight: ['400'],
// });

export const metadata: Metadata = {
  title: "blackmidi | @ekezia",
  description: "@ekezia",
  icons: {
    icon: '/favicon.ico', // or .png, .svg, etc.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
