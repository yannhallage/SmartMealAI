import React from "react";

const commonIngredients = [
  "Poulet", "Riz", "Tomates", "Oignons", "Ail", "Carottes", "Pommes de terre", 
  "Pâtes", "Poivrons", "Courgettes", "Aubergines", "Champignons", "Épinards",
  "Fromage", "Œufs", "Pain", "Lait", "Crème", "Beurre", "Huile d'olive"
];

const IngredientSelector = ({ 
  selectedIngredients, 
  setSelectedIngredients, 
  customIngredient, 
  setCustomIngredient,
  handleAddCustomIngredient 
}) => {
  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients(prev => {
      const isCurrentlySelected = prev.includes(ingredient);
      const newSelection = isCurrentlySelected 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient];
      
      // Afficher en console le changement
      if (isCurrentlySelected) {
        console.log(`❌ Ingrédient retiré: "${ingredient}"`);
      } else {
        console.log(`✅ Ingrédient ajouté: "${ingredient}"`);
      }
      console.log(`📋 Liste actuelle des ingrédients:`, newSelection);
      
      return newSelection;
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Sélectionnez vos ingrédients :</h3>
      
      {/* Ingrédients sélectionnés */}
      {selectedIngredients.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Ingrédients sélectionnés :</h4>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {ingredient}
                <button
                  onClick={() => handleIngredientToggle(ingredient)}
                  className="hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ingrédients communs */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Ingrédients courants :</h4>
        <div className="flex flex-wrap gap-2">
          {commonIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => handleIngredientToggle(ingredient)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedIngredients.includes(ingredient)
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>

      {/* Ajout d'ingrédient personnalisé */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ajouter un ingrédient..."
          value={customIngredient}
          onChange={(e) => setCustomIngredient(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCustomIngredient()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAddCustomIngredient}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default IngredientSelector; 