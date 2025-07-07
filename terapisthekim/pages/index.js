import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AdminNavbar from '../components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <AdminNavbar />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Selam Dünya!</h1>
      </div>
    </div>
  );
}