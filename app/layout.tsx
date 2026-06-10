import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SecondHand — Modern Secondhand Marketplace",
  description: "Buy and sell quality secondhand fashion, sneakers, gadgets, and more in Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
  {children}
  <Toaster position="bottom-right" richColors />
</body>
    </html>
  );
}
