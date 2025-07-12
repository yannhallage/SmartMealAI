import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SmartSearch = ({ onSearch, recipes, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    timeRange: "all",
    difficulty: "all",
    calories: "all",
    cuisine: "all"
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);

  // Suggestions intelligentes basées sur les recettes
  const allIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients || []))];
  const allCuisines = [...new Set(recipes.map(recipe => recipe.category))];
  const allHealthCriteria = [...new Set(recipes.flatMap(recipe => recipe.health || []))];

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = [
        ...allIngredients.filter(item => 
          item.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        ...allCuisines.filter(item => 
          item.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        ...allHealthCriteria.filter(item => 
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ].slice(0, 8);
      
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, recipes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsExpanded(false);
    
    // Ajouter aux recherches récentes
    if (term && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
    
    onSearch(term);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getEmojiForSuggestion = (suggestion) => {
    if (allIngredients.includes(suggestion)) return "🥕";
    if (allCuisines.includes(suggestion)) return "🌍";
    if (allHealthCriteria.includes(suggestion)) return "🏥";
    return "🔍";
  };

  const getTimeRangeLabel = (range) => {
    const labels = {
      quick: "Rapide (≤20min)",
      medium: "Moyen (21-45min)",
      long: "Long (>45min)",
      all: "Tous les temps"
    };
    return labels[range];
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      easy: "Facile",
      medium: "Intermédiaire",
      hard: "Difficile",
      all: "Toutes difficultés"
    };
    return labels[difficulty];
  };

  const getCaloriesLabel = (calories) => {
    const labels = {
      low: "Faible (<300kcal)",
      medium: "Moyen (300-500kcal)",
      high: "Élevé (>500kcal)",
      all: "Toutes calories"
    };
    return labels[calories];
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Barre de recherche principale */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400 text-xl">🔍</span>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Rechercher des recettes, ingrédients, cuisines..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white shadow-sm"
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <span className="text-gray-400 hover:text-gray-600 transition-colors">
            {isExpanded ? "▲" : "▼"}
          </span>
        </button>
      </div>

      {/* Panneau de recherche avancée */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 p-4"
          >
            {/* Suggestions intelligentes */}
            {suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Suggestions</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSearch(suggestion)}
                      className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      <span>{getEmojiForSuggestion(suggestion)}</span>
                      <span>{suggestion}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Recherches récentes */}
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">🕒 Recherches récentes</h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSearch(search)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtres avancés */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">🎛️ Filtres avancés</h4>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Temps de cuisson */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    ⏱️ Temps de cuisson
                  </label>
                  <select
                    value={filters.timeRange}
                    onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500"
                  >
                    <option value="all">Tous les temps</option>
                    <option value="quick">Rapide (≤20min)</option>
                    <option value="medium">Moyen (21-45min)</option>
                    <option value="long">Long (45min)</option>
                  </select>
                </div>

                {/* Difficulté */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    📊 Difficulté
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500"
                  >
                    <option value="all">Toutes difficultés</option>
                    <option value="easy">Facile</option>
                    <option value="medium">Intermédiaire</option>
                    <option value="hard">Difficile</option>
                  </select>
                </div>

                {/* Calories */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    🔥 Calories
                  </label>
                  <select
                    value={filters.calories}
                    onChange={(e) => handleFilterChange('calories', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500"
                  >
                    <option value="all">Toutes calories</option>
                    <option value="low">Faible (300kcal)</option>
                    <option value="medium">Moyen (300-500kcal)</option>
                    <option value="high">Élevé (500kcal)</option>
                  </select>
                </div>

                {/* Cuisine */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    🌍 Cuisine
                  </label>
                  <select
                    value={filters.cuisine}
                    onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500"
                  >
                    <option value="all">Toutes cuisines</option>
                    <option value="europe">Européenne</option>
                    <option value="africa">Africaine</option>
                    <option value="asia">Asiatique</option>
                    <option value="orient">Orientale</option>
                    <option value="americas">Américaine</option>
                    <option value="world">Fusion</option>
                  </select>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => {
                    setFilters({
                      timeRange: "all",
                      difficulty: "all",
                      calories: "all",
                      cuisine: "all"
                    });
                    onFilterChange({
                      timeRange: "all",
                      difficulty: "all",
                      calories: "all",
                      cuisine: "all"
                    });
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                >
                  🔄 Réinitialiser
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 bg-gradient-to-r from-coral-400 to-peach-400 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-coral-500 hover:to-peach-500 transition-all duration-200"
                >
                  ✅ Appliquer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearch; 