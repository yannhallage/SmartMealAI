import React from "react";

const categories = [
  { key: "europe", label: "Européen", emoji: "🥖", desc: "Cuisine française, italienne, espagnole..." },
  { key: "africa", label: "Africain", emoji: "🍲", desc: "Saveurs du Maghreb, Afrique de l'Ouest..." },
  { key: "asia", label: "Asiatique", emoji: "🍜", desc: "Cuisine chinoise, japonaise, thaïlandaise..." },
  { key: "orient", label: "Oriental", emoji: "🥙", desc: "Moyen-Orient, Liban, Turquie..." },
  { key: "americas", label: "Amériques", emoji: "🌮", desc: "Mexique, États-Unis, Amérique du Sud..." },
  { key: "world", label: "Fusion", emoji: "🌍", desc: "Mélanges culinaires du monde entier..." },
];

const CuisineStyleSelector = ({ selectedCat, setSelectedCat }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Choisissez votre style culinaire :</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCat(cat.key)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedCat === cat.key 
                ? 'border-black bg-black text-white' 
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:scale-105'
            }`}
          >
            <div className="text-2xl mb-2">{cat.emoji}</div>
            <h4 className="font-semibold mb-1">{cat.label}</h4>
            <p className="text-sm opacity-80">{cat.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CuisineStyleSelector; 