import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const healthCriteria = [
  { key: "vegetarian", label: "Végétarien", emoji: "🥬" },
  { key: "vegan", label: "Végan", emoji: "🌱" },
  { key: "gluten_free", label: "Sans gluten", emoji: "🌾" },
  { key: "lactose_free", label: "Sans lactose", emoji: "🥛" },
  { key: "low_carb", label: "Faible en glucides", emoji: "🍞" },
  { key: "low_fat", label: "Faible en matières grasses", emoji: "🥑" },
  { key: "high_protein", label: "Riche en protéines", emoji: "💪" },
  { key: "diabetic", label: "Diabétique", emoji: "🩸" },
  { key: "heart_healthy", label: "Bon pour le cœur", emoji: "❤️" },
  { key: "low_sodium", label: "Faible en sodium", emoji: "🧂" },
];

const RecipeModal = ({ isOpen, onClose, recipe, onAccept }) => {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full w-[700px] max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header - copie exacte du style HistoryModal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-coral-400 via-peach-400 to-honey-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
                  <p className="text-gray-600 text-sm">Détail de la recette générée par SmartMealAI</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content - même structure que HistoryModal */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="bg-gray-100 rounded-lg w-40 h-40 flex items-center justify-center overflow-hidden">
                      <img
                        src={recipe.img}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Infos principales */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
                        {recipe.category}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
                        ⏱️ {recipe.time}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-2">{recipe.desc}</p>
                    {/* Critères de santé */}
                    {recipe.health && recipe.health.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Critères de santé :</h4>
                        <div className="flex flex-wrap gap-2">
                          {recipe.health.map((health) => {
                            const healthInfo = healthCriteria.find(h => h.key === health);
                            return healthInfo ? (
                              <span
                                key={health}
                                className="bg-white px-3 py-1 rounded-full text-xs text-green-700 border border-green-200"
                              >
                                {healthInfo.emoji} {healthInfo.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    {/* Allergènes */}
                    {recipe.allergens && recipe.allergens.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Allergènes :</h4>
                        <div className="flex flex-wrap gap-2">
                          {recipe.allergens.map((allergen) => (
                            <span
                              key={allergen}
                              className="bg-white px-3 py-1 rounded-full text-xs text-red-700 border border-red-200"
                            >
                              ⚠️ {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Ingrédients */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Ingrédients principaux :</h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <span
                            key={idx}
                            className="bg-white px-3 py-1 rounded-full text-xs text-gray-700 border border-gray-200"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Nutrition */}
                    {recipe.nutrition && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Nutrition (par portion) :</h4>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-white px-3 py-1 rounded-full text-xs text-blue-700 border border-blue-200">
                            {recipe.nutrition.calories} kcal
                          </span>
                          <span className="bg-white px-3 py-1 rounded-full text-xs text-green-700 border border-green-200">
                            {recipe.nutrition.protein}g protéines
                          </span>
                          <span className="bg-white px-3 py-1 rounded-full text-xs text-orange-700 border border-orange-200">
                            {recipe.nutrition.carbs}g glucides
                          </span>
                          <span className="bg-white px-3 py-1 rounded-full text-xs text-red-700 border border-red-200">
                            {recipe.nutrition.fat}g lipides
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Instructions (placeholder) */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Instructions de préparation :</h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-600 italic">
                      Les instructions détaillées de préparation seront générées par l'IA en fonction de vos ingrédients et préférences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    onClick={() => onAccept && onAccept(recipe)}
                  >
                    Accepter cette recette
                  </button>
                  <p className="text-sm text-gray-600">
                    Détail de la recette
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal; 