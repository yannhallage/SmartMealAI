// src/api/apiClient.js

import { getAuthHeaders, getToken, removeToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Client API avec gestion automatique des tokens
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Ajouter les headers d'authentification par défaut
    const headers = {
      ...getAuthHeaders(),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      console.log(`[API] Appel vers: ${url}`);
      console.log(`[API] Headers:`, headers);
      const response = await fetch(url, config);
      
      // Gérer les erreurs d'authentification
      if (response.status === 401) {
        // Token expiré ou invalide
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expirée. Veuillez vous reconnecter.');
      }

      // Gérer les autres erreurs HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || `Erreur ${response.status}: ${response.statusText}`;
        const enhancedError = new Error(errorMessage);
        enhancedError.status = response.status;
        enhancedError.statusText = response.statusText;
        enhancedError.errorData = errorData;
        enhancedError.response = response;
        throw enhancedError;
      }

      // Parser la réponse JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`[API] Erreur pour ${endpoint}:`, error);
      throw error;
    }
  }

  // Méthodes HTTP
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Instance du client API
export const apiClient = new ApiClient(API_URL);

// Fonctions utilitaires pour les requêtes courantes
export const api = {
  // Authentification
  auth: {
    login: (credentials) => apiClient.post('/login', credentials),
    register: (userData) => apiClient.post('/register', userData),
    logout: () => apiClient.post('/logout'),
    verifyToken: () => apiClient.get('/verify-token'),
    refreshToken: () => apiClient.post('/refresh-token'),
  },

  // Recettes
  recipes: {
    getAll: (params = {}) => apiClient.get('/recipes', { params }),
    getById: (id) => apiClient.get(`/recipes/${id}`),
    create: (recipeData) => apiClient.post('/recipes', recipeData),
    update: (id, recipeData) => apiClient.put(`/recipes/${id}`, recipeData),
    delete: (id) => apiClient.delete(`/recipes/${id}`),
    generate: (criteria) => apiClient.post('/recipes/generate', criteria),
    search: (query) => apiClient.get('/recipes/search', { params: { q: query } }),
  },

  // Utilisateurs
  users: {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (userData) => apiClient.put('/users/profile', userData),
    getHistory: () => apiClient.get('/users/history'),
    getFavorites: () => apiClient.get('/users/favorites'),
    addFavorite: (recipeId) => apiClient.post('/users/favorites', { recipeId }),
    removeFavorite: (recipeId) => apiClient.delete(`/users/favorites/${recipeId}`),
  },

  // Préférences
  preferences: {
    get: () => apiClient.get('/preferences'),
    update: (preferences) => apiClient.put('/preferences', preferences),
    getIngredients: () => apiClient.get('/preferences/ingredients'),
    updateIngredients: (ingredients) => apiClient.put('/preferences/ingredients', ingredients),
    getAllergies: () => apiClient.get('/preferences/allergies'),
    updateAllergies: (allergies) => apiClient.put('/preferences/allergies', allergies),
  },
};

export default apiClient; 