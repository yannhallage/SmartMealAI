import React from "react";

const commonAllergies = [
  "Gluten", "Lactose", "Œufs", "Arachides", "Noix", "Poisson", "Crustacés", 
  "Soja", "Sésame", "Moutarde", "Céleri", "Sulfites", "Lupin", "Mollusques"
];

const AllergySelector = ({ 
  selectedAllergies, 
  setSelectedAllergies, 
  customAllergy, 
  setCustomAllergy,
  handleAddCustomAllergy 
}) => {
  const handleAllergyToggle = (allergy) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">⚠️ Allergies et restrictions :</h3>
      
      {/* Allergies sélectionnées */}
      {selectedAllergies.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-red-700 mb-2">Allergies sélectionnées :</h4>
          <div className="flex flex-wrap gap-2">
            {selectedAllergies.map((allergy, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-red-200"
              >
                ⚠️ {allergy}
                <button
                  onClick={() => handleAllergyToggle(allergy)}
                  className="hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Allergies communes */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Allergies courantes :</h4>
        <div className="flex flex-wrap gap-2">
          {commonAllergies.map((allergy) => (
            <button
              key={allergy}
              onClick={() => handleAllergyToggle(allergy)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedAllergies.includes(allergy)
                  ? 'bg-red-100 text-red-800 border-red-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
              }`}
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>

      {/* Ajout d'allergie personnalisée */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ajouter une allergie..."
          value={customAllergy}
          onChange={(e) => setCustomAllergy(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCustomAllergy()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <button
          onClick={handleAddCustomAllergy}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default AllergySelector; 