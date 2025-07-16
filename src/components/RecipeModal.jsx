import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addRecipeToHistory } from '../api/history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // Utilisation stricte des attributs français du backend
  const {
    titre,
    imageUrl,
    description,
    ingredientsPrincipaux = [],
    nutritionParPortion = {},
    allergenes = [],
    criteresSante = [],
    origine,
    tempsPreparation,
    instructions
  } = recipe;

  if (recipe) {
    console.log('🔍 RecipeModal:', recipe);
  }

  const validCriteres = [
    "vegetarien", "vegan", "sansGluten", "sansLactose", "faibleGlucides",
    "faibleCalories", "richeEnProteines", "diabetique", "bonPourLeCoeur", "faibleSodium"
  ];

  const mapCritere = (critere) => {
    const mapping = {
      "Végétarien": "vegetarien",
      "Végan": "vegan",
      "Sans gluten": "sansGluten",
      "Sans lactose": "sansLactose",
      "Faible en glucides": "faibleGlucides",
      "Faible en matières grasses": "faibleCalories",
      "Riche en protéines": "richeEnProteines",
      "Diabétique": "diabetique",
      "Bon pour le cœur": "bonPourLeCoeur",
      "Faible en sodium": "faibleSodium"
    };
    return mapping[critere] || critere;
  };

  const handleAccept = async () => {
    try {
      const { _id, id, criteresSante = [], ...recipeToSend } = recipe;
      const mappedCriteres = criteresSante.map(mapCritere).filter(c => validCriteres.includes(c));
      if (mappedCriteres.length > 0) {
        recipeToSend.criteresSante = mappedCriteres;
      } else {
        delete recipeToSend.criteresSante;
      }
      await addRecipeToHistory(recipeToSend);
      toast.success('Recette ajoutée à l\'historique !');
      if (onAccept) onAccept(recipe);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout à l\'historique');
      console.error('Erreur lors de l\'ajout à l\'historique', error);
    }
  };

  return (
    <>
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
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-coral-400 via-peach-400 to-honey-400 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🍽️</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{titre}</h2>
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

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="bg-gray-100 rounded-lg w-40 h-40 flex items-center justify-center overflow-hidden">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={titre}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">Aucune image</div>
                        )}
                      </div>
                    </div>
                    {/* Infos principales */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
                          {origine || 'Origine inconnue'}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
                          ⏱️ {tempsPreparation ? tempsPreparation + ' min' : '-- min'}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-2">{description}</p>
                      {/* Critères de santé */}
                      {criteresSante.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Critères de santé :</h4>
                          <div className="flex flex-wrap gap-2">
                            {criteresSante.map((critere) => (
                              <span
                                key={critere}
                                className="bg-white px-3 py-1 rounded-full text-xs text-green-700 border border-green-200"
                              >
                                {critere}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Allergènes */}
                      {allergenes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Allergènes :</h4>
                          <div className="flex flex-wrap gap-2">
                            {allergenes.map((allergen) => (
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
                      {/* Ingrédients principaux */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Ingrédients principaux :</h4>
                        <div className="flex flex-wrap gap-2">
                          {ingredientsPrincipaux.length > 0 ? ingredientsPrincipaux.map((ingredient, idx) => (
                            <span
                              key={idx}
                              className="bg-white px-3 py-1 rounded-full text-xs text-gray-700 border border-gray-200"
                            >
                              {ingredient}
                            </span>
                          )) : <span className="text-gray-400 text-xs">Aucun ingrédient</span>}
                        </div>
                      </div>
                      {/* Nutrition (par portion) */}
                      {nutritionParPortion && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Nutrition (par portion) :</h4>
                          <div className="flex flex-wrap gap-3">
                            <span className="bg-white px-3 py-1 rounded-full text-xs text-blue-700 border border-blue-200">
                              {nutritionParPortion.kcal || 0} kcal
                            </span>
                            <span className="bg-white px-3 py-1 rounded-full text-xs text-green-700 border border-green-200">
                              {nutritionParPortion.proteines || 0}g protéines
                            </span>
                            <span className="bg-white px-3 py-1 rounded-full text-xs text-orange-700 border border-orange-200">
                              {nutritionParPortion.glucides || 0}g glucides
                            </span>
                            <span className="bg-white px-3 py-1 rounded-full text-xs text-red-700 border border-red-200">
                              {nutritionParPortion.lipides || 0}g lipides
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Instructions */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Instructions de préparation :</h4>
                    <div className="bg-gray-50 rounded-xl p-4">
                      {instructions ? (
                        instructions.split('\n').map((line, idx) => (
                          <div key={idx} className="text-gray-700 mb-1">{line}</div>
                        ))
                      ) : (
                        <p className="text-gray-600 italic">
                          Aucune instruction disponible.
                        </p>
                      )}
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
                      onClick={handleAccept}
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
    </>
  );
};

export default RecipeModal; 