import React, { useState } from "react";
import RecipeModal from "./RecipeModal";

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

const RecipeCard = ({ recipe, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <img 
        src={recipe.img} 
        alt={recipe.name} 
        className="w-full h-48 object-cover rounded-md mb-4" 
      />
      <div className="space-y-3">
        <h3 className="font-semibold text-black text-lg">{recipe.name}</h3>
        <p className="text-gray-600 text-sm">{recipe.desc}</p>
        
        {/* Critères de santé */}
        {recipe.health && recipe.health.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.health.map((health) => {
              const healthInfo = healthCriteria.find(h => h.key === health);
              return healthInfo ? (
                <span key={health} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  {healthInfo.emoji} {healthInfo.label}
                </span>
              ) : null;
            })}
          </div>
        )}

        {/* Allergènes */}
        {recipe.allergens && recipe.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.allergens.map((allergen) => (
              <span key={allergen} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                ⚠️ {allergen}
              </span>
            ))}
          </div>
        )}

        {/* Nutrition */}
        {recipe.nutrition && (
          <div className="bg-gray-50 rounded-md p-2">
            <div className="text-xs text-gray-600 mb-1">Nutrition (par portion)</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="font-medium">{recipe.nutrition.calories}</div>
                <div className="text-gray-500">kcal</div>
              </div>
              <div>
                <div className="font-medium">{recipe.nutrition.protein}g</div>
                <div className="text-gray-500">Protéines</div>
              </div>
              <div>
                <div className="font-medium">{recipe.nutrition.carbs}g</div>
                <div className="text-gray-500">Glucides</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
            {recipe.time}
          </span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Voir la recette
          </button>
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={recipe}
      />
    </div>
  );
};

export default RecipeCard; 