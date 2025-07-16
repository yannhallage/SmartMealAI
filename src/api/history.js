import apiClient from './apiClient';

export const addRecipeToHistory = async (recipe) => {
  return apiClient.post('/recipes/insert', recipe);
};

export const getHistory = async (userId) => {
  return apiClient.get(`/recipes/user/${userId}`);
}; 