import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutUser, getAuthHeaders, getUserId } from "../api/auth";
import { api } from "../api/apiClient";
import { useAuth } from "../hooks/useAuth.jsx";
import HistoryModal from "../components/HistoryModal";
import ModeSelector from "../components/ModeSelector";
import CuisineStyleSelector from "../components/CuisineStyleSelector";
import IngredientSelector from "../components/IngredientSelector";
import HealthCriteriaSelector from "../components/HealthCriteriaSelector";
import AllergySelector from "../components/AllergySelector";
import RecipeCard from "../components/RecipeCard";
import QuickActions from "../components/QuickActions";
import RecipeGenerator from "../components/RecipeGenerator";
import RecipeStats from "../components/RecipeStats";
import SmartSearch from "../components/SmartSearch";
import CookingTimer from "../components/CookingTimer";
import { AnimatePresence } from "framer-motion";
import RecipeModal from "../components/RecipeModal";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-black rounded-full animate-spin" style={{ animationDelay: '0.1s' }}></div>
    </div>
    <p className="mt-4 text-gray-600 font-medium">🤖 Génération IA en cours...</p>
    <p className="mt-2 text-gray-500 text-sm">Analyse de vos ingrédients et critères</p>
    <div className="mt-4 flex space-x-2">
      <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);


const allRecipes = [
  {
    titre: "Pâtes Carbonara",
    origine: "europe",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Un classique italien crémeux.",
    tempsPreparation: 20,
    ingredientsPrincipaux: ["Pâtes", "Œufs", "Fromage", "Lardons", "Poivre noir"],
    criteresSante: ["richeEnProteines"],
    allergenes: ["gluten", "lactose", "œufs"],
    nutritionParPortion: { kcal: 450, proteines: 25, glucides: 35, lipides: 22 }
  },
  {
    titre: "Quiche Lorraine",
    origine: "europe",
    imageUrl: "https://images.unsplash.com/photo-1650844010413-3f24dc1c182b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "La France dans votre assiette.",
    tempsPreparation: 35,
    ingredientsPrincipaux: ["Pâte brisée", "Œufs", "Crème", "Lardons", "Fromage"],
    criteresSante: ["richeEnProteines"],
    allergenes: ["gluten", "lactose", "œufs"],
    nutritionParPortion: { kcal: 380, proteines: 18, glucides: 28, lipides: 24 }
  },
  {
    titre: "Poulet Yassa",
    origine: "africa",
    imageUrl: "https://cdn.aistoucuisine.com/assets/1491161b-a00b-48ad-aa63-2cc8a9b9a92c/yassa-poulet.webp?format=webp&quality=75&width=1024",
    description: "Spécialité sénégalaise acidulée.",
    tempsPreparation: 50,
    ingredientsPrincipaux: ["Poulet", "Oignons", "Citron", "Huile", "Épices"],
    criteresSante: ["richeEnProteines", "faibleEnGlucides"],
    allergenes: [],
    nutritionParPortion: { kcal: 320, proteines: 35, glucides: 8, lipides: 18 }
  },
  {
    titre: "Mafé",
    origine: "africa",
    imageUrl: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_728,h_546/k%2FPhoto%2FRecipes%2F2021-11-mafe%2F2021-11-03_ATK11087",
    description: "Ragoût africain à la cacahuète.",
    tempsPreparation: 45,
    ingredientsPrincipaux: ["Viande", "Cacahuètes", "Tomates", "Oignons", "Riz"],
    criteresSante: ["richeEnProteines"],
    allergenes: ["arachides"],
    nutritionParPortion: { kcal: 420, proteines: 28, glucides: 32, lipides: 26 }
  },
  {
    titre: "Pad Thaï",
    origine: "asia",
    imageUrl: "https://images.unsplash.com/photo-1637806931098-af30b519be53?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Nouilles sautées thaïlandaises.",
    tempsPreparation: 25,
    ingredientsPrincipaux: ["Nouilles de riz", "Œufs", "Tofu", "Crevettes", "Cacahuètes"],
    criteresSante: ["richeEnProteines"],
    allergenes: ["gluten", "œufs", "crustacés", "arachides", "soja"],
    nutritionParPortion: { kcal: 380, proteines: 22, glucides: 45, lipides: 16 }
  },
  {
    titre: "Sushi Bowl",
    origine: "asia",
    imageUrl: "https://images.unsplash.com/photo-1726824863833-e88146cf0a72?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Version déstructurée du sushi.",
    tempsPreparation: 15,
    ingredientsPrincipaux: ["Riz", "Saumon", "Avocat", "Concombre", "Algues"],
    criteresSante: ["richeEnProteines", "bonPourLeCoeur"],
    allergenes: ["poisson"],
    nutritionParPortion: { kcal: 340, proteines: 24, glucides: 38, lipides: 14 }
  },
  {
    titre: "Tajine d'agneau",
    origine: "orient",
    imageUrl: "https://kissmychef.com/wp-content/uploads/2024/10/tajine.png",
    description: "Saveurs du Maghreb.",
    tempsPreparation: 90,
    ingredientsPrincipaux: ["Agneau", "Pruneaux", "Amandes", "Épices", "Couscous"],
    criteresSante: ["richeEnProteines"],
    allergenes: ["gluten", "noix"],
    nutritionParPortion: { kcal: 480, proteines: 32, glucides: 42, lipides: 28 }
  },
  {
    titre: "Falafel Bowl",
    origine: "orient",
    imageUrl: "https://images.unsplash.com/photo-1701688596783-231b3764ef67?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Boulettes veggie et houmous.",
    tempsPreparation: 30,
    ingredientsPrincipaux: ["Pois chiches", "Persil", "Ail", "Pain pita", "Houmous"],
    criteresSante: ["vegetarien", "vegan", "richeEnProteines"],
    allergenes: ["gluten", "sésame"],
    nutritionParPortion: { kcal: 320, proteines: 18, glucides: 45, lipides: 12 }
  },
  {
    titre: "Tacos Mexicains",
    origine: "americas",
    imageUrl: "https://images.unsplash.com/photo-1613409385222-3d0decb6742a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Street food mexicaine.",
    tempsPreparation: 20,
    ingredientsPrincipaux: ["Tortillas", "Bœuf haché", "Tomates", "Oignons", "Avocat"],
    criteresSante: ["richeEnProteines"],
    allergenes: ["gluten"],
    nutritionParPortion: { kcal: 360, proteines: 26, glucides: 32, lipides: 18 }
  },
  {
    titre: "Burger Maison",
    origine: "americas",
    imageUrl: "https://plus.unsplash.com/premium_photo-1706540480687-605f201603fd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Le classique US revisité.",
    tempsPreparation: 25,
    ingredientsPrincipaux: ["Pain burger", "Steak haché", "Fromage", "Salade", "Tomates"],
    criteresSante: ["richeEnProteines"],
    allergenes: ["gluten", "lactose"],
    nutritionParPortion: { kcal: 520, proteines: 32, glucides: 28, lipides: 34 }
  },
  {
    titre: "Poké Bowl",
    origine: "world",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Fusion healthy du monde.",
    tempsPreparation: 18,
    ingredientsPrincipaux: ["Riz", "Saumon", "Avocat", "Mangue", "Sauce soja"],
    criteresSante: ["richeEnProteines", "bonPourLeCoeur"],
    allergenes: ["poisson", "soja"],
    nutritionParPortion: { kcal: 380, proteines: 26, glucides: 42, lipides: 16 }
  },
  {
    titre: "Salade Quinoa",
    origine: "world",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    description: "Salade healthy et protéinée.",
    tempsPreparation: 15,
    ingredientsPrincipaux: ["Quinoa", "Légumes", "Noix", "Vinaigrette", "Herbes"],
    criteresSante: ["vegetarien", "vegan", "sansGluten", "richeEnProteines"],
    allergenes: ["noix"],
    nutritionParPortion: { kcal: 280, proteines: 12, glucides: 38, lipides: 14 }
  },
];

export default function UserDashboard() {
  const [selectedCat, setSelectedCat] = useState("world");
  const [search, setSearch] = useState("");
  const [nomComplet, setNomComplet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [mode, setMode] = useState("style");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState("");
  const [selectedHealthCriteria, setSelectedHealthCriteria] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [customAllergy, setCustomAllergy] = useState("");
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recipes");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecipes(allRecipes);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Récupérer le nom_complet depuis localStorage (fallback)
  useEffect(() => {
    if (!user?.nom_complet) {
      const nomComplet = localStorage.getItem('nom_complet');
      if (nomComplet) {
        setNomComplet(nomComplet);
      }
    }
  }, [user?.nom_complet]);

  // Simulate loading when changing category or search
  useEffect(() => {
    if (mode === "style") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [selectedCat, search, mode]);

  const handleAddCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      const newIngredient = customIngredient.trim();
      setSelectedIngredients(prev => [...prev, newIngredient]);
      console.log(`✨ Ingrédient personnalisé ajouté: "${newIngredient}"`);
      console.log(`📋 Liste complète des ingrédients:`, [...selectedIngredients, newIngredient]);
      setCustomIngredient("");
    }
  };

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      setSelectedAllergies(prev => [...prev, customAllergy.trim()]);
      setCustomAllergy("");
    }
  };

  // Fonction pour traiter et formater les recettes du backend
  const processBackendRecipes = (recipes) => {
    return recipes.map(recipe => ({
      name: recipe.name || recipe.title || recipe.titre || recipe.nom || 'Recette sans nom',
      category: recipe.category || recipe.cuisine || recipe.origine || 'world',
      img: recipe.img || recipe.image || recipe.photo || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      desc: recipe.desc || recipe.description || recipe.descripcion || 'Description non disponible',
      time: recipe.time || recipe.duration || recipe.temps || recipe.tempsPreparation ? `${recipe.tempsPreparation} min` : 'Temps non spécifié',
      ingredients: recipe.ingredients || recipe.ingredient || recipe.ingredients || [],
      health: recipe.health || recipe.healthCriteria || recipe.criteres || recipe.criteresSante || [],
      allergens: recipe.allergens || recipe.allergies || recipe.allergenes || recipe.allergenes || [],
      nutrition: recipe.nutrition || recipe.nutritional || recipe.nutritionnel || { calories: 0, protein: 0, carbs: 0, fat: 0 },
      instructions: recipe.instructions || recipe.etapes || recipe.steps || recipe.etapesPreparation || [],
      difficulty: recipe.difficulty || recipe.difficulte || 'Facile',
      servings: recipe.servings || recipe.portions || recipe.personnes || recipe.nombrePersonnes || 2,
      tips: recipe.tips || recipe.conseils || recipe.astuces || recipe.conseilsChef || null,
      generatedAt: recipe.generatedAt || recipe.createdAt || new Date().toISOString(),
      source: 'backend',
      id: recipe.id || recipe._id || `backend-${Date.now()}-${Math.random()}`
    }));
  };

  // Fonction pour tester l'état de l'authentification
  const testAuthState = () => {
    console.log('🔍 Test de l\'état d\'authentification:');
    console.log('👤 User du contexte:', user);
    console.log('🔐 Token:', localStorage.getItem('token'));
    console.log('📝 Nom complet:', localStorage.getItem('nom_complet'));
    console.log('🆔 User ID:', localStorage.getItem('user_id'));
    
    // Essayer d'extraire l'ID du token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decoded = JSON.parse(jsonPayload);
        console.log('🔓 Token JWT décodé:', decoded);
      } catch (error) {
        console.error('❌ Erreur décodage token:', error);
      }
    }
  };

  // Fonction de fallback pour utiliser les recettes locales
  const useFallbackRecipes = () => {
    console.log('🔄 Utilisation du filtrage local...');
    let matchingRecipes = allRecipes.filter(recipe => {
      const hasIngredients = recipe.ingredientsPrincipaux.some(ingredient =>
        selectedIngredients.some(selected =>
          ingredient.toLowerCase().includes(selected.toLowerCase())
        )
      );

      const meetsHealthCriteria = selectedHealthCriteria.length === 0 ||
        selectedHealthCriteria.some(criteria => recipe.criteresSante.includes(criteria));

      const isAllergySafe = selectedAllergies.length === 0 ||
        !selectedAllergies.some(allergy =>
          recipe.allergenes.some(allergen =>
            allergen.toLowerCase().includes(allergy.toLowerCase())
          )
        );

      return hasIngredients && meetsHealthCriteria && isAllergySafe;
    });
    
    console.log('🎯 Recettes trouvées après filtrage local:', matchingRecipes.length);
    setRecipes(matchingRecipes);
  };

  const handleGenerateFromIngredients = () => {
    if (selectedIngredients.length > 0) {
      // Mapping des critères de santé vers le format attendu par le backend
      const healthCriteriaMapping = {
        "vegetarian": "vegetarien",
        "vegan": "vegan",
        "gluten_free": "sansGluten",
        "lactose_free": "sansLactose",
        "low_carb": "faibleGlucides",
        "low_fat": "faibleCalories",
        "high_protein": "richeEnProteines",
        "diabetic": "diabetique",
        "heart_healthy": "bonPourLeCoeur",
        "low_sodium": "faibleSodium"
      };

      // Conversion des critères de santé
      const convertedHealthCriteria = selectedHealthCriteria.map(criteria => 
        healthCriteriaMapping[criteria] || criteria
      );

      // Mapping des allergies vers le format attendu par le backend
      const allergyMapping = {
        "Gluten": "gluten",
        "Lactose": "lactose",
        "Œufs": "oeufs",
        "Arachides": "arachides",
        "Noix": "noix",
        "Poisson": "poisson",
        "Crustacés": "crustaces",
        "Soja": "soja",
        "Sésame": "sesame",
        "Moutarde": "moutarde",
        "Céleri": "celeri",
        "Sulfites": "sulfites",
        "Lupin": "lupin",
        "Mollusques": "mollusques"
      };

      // Conversion des allergies
      const convertedAllergies = selectedAllergies.map(allergy => 
        allergyMapping[allergy] || allergy.toLowerCase()
      );

      // Vérifier que l'utilisateur est connecté et récupérer l'ID
      let userId = user?.id;
      
      if (!userId) {
        // Essayer de récupérer l'ID depuis localStorage
        userId = getUserId();
        console.log('🔄 Récupération de l\'ID utilisateur depuis localStorage:', userId);
      }
      
      if (!userId) {
        console.error('❌ Erreur: Utilisateur non connecté ou ID manquant');
        console.error('👤 État de l\'utilisateur:', user);
        console.error('🔐 Token disponible:', !!localStorage.getItem('token'));
        console.error('🆔 ID utilisateur dans localStorage:', getUserId());
        
        // Afficher tout le contenu du localStorage pour le débogage
        console.log('📦 Contenu complet du localStorage:');
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          console.log(`   ${key}:`, value);
        }
        
        alert('Veuillez vous reconnecter pour générer des recettes.');
        return;
      }

      // Préparer les données à envoyer
      const requestData = {
        ingredients: selectedIngredients,
        healthCriteria: convertedHealthCriteria,
        allergies: convertedAllergies,
        timestamp: new Date().toISOString(),
        userId: userId
      };

      console.log('🔄 Conversion des critères de santé:');
      console.log('   Original:', selectedHealthCriteria);
      console.log('   Converti:', convertedHealthCriteria);
      console.log('🔄 Conversion des allergies:');
      console.log('   Original:', selectedAllergies);
      console.log('   Converti:', convertedAllergies);

      // Validation des données avant envoi
      console.log('🔍 Validation des données avant envoi:');
      const validation = {
        ingredients: {
          isValid: Array.isArray(requestData.ingredients) && requestData.ingredients.length > 0,
          value: requestData.ingredients,
          type: typeof requestData.ingredients
        },
        healthCriteria: {
          isValid: Array.isArray(requestData.healthCriteria),
          value: requestData.healthCriteria,
          type: typeof requestData.healthCriteria
        },
        allergies: {
          isValid: Array.isArray(requestData.allergies),
          value: requestData.allergies,
          type: typeof requestData.allergies
        },
        timestamp: {
          isValid: typeof requestData.timestamp === 'string' && requestData.timestamp.length > 0,
          value: requestData.timestamp,
          type: typeof requestData.timestamp
        },
        userId: {
          isValid: typeof requestData.userId === 'string' && requestData.userId.length > 0,
          value: requestData.userId,
          type: typeof requestData.userId
        }
      };

      console.log('✅ Validation des données:', validation);
      
      const hasErrors = Object.values(validation).some(field => !field.isValid);
      if (hasErrors) {
        console.error('❌ Erreurs de validation détectées:');
        Object.entries(validation).forEach(([key, field]) => {
          if (!field.isValid) {
            console.error(`   - ${key}: Type attendu 'array' ou 'string', reçu '${field.type}'`);
          }
        });
      }

      // Afficher les données en console AVANT l'envoi au backend
      console.log('🍽️ Données sélectionnées par l\'utilisateur (mode ingrédients):');
      console.log('📋 Ingrédients sélectionnés:', selectedIngredients);
      console.log('🏥 Critères de santé:', selectedHealthCriteria);
      console.log('⚠️ Allergies:', selectedAllergies);
      console.log('🕐 Timestamp:', requestData.timestamp);
      console.log('👤 Utilisateur:', requestData.userId);
      console.log('📦 Données complètes à envoyer au backend:', requestData);
      console.log('📋 Format attendu par le backend:');
      console.log('   {');
      console.log('     "ingredients": ["Poisson", "Riz", ...],');
      console.log('     "healthCriteria": ["vegetarien", "faibleCalories", ...],');
      console.log('     "allergies": ["gluten", "lactose", ...],');
      console.log('     "userId": "user123",');
      console.log('     "timestamp": "2025-01-13T22:35:57.822Z"');
      console.log('   }');
      console.log('---');

      setIsLoading(true);

      // Envoi des données au backend
      console.log('🚀 Envoi des données au backend...');
      console.log('🌐 URL appelée: http://localhost:3000/api/recipes/generate');
      console.log('📤 Méthode: POST');
      console.log('📋 Headers qui seront envoyés:', getAuthHeaders());
      
      // Simuler un temps de chargement de 4 secondes
      console.log('⏱️ Début du chargement (4 secondes)...');
      setIsLoading(true);
      
      // Appel API vers le backend avec délai
      setTimeout(() => {
        api.recipes.generate(requestData)
        .then(response => {
          console.log('✅ Réponse du backend reçue avec succès!');
          console.log('📦 Réponse complète du backend:', response);
          console.log('🔍 Type de réponse:', typeof response);
          console.log('📋 Clés disponibles dans la réponse:', Object.keys(response));
          
          // Afficher les métadonnées si elles existent
          if (response && typeof response === 'object') {
            if (response.status) console.log('📊 Statut:', response.status);
            if (response.message) console.log('💬 Message:', response.message);
            if (response.success !== undefined) console.log('✅ Succès:', response.success);
            if (response.count !== undefined) console.log('🔢 Nombre total:', response.count);
            if (response.timestamp) console.log('🕐 Timestamp réponse:', response.timestamp);
          }
          
          // Affichage détaillé de la réponse
          console.log('--- DÉTAILS DE LA RÉPONSE DU BACKEND ---');
          
          // Vérifier si c'est un tableau direct
          if (Array.isArray(response)) {
            console.log('📊 Format détecté: Tableau direct de recettes');
            console.log('🍽️ Nombre de recettes reçues:', response.length);
            console.log('📝 Recettes reçues:', response);
            
            // Analyser la structure des recettes
            if (response.length > 0) {
              console.log('🔍 Structure de la première recette:', response[0]);
              console.log('📋 Propriétés de la première recette:', Object.keys(response[0]));
            }
            
            // Traiter et formater les recettes du backend
            setRecipes(response);
          }
          // Vérifier si c'est un objet avec une propriété recipes
          else if (response && response.recipes && Array.isArray(response.recipes)) {
            console.log('📊 Format détecté: Objet avec propriété "recipes"');
            console.log('🍽️ Nombre de recettes reçues:', response.recipes.length);
            console.log('📝 Recettes reçues:', response.recipes);
            
            // Analyser la structure des recettes
            if (response.recipes.length > 0) {
              console.log('🔍 Structure de la première recette:', response.recipes[0]);
              console.log('📋 Propriétés de la première recette:', Object.keys(response.recipes[0]));
            }
            
            // Traiter et formater les recettes du backend
            setRecipes(response.recipes);
          }
          // Vérifier si c'est un objet avec une propriété data contenant recipes
          else if (response && response.data && response.data.recipes && Array.isArray(response.data.recipes)) {
            console.log('📊 Format détecté: Objet avec propriété "data.recipes"');
            console.log('🍽️ Nombre de recettes reçues:', response.data.recipes.length);
            console.log('📝 Recettes reçues:', response.data.recipes);
            
            // Traiter et formater les recettes du backend
            setRecipes(response.data.recipes);
          }
          // Vérifier si c'est un objet avec une propriété data (tableau direct)
          else if (response && response.data && Array.isArray(response.data)) {
            console.log('📊 Format détecté: Objet avec propriété "data" (tableau)');
            console.log('🍽️ Nombre de recettes reçues:', response.data.length);
            console.log('📝 Recettes reçues:', response.data);
            
            // Traiter et formater les recettes du backend
            setRecipes(response.data);
          }
          // Vérifier si c'est un objet avec une propriété results
          else if (response && response.results && Array.isArray(response.results)) {
            console.log('📊 Format détecté: Objet avec propriété "results"');
            console.log('🍽️ Nombre de recettes reçues:', response.results.length);
            console.log('📝 Recettes reçues:', response.results);
            
            // Traiter et formater les recettes du backend
            setRecipes(response.results);
          }
          // Vérifier si c'est un objet avec une propriété items
          else if (response && response.items && Array.isArray(response.items)) {
            console.log('📊 Format détecté: Objet avec propriété "items"');
            console.log('🍽️ Nombre de recettes reçues:', response.items.length);
            console.log('📝 Recettes reçues:', response.items);
            
            // Traiter et formater les recettes du backend
            setRecipes(response.items);
          }
          // Autres formats possibles
          else if (response && typeof response === 'object') {
            console.log('📊 Format détecté: Objet avec structure personnalisée');
            console.log('🔍 Structure de l\'objet:', response);
            
            // Chercher des tableaux dans l'objet
            const arrayKeys = Object.keys(response).filter(key => Array.isArray(response[key]));
            if (arrayKeys.length > 0) {
              console.log('📋 Tableaux trouvés dans la réponse:', arrayKeys);
              const firstArray = response[arrayKeys[0]];
              console.log(`🍽️ Utilisation du premier tableau (${arrayKeys[0]}):`, firstArray);
              
              // Traiter et formater les recettes du backend
              setRecipes(firstArray);
            } else {
              console.warn('⚠️ Aucun tableau trouvé dans la réponse, utilisation du fallback local');
              useFallbackRecipes();
            }
          }
          // Réponse inattendue
          else {
            console.warn('⚠️ Format de réponse inattendu:', response);
            console.warn('⚠️ Utilisation du fallback local');
            useFallbackRecipes();
          }
          
          console.log('--- FIN DÉTAILS DE LA RÉPONSE ---');
        })
        .catch(error => {
          console.error('❌ Erreur lors de l\'appel au backend:', error);
          console.error('🔍 Détails de l\'erreur:', {
            message: error.message,
            status: error.status,
            statusText: error.statusText,
            errorData: error.errorData,
            stack: error.stack
          });
          
          // Affichage détaillé selon le type d'erreur
          if (error.status === 400) {
            console.error('🚨 Erreur 400 - Bad Request:');
            console.error('📤 Données envoyées au backend:', requestData);
            console.error('📋 Format des données envoyées:', {
              ingredients: Array.isArray(requestData.ingredients) ? `${requestData.ingredients.length} ingrédients` : 'Format invalide',
              healthCriteria: Array.isArray(requestData.healthCriteria) ? `${requestData.healthCriteria.length} critères` : 'Format invalide',
              allergies: Array.isArray(requestData.allergies) ? `${requestData.allergies.length} allergies` : 'Format invalide',
              timestamp: typeof requestData.timestamp === 'string' ? 'Timestamp valide' : 'Format invalide',
              userId: typeof requestData.userId === 'string' ? 'UserID valide' : 'Format invalide'
            });
            
            if (error.errorData) {
              console.error('📝 Détails de l\'erreur du backend:', error.errorData);
            }
            
            console.error('💡 Suggestions:');
            console.error('   - Vérifiez que le backend attend bien ce format de données');
            console.error('   - Assurez-vous que tous les champs requis sont présents');
            console.error('   - Vérifiez les types de données (tableaux, chaînes, etc.)');
          } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            console.error('🌐 Erreur de connexion: Impossible de joindre le backend');
            console.error('💡 Vérifiez que le serveur backend est démarré sur http://localhost:3000');
          } else if (error.status === 401) {
            console.error('🔐 Erreur d\'authentification: Token invalide ou expiré');
          } else if (error.status === 403) {
            console.error('🚫 Erreur d\'autorisation: Accès refusé');
          } else if (error.status === 404) {
            console.error('🔍 Erreur 404: Endpoint non trouvé');
            console.error('💡 Vérifiez que l\'endpoint /api/recipes/generate existe sur le backend');
          } else if (error.status >= 500) {
            console.error('🔥 Erreur serveur: Problème côté backend');
            console.error('💡 Vérifiez les logs du serveur backend');
          }
          
          // Fallback vers le filtrage local en cas d'erreur
          useFallbackRecipes();
        })
        .finally(() => {
          console.log('🏁 Génération terminée');
          setIsLoading(false);
        });
      }, 4000); // 4 secondes de délai
    }
  };

  const handleRecipeGenerated = (recipe) => {
    setGeneratedRecipe(recipe);
    setActiveTab("generator");
  };

  const handleSearch = (term) => {
    setSearch(term);
  };

  const handleFilterChange = (filters) => {
    setSearchFilters(filters);
  };

  // Correction du filtrage pour attributs français
  const filtered = recipes.filter(
    r => (selectedCat === "world" || r.origine === selectedCat) &&
      ((r.titre && r.titre.toLowerCase().includes(search.toLowerCase())) ||
       (r.description && r.description.toLowerCase().includes(search.toLowerCase())))
  );

  const tabs = [
    { id: "recipes", label: "🍽️ Recettes", icon: "🍽️" },
    { id: "generator", label: "🤖 Générateur IA", icon: "🤖" },
    { id: "stats", label: "📊 Statistiques", icon: "📊" },
    { id: "timer", label: "⏱️ Minuteur", icon: "⏱️" }
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout(); // Mettre à jour le contexte d'authentification
      navigate("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      // Même en cas d'erreur, on déconnecte localement
      logout();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-peach-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-coral-400 via-peach-400 to-honey-400 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-basil-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🤖</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-coral-600 to-peach-600 bg-clip-text text-transparent">
                  SmartMealAI
                </span>
                <span className="text-xs text-gray-500 -mt-1">Cuisine intelligente</span>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-sage-600 transition-colors font-medium">
                Accueil
              </Link>
              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="text-gray-700 hover:text-sage-600 transition-colors font-medium flex items-center space-x-2"
              >
                <span>📚</span>
                <span>Mes recettes</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-sage-600 transition-colors font-medium"
              >
                Déconnexion
              </button>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-700 hover:text-sage-600 hover:bg-sage-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="relative w-full mb-12 animate-fadeInUp">
          <motion.img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
            alt="Cuisine conviviale"
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
            style={{ filter: 'brightness(0.7) blur(0px)' }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-xl max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 drop-shadow-lg">
                Bienvenue {user?.nom_complet || nomComplet} sur votre espace gourmand 👋
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-medium">
                Créez des repas personnalisés en tenant compte de vos ingrédients, préférences santé et allergies !
              </p>
            </div>
          </div>
        </div>

        {/* Smart Search */}
        <div className="mb-8">
          <SmartSearch
            onSearch={handleSearch}
            recipes={recipes}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-coral-400 to-peach-400 text-black shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "recipes" && (
            <motion.div
              key="recipes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mode Selection */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
                <ModeSelector mode={mode} setMode={setMode} />

                {/* Mode 1: Style Culinaire */}
                {mode === "style" && (
                  <CuisineStyleSelector selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
                )}

                {/* Mode 2: Ingrédients */}
                {mode === "ingredients" && (
                  <div className="space-y-6">
                    <IngredientSelector
                      selectedIngredients={selectedIngredients}
                      setSelectedIngredients={setSelectedIngredients}
                      customIngredient={customIngredient}
                      setCustomIngredient={setCustomIngredient}
                      handleAddCustomIngredient={handleAddCustomIngredient}
                    />

                    <HealthCriteriaSelector
                      selectedHealthCriteria={selectedHealthCriteria}
                      setSelectedHealthCriteria={setSelectedHealthCriteria}
                    />

                    <AllergySelector
                      selectedAllergies={selectedAllergies}
                      setSelectedAllergies={setSelectedAllergies}
                      customAllergy={customAllergy}
                      setCustomAllergy={setCustomAllergy}
                      handleAddCustomAllergy={handleAddCustomAllergy}
                    />

                    {/* Bouton de génération */}
                    <button
                      onClick={handleGenerateFromIngredients}
                      disabled={selectedIngredients.length === 0}
                      className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${selectedIngredients.length === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-gray-800'
                        }`}
                    >
                      🤖 Générer des recettes sécurisées avec ces critères
                    </button>
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading && <LoadingSpinner />}

              {/* Recipes Grid */}
              {!isLoading && (
                <div>
                  {/* Indicateur de source des recettes */}
                  {recipes.length > 0 && recipes[0]?.source === 'backend' && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🤖</span>
                        <div>
                          <h3 className="font-semibold text-green-800">Recettes générées par l'IA</h3>
                          <p className="text-green-600 text-sm">
                            {recipes.length} recettes personnalisées basées sur vos ingrédients et critères
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.length ? (
                      filtered.map((recipe, index) => (
                        <RecipeCard
                          key={recipe.id || recipe.name}
                          recipe={recipe}
                          index={index}
                          onVoirRecette={() => {
                            setSelectedRecipe(recipe);
                            setIsRecipeModalOpen(true);
                          }}
                        />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-gray-600 text-lg">
                          {mode === "ingredients"
                            ? "Aucune recette trouvée avec ces critères. Essayez d'ajuster vos ingrédients ou critères de santé !"
                            : "Aucune recette trouvée pour cette recherche ou catégorie."
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "generator" && (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RecipeGenerator
                selectedIngredients={selectedIngredients}
                selectedHealthCriteria={selectedHealthCriteria}
                selectedAllergies={selectedAllergies}
                onRecipeGenerated={handleRecipeGenerated}
              />
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RecipeStats
                recipes={recipes}
                userPreferences={{
                  ingredients: selectedIngredients,
                  healthCriteria: selectedHealthCriteria,
                  allergies: selectedAllergies
                }}
              />
            </motion.div>
          )}

          {activeTab === "timer" && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CookingTimer recipe={generatedRecipe || recipes[0]} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <QuickActions onHistoryClick={() => setIsHistoryModalOpen(true)} />
      </main>

      {/* Recipe Modal global */}
      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        recipe={selectedRecipe}
        onAccept={(recipe) => {
          setIsRecipeModalOpen(false);
          // Ici tu peux ajouter ta logique métier (ex: enregistrer la recette, changer d'état, etc)
          alert(`Recette acceptée : ${recipe.name}`);
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 