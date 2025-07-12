import React from "react";

const QuickActions = ({ onHistoryClick }) => {
  return (
    <div className="mt-12 bg-gray-50 rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-black mb-4">Actions rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-gray-300 transition-all duration-200 transform hover:scale-105">
          <div className="text-2xl mb-2">🤖</div>
          <h3 className="font-medium text-black mb-1">Générer une recette</h3>
          <p className="text-gray-600 text-sm">IA personnalisée selon vos critères</p>
        </button>
        <button 
          onClick={onHistoryClick}
          className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-gray-300 transition-all duration-200 transform hover:scale-105"
        >
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-medium text-black mb-1">Historique</h3>
          <p className="text-gray-600 text-sm">Vos recettes générées</p>
        </button>
        <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-gray-300 transition-all duration-200 transform hover:scale-105">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-medium text-black mb-1">Statistiques</h3>
          <p className="text-gray-600 text-sm">Votre activité culinaire</p>
        </button>
      </div>
    </div>
  );
};

export default QuickActions; 