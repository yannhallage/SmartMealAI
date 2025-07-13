import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const HistoryModal = ({ isOpen, onClose, historyData = [] }) => {
  // Données d'exemple pour l'historique
  const sampleHistory = [
    {
      id: 1,
      name: "Pâtes Carbonara",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      description: "Un classique italien crémeux avec des lardons et du parmesan. Recette générée le 15/12/2024.",
      date: "15/12/2024",
      ingredients: ["Pâtes", "Œufs", "Fromage", "Lardons"],
      time: "20 min",
      category: "Européen"
    },
    {
      id: 2,
      name: "Poulet Yassa",
      image: "https://cdn.aistoucuisine.com/assets/1491161b-a00b-48ad-aa63-2cc8a9b9a92c/yassa-poulet.webp?format=webp&quality=75&width=1024",
      description: "Spécialité sénégalaise acidulée avec du poulet mariné. Recette générée le 14/12/2024.",
      date: "14/12/2024",
      ingredients: ["Poulet", "Oignons", "Citron", "Huile"],
      time: "50 min",
      category: "Africain"
    },
    {
      id: 3,
      name: "Pad Thaï",
      image: "https://images.unsplash.com/photo-1637806931098-af30b519be53?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Nouilles sautées thaïlandaises avec crevettes et cacahuètes. Recette générée le 13/12/2024.",
      date: "13/12/2024",
      ingredients: ["Nouilles de riz", "Crevettes", "Tofu", "Cacahuètes"],
      time: "25 min",
      category: "Asiatique"
    },
    {
      id: 4,
      name: "Falafel Bowl",
      image: "https://images.unsplash.com/photo-1701688596783-231b3764ef67?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Boulettes veggie et houmous dans un bowl healthy. Recette générée le 12/12/2024.",
      date: "12/12/2024",
      ingredients: ["Pois chiches", "Persil", "Ail", "Houmous"],
      time: "30 min",
      category: "Oriental"
    },
    {
      id: 5,
      name: "Poké Bowl",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      description: "Fusion healthy du monde avec saumon et avocat. Recette générée le 11/12/2024.",
      date: "11/12/2024",
      ingredients: ["Riz", "Saumon", "Avocat", "Mangue"],
      time: "18 min",
      category: "Fusion"
    }
  ];

  const history = historyData.length > 0 ? historyData : sampleHistory;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-coral-400 via-peach-400 to-honey-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📚</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Historique des recettes</h2>
                  <p className="text-gray-600 text-sm">Vos recettes générées par SmartMealAI</p>
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
              {history.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun historique</h3>
                  <p className="text-gray-600">Vous n'avez pas encore généré de recettes. Commencez à cuisiner !</p>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {history.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-32 h-32 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-coral-600 transition-colors">
                                {recipe.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {recipe.category} • {recipe.time} • {recipe.date}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-400 hover:text-coral-600 hover:bg-coral-50 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                              <button className="p-2 text-gray-400 hover:text-coral-600 hover:bg-coral-50 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <p className="text-gray-700 leading-relaxed">
                            {recipe.description}
                          </p>

                          {/* Ingredients */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Ingrédients principaux :</h4>
                            <div className="flex flex-wrap gap-2">
                              {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                                <span
                                  key={idx}
                                  className="bg-white px-3 py-1 rounded-full text-xs text-gray-700 border border-gray-200"
                                >
                                  {ingredient}
                                </span>
                              ))}
                              {recipe.ingredients.length > 4 && (
                                <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-200">
                                  +{recipe.ingredients.length - 4} autres
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-3 pt-2">
                            <button className="bg-gradient-to-r from-coral-400 to-peach-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-coral-500 hover:to-peach-500 transition-all duration-200">
                              Voir la recette complète
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                              Régénérer
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {history.length} recette{history.length !== 1 ? 's' : ''} dans l'historique
                </p>
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

export default HistoryModal; 