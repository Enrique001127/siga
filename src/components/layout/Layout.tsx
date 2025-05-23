import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  requireAuth = true,
  showFooter = true 
}) => {
  const { isAuthenticated } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Header />}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;