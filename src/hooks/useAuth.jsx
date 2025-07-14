import { useState, useEffect, createContext, useContext } from 'react';
import { isAuthenticated, getToken, verifyToken, getNameUser, getUserId, extractUserIdFromToken } from '../api/auth';

// Contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

// Provider d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasToken = isAuthenticated();
        if (hasToken) {
          // Pour l'instant, on considère que si le token existe, l'utilisateur est authentifié
          // TODO: Implémenter la vérification côté serveur quand le backend sera prêt
          setIsAuth(true);
          // Récupérer les informations utilisateur depuis localStorage
          const nomComplet = getNameUser();
          let userId = getUserId();
          
          // Si l'ID n'est pas stocké, essayer de l'extraire du token JWT
          if (!userId) {
            userId = extractUserIdFromToken();
            console.log('[Auth] ID extrait du token JWT:', userId);
          }
          
          setUser({ 
            nom_complet: nomComplet,
            id: userId
          });
        } else {
          setIsAuth(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        setIsAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
  };

  const value = {
    user,
    isAuth,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 