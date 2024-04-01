import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { cn } from "../lib/utils";
import { AuthContextProvider } from "./components/AuthWrapper";
import { SocketContextProvider } from "./components/SocketWrapper";
import { Provider } from "../components/providers";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(lexend.className, "antialiased min-h-screen")}>
        <AuthContextProvider>
          <SocketContextProvider>
            <Provider>{children}</Provider>
          </SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
