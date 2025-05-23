import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Layout from '../components/layout/Layout';

const LoginPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('correo@uci.cu');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Layout requireAuth={false} showFooter={false}>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <img 
                  src="/public/Imagenes/xabal_siga.png"
                  alt="Logo"
                  className="mx-auto mb-4"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 text-center">
                Sistema de Gestión de Alimentación
              </h2>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ejemplo@uci.cu"
                  autoComplete="email"
                />
                
                <Input
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    Iniciar sesión
                  </Button>
                </div>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>* Para la demo, use cualquier credencial.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;