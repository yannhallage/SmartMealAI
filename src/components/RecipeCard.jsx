import React from "react";

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

const RecipeCard = ({ recipe, index, onVoirRecette }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
      {recipe.imageUrl && (
        <img 
          src={recipe.imageUrl} 
          alt={recipe.titre} 
          className="w-full h-48 object-cover rounded-md mb-4" 
        />
      )}
      <div className="space-y-3">
        <h3 className="font-semibold text-black text-lg">{recipe.titre}</h3>
        <p className="text-gray-600 text-sm">{recipe.description}</p>
        <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
          {recipe.origine}
        </span>
        <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
          ⏱️ {recipe.tempsPreparation} min
        </span>
        {/* Critères de santé */}
        {recipe.criteresSante && recipe.criteresSante.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.criteresSante.map((critere) => (
              <span key={critere} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {critere}
              </span>
            ))}
          </div>
        )}
        {/* Allergènes */}
        {recipe.allergenes && recipe.allergenes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.allergenes.map((allergen) => (
              <span key={allergen} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                ⚠️ {allergen}
              </span>
            ))}
          </div>
        )}
        {/* Ingrédients principaux */}
        {recipe.ingredientsPrincipaux && recipe.ingredientsPrincipaux.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.ingredientsPrincipaux.map((ingredient, idx) => (
              <span key={idx} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                {ingredient}
              </span>
            ))}
          </div>
        )}
        {/* Nutrition */}
        {recipe.nutritionParPortion && (
          <div className="bg-gray-50 rounded-md p-2">
            <div className="text-xs text-gray-600 mb-1">Nutrition (par portion)</div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <div className="font-medium">{recipe.nutritionParPortion.kcal}</div>
                <div className="text-gray-500">kcal</div>
              </div>
              <div>
                <div className="font-medium">{recipe.nutritionParPortion.proteines}g</div>
                <div className="text-gray-500">Protéines</div>
              </div>
              <div>
                <div className="font-medium">{recipe.nutritionParPortion.glucides}g</div>
                <div className="text-gray-500">Glucides</div>
              </div>
              <div>
                <div className="font-medium">{recipe.nutritionParPortion.lipides}g</div>
                <div className="text-gray-500">Lipides</div>
              </div>
            </div>
          </div>
        )}
        <button 
          onClick={onVoirRecette}
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Voir la recette
        </button>
      </div>
    </div>
  );
};

export default RecipeCard; 