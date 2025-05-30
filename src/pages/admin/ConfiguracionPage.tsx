import React from 'react';
import ConfigSidebar from '../../components/layout/ConfigSidebar';
import Layout from '../../components/layout/Layout';

const ConfiguracionPage: React.FC = () => (
  <Layout>
    <div className="flex h-full">
      <ConfigSidebar />
      <main className="flex-1 p-6">
        {/* Aquí va el contenido de la configuración */}
        <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      </main>
    </div>
  </Layout>
);

export default ConfiguracionPage;