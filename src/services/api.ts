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
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Institutions endpoints
  async getInstitutions(): Promise<Institution[]> {
    const response = await this.request<ApiResponse<Institution[]>>('/instituciones/');
    return response.data;
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