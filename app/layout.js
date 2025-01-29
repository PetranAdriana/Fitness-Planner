import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
        <Footer />
      </body>
    </html>
  );
}
