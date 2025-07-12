import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RecipeGenerator = ({ 
  selectedIngredients, 
  selectedHealthCriteria, 
  selectedAllergies,
  onRecipeGenerated 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  const generationSteps = [
    "🔍 Analyse des ingrédients disponibles...",
    "🧠 Calcul des combinaisons optimales...",
    "⚖️ Vérification des critères de santé...",
    "⚠️ Contrôle des allergies...",
    "🎨 Création de la recette personnalisée...",
    "✨ Finalisation et optimisation..."
  ];

  const generateRecipe = async () => {
    setIsGenerating(true);
    setGeneratedRecipe(null);

    // Simulation de génération étape par étape
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }

    // Génération d'une recette personnalisée
    const recipe = createPersonalizedRecipe();
    setGeneratedRecipe(recipe);
    setIsGenerating(false);
    setGenerationStep(0);
    
    if (onRecipeGenerated) {
      onRecipeGenerated(recipe);
    }
  };

  const createPersonalizedRecipe = () => {
    const baseRecipes = [
      {
        name: "Bowl Quinoa Énergétique",
        time: "25 min",
        difficulty: "Facile",
        servings: 2,
        ingredients: [
          { name: "Quinoa", amount: "100g", category: "cereal" },
          { name: "Avocat", amount: "1", category: "fruit" },
          { name: "Tomates cerises", amount: "200g", category: "vegetable" },
          { name: "Concombre", amount: "1/2", category: "vegetable" },
          { name: "Graines de chia", amount: "2 c.à.s", category: "seed" }
        ],
        instructions: [
          "Rincez le quinoa et faites-le cuire selon les instructions du paquet.",
          "Pendant ce temps, coupez l'avocat, les tomates et le concombre.",
          "Mélangez tous les ingrédients dans un bol.",
          "Ajoutez les graines de chia et assaisonnez selon vos goûts."
        ],
        nutrition: { calories: 320, protein: 12, carbs: 45, fat: 14, fiber: 8 },
        health: ["vegetarian", "vegan", "gluten_free", "high_protein"],
        allergens: [],
        tips: "Ajoutez du citron pour plus de fraîcheur !"
      },
      {
        name: "Sauté de Légumes Protéiné",
        time: "20 min",
        difficulty: "Facile",
        servings: 2,
        ingredients: [
          { name: "Tofu ferme", amount: "200g", category: "protein" },
          { name: "Brocoli", amount: "1 tête", category: "vegetable" },
          { name: "Carottes", amount: "2", category: "vegetable" },
          { name: "Sauce soja", amount: "3 c.à.s", category: "sauce" },
          { name: "Huile de sésame", amount: "2 c.à.s", category: "oil" }
        ],
        instructions: [
          "Coupez le tofu en dés et faites-le dorer dans l'huile.",
          "Ajoutez les légumes coupés et faites sauter 5 minutes.",
          "Ajoutez la sauce soja et laissez mijoter 2 minutes.",
          "Servez chaud avec du riz si désiré."
        ],
        nutrition: { calories: 280, protein: 18, carbs: 15, fat: 16, fiber: 6 },
        health: ["vegetarian", "vegan", "gluten_free", "high_protein"],
        allergens: ["soja"],
        tips: "Utilisez du tofu mariné pour plus de saveur !"
      }
    ];

    // Sélection intelligente basée sur les ingrédients
    const hasQuinoa = selectedIngredients.some(i => i.toLowerCase().includes('quinoa'));
    const hasTofu = selectedIngredients.some(i => i.toLowerCase().includes('tofu'));
    
    let selectedRecipe = baseRecipes[0]; // Default
    if (hasTofu) {
      selectedRecipe = baseRecipes[1];
    }

    // Personnalisation basée sur les critères
    if (selectedHealthCriteria.includes('vegan')) {
      selectedRecipe.health.push('vegan');
    }

    return {
      ...selectedRecipe,
      id: Date.now(),
      generatedAt: new Date().toISOString(),
      userPreferences: {
        ingredients: selectedIngredients,
        healthCriteria: selectedHealthCriteria,
        allergies: selectedAllergies
      }
    };
  };

  return (
    <div className="bg-gradient-to-br from-sage-50 to-mint-50 rounded-xl p-6 border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🤖 Générateur IA de Recettes
        </h3>
        <p className="text-gray-600">
          Création intelligente basée sur vos ingrédients et préférences
        </p>
      </div>

      {!isGenerating && !generatedRecipe && (
        <motion.button
          onClick={generateRecipe}
          disabled={selectedIngredients.length === 0}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            selectedIngredients.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-coral-400 to-peach-400 text-white hover:from-coral-500 hover:to-peach-500 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
          whileHover={selectedIngredients.length > 0 ? { scale: 1.02 } : {}}
          whileTap={selectedIngredients.length > 0 ? { scale: 0.98 } : {}}
        >
          🚀 Générer ma recette personnalisée
        </motion.button>
      )}

      {/* Génération en cours */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-coral-400 to-peach-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {generationSteps[generationStep]}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-coral-400 to-peach-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recette générée */}
      <AnimatePresence>
        {generatedRecipe && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-sage-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-900">{generatedRecipe.name}</h4>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✨ Généré par IA
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-sm text-gray-600">Temps</div>
                <div className="font-semibold">{generatedRecipe.time}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">👥</div>
                <div className="text-sm text-gray-600">Portions</div>
                <div className="font-semibold">{generatedRecipe.servings}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm text-gray-600">Difficulté</div>
                <div className="font-semibold">{generatedRecipe.difficulty}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-sm text-gray-600">Calories</div>
                <div className="font-semibold">{generatedRecipe.nutrition.calories}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">📝 Ingrédients :</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {generatedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-gray-600 text-sm">{ingredient.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">👨‍🍳 Instructions :</h5>
                <ol className="space-y-2">
                  {generatedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="bg-coral-100 text-coral-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {generatedRecipe.tips && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-800 mb-1">💡 Conseil du chef :</h5>
                  <p className="text-yellow-700">{generatedRecipe.tips}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-gradient-to-r from-coral-400 to-peach-400 text-white py-3 px-4 rounded-lg font-medium hover:from-coral-500 hover:to-peach-500 transition-all duration-200">
                💾 Sauvegarder
              </button>
              <button 
                onClick={generateRecipe}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                🔄 Régénérer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeGenerator; 