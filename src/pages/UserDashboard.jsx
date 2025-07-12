import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { key: "europe", label: "Européen", emoji: "🥖" },
  { key: "africa", label: "Africain", emoji: "🍲" },
  { key: "asia", label: "Asiatique", emoji: "🍜" },
  { key: "orient", label: "Oriental", emoji: "🥙" },
  { key: "americas", label: "Amériques", emoji: "🌮" },
  { key: "world", label: "World", emoji: "🌍" },
];

const allRecipes = [
  { name: "Pâtes Carbonara", category: "europe", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", desc: "Un classique italien crémeux.", time: "20 min" },
  { name: "Quiche Lorraine", category: "europe", img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", desc: "La France dans votre assiette.", time: "35 min" },
  { name: "Poulet Yassa", category: "africa", img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", desc: "Spécialité sénégalaise acidulée.", time: "50 min" },
  { name: "Mafé", category: "africa", img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80", desc: "Ragoût africain à la cacahuète.", time: "45 min" },
  { name: "Pad Thaï", category: "asia", img: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80", desc: "Nouilles sautées thaïlandaises.", time: "25 min" },
  { name: "Sushi Bowl", category: "asia", img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", desc: "Version déstructurée du sushi.", time: "15 min" },
  { name: "Tajine d’agneau", category: "orient", img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", desc: "Saveurs du Maghreb.", time: "1h30" },
  { name: "Falafel Bowl", category: "orient", img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80", desc: "Boulettes veggie et houmous.", time: "30 min" },
  { name: "Tacos Mexicains", category: "americas", img: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80", desc: "Street food mexicaine.", time: "20 min" },
  { name: "Burger Maison", category: "americas", img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", desc: "Le classique US revisité.", time: "25 min" },
  { name: "Poké Bowl", category: "world", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", desc: "Fusion healthy du monde.", time: "18 min" },
];

export default function UserDashboard() {
  const [selectedCat, setSelectedCat] = useState("world");
  const [search, setSearch] = useState("");

  const filtered = allRecipes.filter(
    r => (selectedCat === "world" || r.category === selectedCat) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-lime-50 flex flex-col relative overflow-hidden">
      {/* Image de fond décorative */}
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Fond gourmand" className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm pointer-events-none select-none" style={{zIndex:0}} />
      <div className="relative z-10">
        <Navbar />
        <section className="max-w-5xl mx-auto w-full py-12 px-4">
        {/* Animated header */}
        <motion.h1 initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-4 mt-8 text-center">
          Bienvenue sur ton espace gourmand 👋
        </motion.h1>
        <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.7, delay:0.2}} className="text-lg text-orange-700 mb-10 text-center">
          Explore des recettes du monde entier, choisis ta catégorie ou recherche un plat !
        </motion.p>
        {/* Animated catégories */}
        <motion.div initial="hidden" animate="visible" variants={{hidden:{opacity:0, y:30}, visible:{opacity:1, y:0, transition:{staggerChildren:0.08}}}} className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.key}
              onClick={()=>setSelectedCat(cat.key)}
              whileHover={{scale:1.08, boxShadow:"0 4px 24px 0 rgba(255, 140, 0, 0.12)"}}
              whileTap={{scale:0.97}}
              variants={{hidden:{opacity:0, y:30}, visible:{opacity:1, y:0}}}
              className={`px-5 py-3 rounded-full font-semibold flex items-center gap-2 shadow transition border-2 text-lg ${selectedCat===cat.key ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white border-orange-400 scale-105' : 'bg-white/80 text-orange-900 border-orange-100 hover:bg-orange-50'}`}
            >
              <span>{cat.emoji}</span> {cat.label}
            </motion.button>
          ))}
        </motion.div>
        {/* Animated search */}
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6, delay:0.3}} className="flex justify-center mb-10">
          <motion.input
            type="text"
            placeholder="Rechercher une recette, un ingrédient..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            whileFocus={{scale:1.03, boxShadow:"0 2px 16px 0 rgba(255, 140, 0, 0.10)"}}
            className="w-full max-w-md px-5 py-4 rounded-xl border-2 border-orange-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white/70 text-lg text-orange-900 shadow transition"
          />
        </motion.div>
        {/* Animated recettes */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filtered.length ? filtered.map((r,i) => (
              <motion.div
                key={r.name}
                initial={{opacity:0, y:30, scale:0.95}}
                animate={{opacity:1, y:0, scale:1}}
                exit={{opacity:0, y:-30, scale:0.95}}
                transition={{duration:0.5, delay:i*0.05}}
                whileHover={{scale:1.04, boxShadow:"0 8px 32px 0 rgba(255, 140, 0, 0.15)"}}
                className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-orange-100 hover:shadow-xl transition"
              >
                <img src={r.img} alt={r.name} className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 mb-4 shadow" />
                <div className="text-lg font-bold text-orange-900 mb-1 text-center">{r.name}</div>
                <div className="text-orange-500 text-sm mb-2 text-center">{r.desc}</div>
                <div className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">{r.time}</div>
                <motion.button whileHover={{scale:1.08}} whileTap={{scale:0.97}} className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold shadow hover:scale-105 transition">Voir la recette</motion.button>
              </motion.div>
            )) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="col-span-full text-orange-700 text-center py-12 text-xl font-semibold">
                Aucune recette trouvée pour cette recherche ou catégorie.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
      {/* Carte verte pour la suite : suggestions IA, favoris, etc. */}
    </div>
  );
} 