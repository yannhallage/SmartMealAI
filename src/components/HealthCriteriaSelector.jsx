import React from "react";

const healthCriteria = [
  { key: "vegetarian", label: "Végétarien", emoji: "🥬", desc: "Sans viande ni poisson" },
  { key: "vegan", label: "Végan", emoji: "🌱", desc: "Sans produits animaux" },
  { key: "gluten_free", label: "Sans gluten", emoji: "🌾", desc: "Éviter le gluten" },
  { key: "lactose_free", label: "Sans lactose", emoji: "🥛", desc: "Éviter les produits laitiers" },
  { key: "low_carb", label: "Faible en glucides", emoji: "🍞", desc: "Régime pauvre en sucres" },
  { key: "low_fat", label: "Faible en matières grasses", emoji: "🥑", desc: "Régime pauvre en graisses" },
  { key: "high_protein", label: "Riche en protéines", emoji: "💪", desc: "Régime protéiné" },
  { key: "diabetic", label: "Diabétique", emoji: "🩸", desc: "Contrôle glycémique" },
  { key: "heart_healthy", label: "Bon pour le cœur", emoji: "❤️", desc: "Régime cardiovasculaire" },
  { key: "low_sodium", label: "Faible en sodium", emoji: "🧂", desc: "Régime pauvre en sel" },
];

const HealthCriteriaSelector = ({ selectedHealthCriteria, setSelectedHealthCriteria }) => {
  const handleHealthCriteriaToggle = (criteria) => {
    setSelectedHealthCriteria(prev => 
      prev.includes(criteria) 
        ? prev.filter(c => c !== criteria)
        : [...prev, criteria]
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Critères de santé :</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {healthCriteria.map((criteria) => (
          <button
            key={criteria.key}
            onClick={() => handleHealthCriteriaToggle(criteria.key)}
            className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedHealthCriteria.includes(criteria.key)
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="text-xl mb-1">{criteria.emoji}</div>
            <h4 className="font-medium mb-1">{criteria.label}</h4>
            <p className="text-xs opacity-80">{criteria.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthCriteriaSelector; 