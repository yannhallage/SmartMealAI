// src/api/auth.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/users';

// Fonctions utilitaires pour la gestion des tokens
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const setNameUser = (nom_complet) => {
  console.log('[API] nom_complet stocké avec succès', nom_complet);
  localStorage.setItem('nom_complet', nom_complet);
};

export const getNameUser = () => {
  return localStorage.getItem('nom_complet');
};

export const removeNameUser = () => {
  localStorage.removeItem('nom_complet');
};

export const removeToken = () => {
  localStorage.removeItem('token');
  removeNameUser(); // Supprimer aussi le nom_complet lors de la déconnexion
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Fonction pour ajouter le token aux headers des requêtes
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export async function registerUser(formData) {
  const { confirmPassword, name, email, password } = formData;
  const payload = {
    nom_complet: name,
    email,
    motdepasse: password
  };
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur lors de la création du compte');
    
    // Si l'inscription retourne un token, le stocker
    if (data.token) {
      setToken(data.token);
      if (data.nom_complet) {
        setNameUser(data.nom_complet);
      }
    }
    
    return data;
  } catch (err) {
    console.error('[API] registerUser error:', err);
    throw err;
  }
}

export async function loginUser({ email, password }) {
  const payload = { email, motdepasse: password };
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur lors de la connexion');
    
    // Stocker le token reçu du serveur
    if (data.token) {
      setToken(data.token);
      console.log('[API] Token stocké avec succès');
      
      // Stocker aussi le nom_complet si disponible
      if (data.nom_complet) {
        setNameUser(data.nom_complet);
      }
    } else {
      console.warn('[API] Aucun token reçu du serveur');
    }
    
    console.log('[API] loginUser response:', data);
    return data;
  } catch (err) {
    console.error('[API] loginUser error:', err);
    throw err;
  }
}

export async function logoutUser() {
  try {
    const token = getToken();
    if (token) {
      // Appel au serveur pour invalider le token (optionnel)
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
    }
  } catch (err) {
    console.error('[API] logoutUser error:', err);
  } finally {
    // Toujours supprimer le token local
    removeToken();
    console.log('[API] Token supprimé localement');
  }
}

// Fonction pour vérifier si le token est toujours valide
export async function verifyToken() {
  try {
    const token = getToken();
    if (!token) return false;
    
    // Pour l'instant, on considère que si le token existe, il est valide
    // TODO: Implémenter la vérification côté serveur quand le backend sera prêt
    return true;
    
    // Code pour la vérification côté serveur (à décommenter quand le backend sera prêt)
    /*
    const res = await fetch(`${API_URL}/verify-token`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    return res.ok;
    */
  } catch (err) {
    console.error('[API] verifyToken error:', err);
    return false;
  }
}

// Fonction pour rafraîchir le token
export async function refreshToken() {
  try {
    const token = getToken();
    if (!token) throw new Error('Aucun token à rafraîchir');
    
    const res = await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur lors du rafraîchissement du token');
    
    if (data.token) {
      setToken(data.token);
      console.log('[API] Token rafraîchi avec succès');
    }
    
    return data;
  } catch (err) {
    console.error('[API] refreshToken error:', err);
    // Si le rafraîchissement échoue, supprimer le token invalide
    removeToken();
    throw err;
  }
} 