// src/components/Layout.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow" style={{ backgroundColor: '#f2f2f2' }}>
          <Outlet /> {/* This renders the page content */}
        </main>
        <Footer />
    </div>
  );
};

export default Layout;
