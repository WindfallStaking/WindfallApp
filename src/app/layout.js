import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { Providers } from "@/config/context";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}



