import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isVendor?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isVendor = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${isVendor ? 'pt-16' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;