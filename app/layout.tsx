import { montserrat } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
      <footer className="flex justify-center items-center h-20 bg-gray-100 border-t border-gray-200"> 
        Hecho con ❤️ por la gente de vercel
      </footer>
    </html>
  );
}
