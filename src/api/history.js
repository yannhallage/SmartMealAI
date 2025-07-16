import apiClient from './apiClient';

export const addRecipeToHistory = async (recipe) => {
  return apiClient.post('/api/history', recipe);
};

export const getHistory = async () => {
  return apiClient.get('/api/history');
}; 