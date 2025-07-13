# Gestion de l'Authentification et des Tokens

## Vue d'ensemble

SmartMealAI utilise un système d'authentification basé sur les tokens JWT (JSON Web Tokens) pour sécuriser l'accès aux fonctionnalités de l'application.

## Architecture

### 1. Gestion des Tokens (`src/api/auth.js`)

Le fichier `auth.js` contient toutes les fonctions liées à l'authentification :

#### Fonctions utilitaires
- `getToken()` : Récupère le token depuis le localStorage
- `setToken(token)` : Stocke le token dans le localStorage
- `removeToken()` : Supprime le token du localStorage
- `isAuthenticated()` : Vérifie si un token existe
- `getAuthHeaders()` : Retourne les headers avec le token pour les requêtes API

#### Fonctions d'authentification
- `registerUser(formData)` : Inscription d'un nouvel utilisateur
- `loginUser(credentials)` : Connexion d'un utilisateur
- `logoutUser()` : Déconnexion et invalidation du token
- `verifyToken()` : Vérification de la validité du token
- `refreshToken()` : Rafraîchissement du token expiré

### 2. Contexte d'Authentification (`src/hooks/useAuth.js`)

Le hook `useAuth` fournit un état global d'authentification :

```javascript
const { user, isAuth, loading, login, logout } = useAuth();
```

#### État
- `user` : Données de l'utilisateur connecté
- `isAuth` : Boolean indiquant si l'utilisateur est connecté
- `loading` : Boolean indiquant si la vérification d'auth est en cours

#### Actions
- `login(userData, token)` : Connecte l'utilisateur
- `logout()` : Déconnecte l'utilisateur

### 3. Client API (`src/api/apiClient.js`)

Le client API gère automatiquement les tokens pour toutes les requêtes :

- Ajoute automatiquement le header `Authorization: Bearer <token>`
- Gère les erreurs 401 (token expiré)
- Redirige vers la page de connexion si nécessaire

## Flux d'Authentification

### 1. Inscription
```
1. Utilisateur remplit le formulaire d'inscription
2. Appel à registerUser() avec les données
3. Si succès et token reçu → stockage du token
4. Mise à jour du contexte d'authentification
5. Redirection vers le dashboard
```

### 2. Connexion
```
1. Utilisateur remplit le formulaire de connexion
2. Appel à loginUser() avec email/mot de passe
3. Si succès → stockage du token
4. Mise à jour du contexte d'authentification
5. Redirection vers le dashboard
```

### 3. Vérification de Session
```
1. Au chargement de l'app → vérification du token
2. Si token existe → appel à verifyToken()
3. Si token valide → mise à jour du contexte
4. Si token invalide → suppression et redirection
```

### 4. Déconnexion
```
1. Clic sur "Déconnexion"
2. Appel à logoutUser() (invalidation côté serveur)
3. Suppression du token local
4. Mise à jour du contexte d'authentification
5. Redirection vers l'accueil
```

## Protection des Routes

### PrivateRoute Component
```javascript
// src/routes/PrivateRoute.jsx
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

### Utilisation
```javascript
<Route path="/dashboard" element={
  <PrivateRoute>
    <UserDashboard />
  </PrivateRoute>
} />
```

## Gestion des Erreurs

### Erreurs d'Authentification
- **401 Unauthorized** : Token expiré ou invalide
  - Suppression automatique du token
  - Redirection vers la page de connexion
- **403 Forbidden** : Permissions insuffisantes
- **422 Validation Error** : Données de formulaire invalides

### Affichage des Erreurs
Les erreurs sont affichées dans les formulaires avec un style cohérent :
```javascript
{apiError && (
  <div className="bg-red-50 border border-red-200 rounded-md p-3">
    <p className="text-red-600 text-sm">{apiError}</p>
  </div>
)}
```

## Sécurité

### Stockage des Tokens
- Les tokens sont stockés dans le `localStorage`
- **Note** : Pour une sécurité renforcée, considérez l'utilisation de `httpOnly` cookies

### Validation des Tokens
- Vérification automatique de la validité au chargement
- Gestion des tokens expirés
- Possibilité de rafraîchissement automatique

### Headers de Sécurité
```javascript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};
```

## Utilisation dans les Composants

### Page de Connexion
```javascript
import { useAuth } from '../hooks/useAuth';

const { login } = useAuth();

const handleSubmit = async (e) => {
  const response = await loginUser(form);
  login(response.user, response.token);
  navigate('/dashboard');
};
```

### Dashboard
```javascript
import { useAuth } from '../hooks/useAuth';

const { logout } = useAuth();

const handleLogout = async () => {
  await logoutUser();
  logout();
  navigate('/');
};
```

## Configuration

### Variables d'Environnement
```env
VITE_API_URL=http://localhost:3000/api
```

### Structure de Réponse API
```javascript
// Succès
{
  success: true,
  token: "jwt_token_here",
  user: {
    id: 1,
    email: "user@example.com",
    name: "John Doe"
  }
}

// Erreur
{
  success: false,
  error: "Message d'erreur"
}
```

## Tests

### Test de Connexion
```javascript
// Test avec des identifiants valides
const credentials = {
  email: "test@example.com",
  password: "password123"
};
const response = await loginUser(credentials);
expect(response.token).toBeDefined();
```

### Test de Protection de Route
```javascript
// Test sans token
localStorage.removeItem('token');
render(<PrivateRoute><Dashboard /></PrivateRoute>);
expect(screen.getByText('Connexion')).toBeInTheDocument();
```

## Maintenance

### Nettoyage des Tokens
- Suppression automatique des tokens expirés
- Nettoyage lors de la déconnexion
- Gestion des erreurs de réseau

### Monitoring
- Logs des tentatives de connexion
- Suivi des erreurs d'authentification
- Métriques de performance

## Évolutions Futures

### Améliorations Possibles
1. **Refresh Token** : Implémentation complète du rafraîchissement automatique
2. **Multi-factor Authentication** : Ajout de l'authentification à deux facteurs
3. **OAuth** : Intégration avec Google, Facebook, etc.
4. **Session Management** : Gestion des sessions multiples
5. **Audit Trail** : Traçabilité des connexions/déconnexions 