import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Fitness Planner",
  description: "Your personal fitness planner app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
