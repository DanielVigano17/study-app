import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ApplicationProvider } from "./_context/app.context";
import { auth } from "../../auth/auth";
import { ThemeProvider } from "./_context/theme-context";

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
  title: "SmartStudy",
  description: "Aprenda com a melhor plataforma de estudos assistida por IA",
  icons: {
    icon: [
      {
        url: "/smartstudy-icon.svg",
        type: "image/svg+xml",
      }
    ],
    apple: [
      {
        url: "/smartstudy-icon.svg",
        type: "image/svg+xml",
      }
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="study-app-theme"
        >
          <ApplicationProvider session={session}>
            <Toaster />
            {children}
          </ApplicationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
