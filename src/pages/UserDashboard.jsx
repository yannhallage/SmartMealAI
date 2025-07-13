import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutUser } from "../api/auth";
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
    <p className="mt-4 text-gray-600 font-medium">Génération en cours...</p>
  </div>
);


const allRecipes = [
  {
    name: "Pâtes Carbonara",
    category: "europe",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    desc: "Un classique italien crémeux.",
    time: "20 min",
    ingredients: ["Pâtes", "Œufs", "Fromage", "Lardons", "Poivre noir"],
    health: ["high_protein"],
    allergens: ["gluten", "lactose", "œufs"],
    nutrition: { calories: 450, protein: 25, carbs: 35, fat: 22 }
  },
  {
    name: "Quiche Lorraine",
    category: "europe",
    img: "https://images.unsplash.com/photo-1650844010413-3f24dc1c182b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "La France dans votre assiette.",
    time: "35 min",
    ingredients: ["Pâte brisée", "Œufs", "Crème", "Lardons", "Fromage"],
    health: ["high_protein"],
    allergens: ["gluten", "lactose", "œufs"],
    nutrition: { calories: 380, protein: 18, carbs: 28, fat: 24 }
  },
  {
    name: "Poulet Yassa",
    category: "africa",
    img: "https://cdn.aistoucuisine.com/assets/1491161b-a00b-48ad-aa63-2cc8a9b9a92c/yassa-poulet.webp?format=webp&quality=75&width=1024",
    desc: "Spécialité sénégalaise acidulée.",
    time: "50 min",
    ingredients: ["Poulet", "Oignons", "Citron", "Huile", "Épices"],
    health: ["high_protein", "low_carb"],
    allergens: [],
    nutrition: { calories: 320, protein: 35, carbs: 8, fat: 18 }
  },
  {
    name: "Mafé",
    category: "africa",
    img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_728,h_546/k%2FPhoto%2FRecipes%2F2021-11-mafe%2F2021-11-03_ATK11087",
    desc: "Ragoût africain à la cacahuète.",
    time: "45 min",
    ingredients: ["Viande", "Cacahuètes", "Tomates", "Oignons", "Riz"],
    health: ["high_protein"],
    allergens: ["arachides"],
    nutrition: { calories: 420, protein: 28, carbs: 32, fat: 26 }
  },
  {
    name: "Pad Thaï",
    category: "asia",
    img: "https://images.unsplash.com/photo-1637806931098-af30b519be53?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Nouilles sautées thaïlandaises.",
    time: "25 min",
    ingredients: ["Nouilles de riz", "Œufs", "Tofu", "Crevettes", "Cacahuètes"],
    health: ["high_protein"],
    allergens: ["gluten", "œufs", "crustacés", "arachides", "soja"],
    nutrition: { calories: 380, protein: 22, carbs: 45, fat: 16 }
  },
  {
    name: "Sushi Bowl",
    category: "asia",
    img: "https://images.unsplash.com/photo-1726824863833-e88146cf0a72?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Version déstructurée du sushi.",
    time: "15 min",
    ingredients: ["Riz", "Saumon", "Avocat", "Concombre", "Algues"],
    health: ["high_protein", "heart_healthy"],
    allergens: ["poisson"],
    nutrition: { calories: 340, protein: 24, carbs: 38, fat: 14 }
  },
  {
    name: "Tajine d'agneau",
    category: "orient",
    img: "https://kissmychef.com/wp-content/uploads/2024/10/tajine.png",
    desc: "Saveurs du Maghreb.",
    time: "1h30",
    ingredients: ["Agneau", "Pruneaux", "Amandes", "Épices", "Couscous"],
    health: ["high_protein"],
    allergens: ["gluten", "noix"],
    nutrition: { calories: 480, protein: 32, carbs: 42, fat: 28 }
  },
  {
    name: "Falafel Bowl",
    category: "orient",
    img: "https://images.unsplash.com/photo-1701688596783-231b3764ef67?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Boulettes veggie et houmous.",
    time: "30 min",
    ingredients: ["Pois chiches", "Persil", "Ail", "Pain pita", "Houmous"],
    health: ["vegetarian", "vegan", "high_protein"],
    allergens: ["gluten", "sésame"],
    nutrition: { calories: 320, protein: 18, carbs: 45, fat: 12 }
  },
  {
    name: "Tacos Mexicains",
    category: "americas",
    img: "https://images.unsplash.com/photo-1613409385222-3d0decb6742a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Street food mexicaine.",
    time: "20 min",
    ingredients: ["Tortillas", "Bœuf haché", "Tomates", "Oignons", "Avocat"],
    health: ["high_protein"],
    allergens: ["gluten"],
    nutrition: { calories: 360, protein: 26, carbs: 32, fat: 18 }
  },
  {
    name: "Burger Maison",
    category: "americas",
    img: "https://plus.unsplash.com/premium_photo-1706540480687-605f201603fd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Le classique US revisité.",
    time: "25 min",
    ingredients: ["Pain burger", "Steak haché", "Fromage", "Salade", "Tomates"],
    health: ["high_protein"],
    allergens: ["gluten", "lactose"],
    nutrition: { calories: 520, protein: 32, carbs: 28, fat: 34 }
  },
  {
    name: "Poké Bowl",
    category: "world",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    desc: "Fusion healthy du monde.",
    time: "18 min",
    ingredients: ["Riz", "Saumon", "Avocat", "Mangue", "Sauce soja"],
    health: ["high_protein", "heart_healthy"],
    allergens: ["poisson", "soja"],
    nutrition: { calories: 380, protein: 26, carbs: 42, fat: 16 }
  },
  {
    name: "Salade Quinoa",
    category: "world",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    desc: "Salade healthy et protéinée.",
    time: "15 min",
    ingredients: ["Quinoa", "Légumes", "Noix", "Vinaigrette", "Herbes"],
    health: ["vegetarian", "vegan", "gluten_free", "high_protein"],
    allergens: ["noix"],
    nutrition: { calories: 280, protein: 12, carbs: 38, fat: 14 }
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
      setSelectedIngredients(prev => [...prev, customIngredient.trim()]);
      setCustomIngredient("");
    }
  };

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      setSelectedAllergies(prev => [...prev, customAllergy.trim()]);
      setCustomAllergy("");
    }
  };

  const handleGenerateFromIngredients = () => {
    if (selectedIngredients.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        let matchingRecipes = allRecipes.filter(recipe => {
          const hasIngredients = recipe.ingredients.some(ingredient =>
            selectedIngredients.some(selected =>
              ingredient.toLowerCase().includes(selected.toLowerCase())
            )
          );

          const meetsHealthCriteria = selectedHealthCriteria.length === 0 ||
            selectedHealthCriteria.some(criteria => recipe.health.includes(criteria));

          const isAllergySafe = selectedAllergies.length === 0 ||
            !selectedAllergies.some(allergy =>
              recipe.allergens.some(allergen =>
                allergen.toLowerCase().includes(allergy.toLowerCase())
              )
            );

          return hasIngredients && meetsHealthCriteria && isAllergySafe;
        });

        setRecipes(matchingRecipes);
        setIsLoading(false);
      }, 1500);
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

  const filtered = recipes.filter(
    r => (selectedCat === "world" || r.category === selectedCat) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()))
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
                <span>Historique</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filtered.length ? (
                    filtered.map((recipe, index) => (
                      <RecipeCard
                        key={recipe.name}
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