import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Fira_Code } from "next/font/google";
import { DocsHeader } from "@/components/docs-header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const firaCode = Fira_Code({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ParseArger - Because Bash Argument Parsing Shouldn't Suck",
  description:
    "Generate standalone bash scripts with proper argument parsing. No, really. It's actually good.",
  metadataBase: new URL("https://dimitrigilbert.github.io/parseArger"),
  openGraph: {
    title: "ParseArger - Because Bash Argument Parsing Shouldn't Suck",
    description:
      "Generate standalone bash scripts with proper argument parsing. Zero dependencies. Pure bash. Pure chaos.",
    url: "https://dimitrigilbert.github.io/parseArger",
    siteName: "ParseArger",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ParseArger - Bash CLI Argument Parsing Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParseArger - Bash Argument Parsing Shouldn't Suck",
    description:
      "Generate standalone bash scripts with proper argument parsing. Zero dependencies. Pure bash.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${firaCode.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground dark`}
      >
        <DocsHeader />
        {children}
      </body>
    </html>
  );
}
