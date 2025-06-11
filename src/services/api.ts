const API_BASE_URL = 'http://10.11.6.48:8000/api';

export interface Institution {
  id: number;
  nombre: string;
  siglas: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('No se puede conectar con el servidor. Verifique que la API esté disponible.');
      }
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Institutions endpoints
  async getInstitutions(): Promise<Institution[]> {
    try {
      const response = await this.request<ApiResponse<Institution[]>>('/instituciones/');
      return response.data;
    } catch (error) {
      // Return mock data as fallback when API is not available
      console.warn('API not available, using mock data');
      return [
        {
          id: 1,
          nombre: 'Universidad de las Ciencias Informáticas',
          siglas: 'UCI',
          activo: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ];
    }
  }

  async createInstitution(institution: Omit<Institution, 'id' | 'created_at' | 'updated_at'>): Promise<Institution> {
    const response = await this.request<ApiResponse<Institution>>('/instituciones/', {
      method: 'POST',
      body: JSON.stringify(institution),
    });
    return response.data;
  }

  async updateInstitution(id: number, institution: Partial<Institution>): Promise<Institution> {
    const response = await this.request<ApiResponse<Institution>>(`/instituciones/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(institution),
    });
    return response.data;
  }

  async deleteInstitution(id: number): Promise<void> {
    await this.request(`/instituciones/${id}/`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();