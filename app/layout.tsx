import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme/theme-provider";
import Footer from "@/components/main-layout/footer";
import Header from "@/components/main-layout/header";
import {TooltipProvider} from "@/components/ui/tooltip";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "pre-scouting"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
          <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
          <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
          >
              <TooltipProvider
                    disableHoverableContent
                    delayDuration={100}
                    skipDelayDuration={0}
              >
                  <div className={"flex flex-col min-h-screen w-full"}>
                      <Header/>
                      <main className={"container relative bottom flex-1 mb-14"}>
                          {children}
                      </main>
                  </div>
              </TooltipProvider>
              <Footer/>
          </ThemeProvider>
          </body>
          </html>
    );
}
