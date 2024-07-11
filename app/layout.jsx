import { Work_Sans } from "next/font/google";
import "@styles/globals.css";

const work_sans = Work_Sans({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Ten Twenty",
  description: "Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${work_sans.className} bg-background`}>{children}</body>
    </html>
  );
}
