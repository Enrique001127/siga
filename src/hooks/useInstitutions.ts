import { useState, useEffect } from 'react';
import { apiService, Institution } from '../services/api';

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getInstitutions();
      setInstitutions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching institutions');
      console.error('Error fetching institutions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const createInstitution = async (institution: Omit<Institution, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newInstitution = await apiService.createInstitution(institution);
      setInstitutions(prev => [...prev, newInstitution]);
      return newInstitution;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating institution');
      throw err;
    }
  };

  const updateInstitution = async (id: number, updates: Partial<Institution>) => {
    try {
      const updatedInstitution = await apiService.updateInstitution(id, updates);
      setInstitutions(prev => prev.map(inst => inst.id === id ? updatedInstitution : inst));
      return updatedInstitution;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating institution');
      throw err;
    }
  };

  const deleteInstitution = async (id: number) => {
    try {
      await apiService.deleteInstitution(id);
      setInstitutions(prev => prev.filter(inst => inst.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting institution');
      throw err;
    }
  };

  return {
    institutions,
    loading,
    error,
    refetch: fetchInstitutions,
    createInstitution,
    updateInstitution,
    deleteInstitution,
  };
};