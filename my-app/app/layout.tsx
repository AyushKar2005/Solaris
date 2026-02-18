import "./globals.css";
import SunCursor from "@/components/SunCursor";
import { Noto_Sans_Oriya } from "next/font/google";

const odiaFont = Noto_Sans_Oriya({
  subsets: ["oriya"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Solaris | Clean Energy",
  description: "Powering the future with solar energy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="or">
      <body className={`${odiaFont.className} bg-black text-white`}>
        <SunCursor />
        {children}
      </body>
    </html>
  );
}
