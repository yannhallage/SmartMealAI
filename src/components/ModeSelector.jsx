import React from "react";

const ModeSelector = ({ mode, setMode }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <button
        onClick={() => setMode("style")}
        className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
          mode === "style"
            ? "border-black bg-black text-white"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
        }`}
      >
        <div className="text-2xl mb-2">🌍</div>
        <h3 className="font-semibold mb-1">Par Style Culinaire</h3>
        <p className="text-sm opacity-80">Choisissez une cuisine du monde</p>
      </button>
      <button
        onClick={() => setMode("ingredients")}
        className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
          mode === "ingredients"
            ? "border-black bg-black text-white"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
        }`}
      >
        <div className="text-2xl mb-2">🥕</div>
        <h3 className="font-semibold mb-1">Par Ingrédients</h3>
        <p className="text-sm opacity-80">Utilisez ce que vous avez</p>
      </button>
    </div>
  );
};

export default ModeSelector; 