import "./globals.css";
import SunCursor from "@/components/SunCursor";

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
    <html lang="en">
      <body>
        <SunCursor />
        {children}
      </body>
    </html>
  );
}
