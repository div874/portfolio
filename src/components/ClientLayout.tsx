'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Contact from './Contact';
import Footer from './Footer';

const ShapeGrid = dynamic(() => import('./ShapeGrid'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className="portfolio-container font-inter">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <ShapeGrid 
          speed={0.5} 
          squareSize={50}
          direction='diagonal'
          borderColor='#F0F0F0'
          hoverFillColor='#F9F9F9'
          shape='square'
          hoverTrailAmount={5}
        />
      </div>
      
      {!isAdmin && <Navbar />}
      
      <main>
        {children}
        {!isAdmin && <Contact />}
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}
