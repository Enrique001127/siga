import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const PlaceholderPage: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const location = useLocation();
  
  // Convert the path to a formatted title
  const getPageTitle = () => {
    const path = section || location.pathname.split('/').pop() || '';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {getPageTitle()}
        </h1>
        <div className="bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4">
            Esta página está en desarrollo. Aquí se mostrará el contenido de la sección <span className="font-medium">{getPageTitle()}</span>.
          </p>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-blue-200 rounded w-3/4 mx-auto"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-200 rounded"></div>
                <div className="h-4 bg-blue-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;