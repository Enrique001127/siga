import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <Layout requireAuth={false}>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Página no encontrada</h2>
        <p className="text-gray-600 mt-2 max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;