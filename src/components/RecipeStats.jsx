import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RecipeStats = ({ recipes, userPreferences }) => {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    favoriteCuisine: "",
    averageCalories: 0,
    mostUsedIngredients: [],
    healthGoals: [],
    cookingTime: { quick: 0, medium: 0, long: 0 }
  });

  useEffect(() => {
    if (recipes.length > 0) {
      calculateStats();
    }
  }, [recipes]);

  const calculateStats = () => {
    const cuisineCount = {};
    const ingredientCount = {};
    const healthCount = {};
    let totalCalories = 0;
    const timeStats = { quick: 0, medium: 0, long: 0 };

    recipes.forEach(recipe => {
      // Cuisine préférée
      cuisineCount[recipe.category] = (cuisineCount[recipe.category] || 0) + 1;
      
      // Calories moyennes
      if (recipe.nutrition) {
        totalCalories += recipe.nutrition.calories;
      }

      // Ingrédients les plus utilisés
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
        });
      }

      // Critères de santé
      if (recipe.health) {
        recipe.health.forEach(health => {
          healthCount[health] = (healthCount[health] || 0) + 1;
        });
      }

      // Temps de cuisson
      const time = recipe.time;
      if (time.includes('min')) {
        const minutes = parseInt(time);
        if (minutes <= 20) timeStats.quick++;
        else if (minutes <= 45) timeStats.medium++;
        else timeStats.long++;
      }
    });

    const favoriteCuisine = Object.keys(cuisineCount).reduce((a, b) => 
      cuisineCount[a] > cuisineCount[b] ? a : b
    );

    const mostUsedIngredients = Object.entries(ingredientCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([ingredient]) => ingredient);

    const topHealthGoals = Object.entries(healthCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([health]) => health);

    setStats({
      totalRecipes: recipes.length,
      favoriteCuisine,
      averageCalories: Math.round(totalCalories / recipes.length),
      mostUsedIngredients,
      healthGoals: topHealthGoals,
      cookingTime: timeStats
    });
  };

  const getCuisineEmoji = (cuisine) => {
    const emojis = {
      europe: "🥖",
      africa: "🍲",
      asia: "🍜",
      orient: "🥙",
      americas: "🌮",
      world: "🌍"
    };
    return emojis[cuisine] || "🍽️";
  };

  const getHealthEmoji = (health) => {
    const emojis = {
      vegetarian: "🥬",
      vegan: "🌱",
      gluten_free: "🌾",
      lactose_free: "🥛",
      low_carb: "🍞",
      low_fat: "🥑",
      high_protein: "💪",
      diabetic: "🩸",
      heart_healthy: "❤️",
      low_sodium: "🧂"
    };
    return emojis[health] || "🏥";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">📊 Vos Statistiques Culinaires</h3>
        <span className="bg-gradient-to-r from-coral-400 to-peach-400 text-white px-3 py-1 rounded-full text-sm font-medium">
          {stats.totalRecipes} recettes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cuisine préférée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-sage-50 to-mint-50 rounded-lg p-4 border border-sage-200"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-3xl">{getCuisineEmoji(stats.favoriteCuisine)}</div>
            <div>
              <h4 className="font-semibold text-gray-900">Cuisine préférée</h4>
              <p className="text-sm text-gray-600">Style le plus cuisiné</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-sage-700 capitalize">
            {stats.favoriteCuisine.replace('_', ' ')}
          </div>
        </motion.div>

        {/* Calories moyennes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-coral-50 to-peach-50 rounded-lg p-4 border border-coral-200"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-3xl">🔥</div>
            <div>
              <h4 className="font-semibold text-gray-900">Calories moyennes</h4>
              <p className="text-sm text-gray-600">Par recette</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-coral-700">
            {stats.averageCalories} kcal
          </div>
        </motion.div>

        {/* Temps de cuisson */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-lavender-50 to-purple-50 rounded-lg p-4 border border-lavender-200"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-3xl">⏱️</div>
            <div>
              <h4 className="font-semibold text-gray-900">Temps de cuisson</h4>
              <p className="text-sm text-gray-600">Préférences</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Rapide (≤20min)</span>
              <span className="font-semibold text-lavender-700">{stats.cookingTime.quick}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Moyen (21-45min)</span>
              <span className="font-semibold text-lavender-700">{stats.cookingTime.medium}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Long (>45min)</span>
              <span className="font-semibold text-lavender-700">{stats.cookingTime.long}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ingrédients les plus utilisés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <h4 className="font-semibold text-gray-900 mb-3">🥕 Ingrédients préférés</h4>
        <div className="flex flex-wrap gap-2">
          {stats.mostUsedIngredients.map((ingredient, index) => (
            <motion.span
              key={ingredient}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-r from-sage-100 to-mint-100 text-sage-800 px-3 py-1 rounded-full text-sm font-medium border border-sage-200"
            >
              {ingredient}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Objectifs santé */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <h4 className="font-semibold text-gray-900 mb-3">🎯 Objectifs santé</h4>
        <div className="flex flex-wrap gap-2">
          {stats.healthGoals.map((health, index) => (
            <motion.span
              key={health}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200 flex items-center space-x-1"
            >
              <span>{getHealthEmoji(health)}</span>
              <span>{health.replace('_', ' ')}</span>
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Insights personnalisés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200"
      >
        <h4 className="font-semibold text-gray-900 mb-2">💡 Insights personnalisés</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Vous privilégiez la cuisine <strong>{stats.favoriteCuisine}</strong> dans vos recettes</p>
          <p>• Votre apport calorique moyen est de <strong>{stats.averageCalories} kcal</strong> par repas</p>
          <p>• Vous cuisinez principalement des plats <strong>
            {stats.cookingTime.quick > stats.cookingTime.medium ? 'rapides' : 
             stats.cookingTime.medium > stats.cookingTime.long ? 'de difficulté moyenne' : 'qui prennent du temps'}
          </strong></p>
          {stats.healthGoals.length > 0 && (
            <p>• Vos priorités santé : <strong>{stats.healthGoals.join(', ')}</strong></p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RecipeStats; 