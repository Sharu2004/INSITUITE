import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "NexusIT Academy — Future-Ready Tech Training",
    template: "%s | NexusIT Academy",
  },
  description:
    "NexusIT Academy offers industry-leading training in AWS, DevOps, Full Stack Development, Android, and more. Launch your tech career today.",
  keywords: [
    "IT training",
    "tech courses",
    "AWS certification",
    "DevOps training",
    "full stack development",
    "coding bootcamp",
  ],
  openGraph: {
    title: "NexusIT Academy — Future-Ready Tech Training",
    description: "Industry-leading IT training programs to launch your tech career.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-bg antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
