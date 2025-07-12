import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";

const features = [
  {
    icon: "🤖",
    title: "Suggestions IA instantanées",
    desc: "Des idées de repas personnalisées selon tes ingrédients, générées par une IA culinaire avancée.",
    color: "from-orange-200 via-orange-100 to-amber-100",
  },
  {
    icon: "🥕",
    title: "Anti-gaspi malin",
    desc: "Valorise tes restes et réduis le gaspillage alimentaire en cuisinant intelligemment.",
    color: "from-lime-100 via-amber-100 to-orange-100",
  },
  {
    icon: "🍽️",
    title: "Recettes créatives",
    desc: "Découvre des plats originaux, équilibrés et savoureux, même avec peu d’ingrédients.",
    color: "from-orange-100 via-lime-100 to-amber-100",
  },
  {
    icon: "⚡",
    title: "Ultra rapide & intuitif",
    desc: "Une expérience fluide, moderne et agréable, pensée pour tous les gourmets connectés.",
    color: "from-amber-100 via-orange-100 to-lime-100",
  },
];

const steps = [
  {
    icon: "🧺",
    title: "Je choisis mes ingrédients",
    desc: "Sélectionne ce que tu as dans ton frigo ou placard.",
  },
  {
    icon: "🤖",
    title: "L’IA imagine des recettes",
    desc: "Notre moteur intelligent propose des plats adaptés.",
  },
  {
    icon: "🍽️",
    title: "Je cuisine et je me régale !",
    desc: "Suis la recette, déguste, partage et réduis le gaspillage.",
  },
];

const testimonials = [
  {
    name: "Emma",
    username: "@emma_cuisine",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "J'ai entré 'pâtes, courgette, feta' et j'ai eu une recette de one-pot crémeux incroyable ! Fini le gaspillage.",
  },
  {
    name: "Lucas",
    username: "@lucasfood",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "SmartMealAI m'a proposé une omelette aux restes de légumes, super rapide et délicieux. L'IA est bluffante !",
  },
  {
    name: "Sofia",
    username: "@sofiagourmande",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "J'adore l'interface, c'est simple et inspirant. Je découvre de nouvelles idées chaque semaine !",
  },
  {
    name: "Yann",
    username: "@yannchef",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "L'IA m'a aidé à cuisiner avec ce qu'il me restait. Résultat : un plat délicieux et zéro déchet !",
  },
];

const recipes = [
  {
    name: "Salade fraîcheur vitaminée",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    calories: 60,
    time: "5 min",
    portion: "3 pers.",
  },
  {
    name: "Noodles boeuf épicé",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    calories: 150,
    time: "18 min",
    portion: "2 pers.",
  },
  {
    name: "Wings BBQ maison",
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    calories: 120,
    time: "45 min",
    portion: "3 pers.",
  },
  {
    name: "Smoothie fruité santé",
    img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    calories: 110,
    time: "12 min",
    portion: "3 pers.",
  },
  {
    name: "Curry rouge poulet",
    img: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
    calories: 180,
    time: "30 min",
    portion: "2 pers.",
  },
];

function getRandomRecipe() {
  return recipes[Math.floor(Math.random() * recipes.length)];
}

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const platDuJour = getRandomRecipe();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-lime-50 flex flex-col relative overflow-hidden">
      {/* Image de fond décorative */}
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Fond gourmand" className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm pointer-events-none select-none" style={{zIndex:0}} />
      <div className="relative z-10">
        <Navbar />
        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center text-center py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200/40 via-white/10 to-lime-100/40 blur-2xl" />
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <motion.h1 initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-5xl md:text-6xl font-extrabold text-orange-900 mb-6 tracking-tight drop-shadow-lg">
              L’IA qui sublime tes restes
            </motion.h1>
            <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.7, delay:0.2}} className="text-xl md:text-2xl text-orange-700 max-w-xl mb-8">
              Saisis tes ingrédients, laisse l’IA t’inspirer et découvre des plats savoureux, anti-gaspi et créatifs.
            </motion.p>
            <motion.a
              href="#plat-du-jour"
              whileHover={{scale:1.05}}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition mb-2"
            >
              Découvrir le plat du jour
            </motion.a>
          </div>
        </section>

        {/* PLAT DU JOUR */}
        <section id="plat-du-jour" className="w-full flex flex-col items-center py-12 px-4">
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-100 p-8 flex flex-col md:flex-row items-center gap-8 max-w-3xl w-full">
            <img src={platDuJour.img} alt={platDuJour.name} className="w-40 h-40 rounded-full object-cover border-4 border-orange-200 shadow-lg" />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-orange-900 mb-2">{platDuJour.name}</h2>
              <div className="flex gap-4 justify-center md:justify-start mb-2">
                <span className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-sm font-semibold">{platDuJour.calories} kcal</span>
                <span className="bg-lime-100 text-lime-700 rounded-full px-3 py-1 text-sm font-semibold">{platDuJour.time}</span>
                <span className="bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-sm font-semibold">{platDuJour.portion}</span>
              </div>
              <p className="text-orange-700 mt-2">Une suggestion IA rien que pour toi aujourd’hui !</p>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="w-full max-w-6xl mx-auto py-16 px-4" id="features">
          <motion.h2 initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-4xl font-extrabold text-orange-900 mb-10 text-center font-serif">
            Pourquoi SmartMealAI ?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:40}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.6, delay:0.2 + i*0.1}}
                whileHover={{scale:1.05, boxShadow:"0 8px 32px 0 rgba(255, 140, 0, 0.15)"}}
                className={`rounded-2xl p-8 shadow-lg bg-gradient-to-br ${f.color} flex flex-col items-center text-center`}
              >
                <span className="text-4xl mb-4">{f.icon}</span>
                <h3 className="text-xl font-bold text-orange-900 mb-2">{f.title}</h3>
                <p className="text-orange-700">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIMELINE - COMMENT CA MARCHE */}
        <section className="w-full max-w-4xl mx-auto py-16 px-4">
          <motion.h2 initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-4xl font-extrabold text-orange-900 mb-10 text-center font-serif">
            Comment ça marche ?
          </motion.h2>
          <div className="relative flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:40}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.6, delay:0.2 + i*0.1}}
                className="flex items-center gap-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center text-3xl shadow-lg">
                  {step.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-900 mb-1">{step.title}</h4>
                  <p className="text-orange-700">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section className="w-full max-w-3xl mx-auto py-16 px-4">
          <motion.h2 initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-4xl font-extrabold text-orange-900 mb-10 text-center font-serif">
            Ils ont testé SmartMealAI
          </motion.h2>
          <div className="relative flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y:-30}}
                transition={{duration:0.5}}
                className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center max-w-xl mx-auto"
              >
                <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="w-20 h-20 rounded-full object-cover border-4 border-orange-200 mb-4 shadow" />
                <div className="text-lg font-bold text-orange-900 mb-1">{testimonials[testimonialIdx].name}</div>
                <div className="text-orange-500 text-sm mb-2">{testimonials[testimonialIdx].username}</div>
                <p className="text-orange-700 mb-4">{testimonials[testimonialIdx].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-4 mt-6">
              <button onClick={()=>setTestimonialIdx((testimonialIdx-1+testimonials.length)%testimonials.length)} className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold text-xl flex items-center justify-center shadow hover:bg-orange-200 transition">‹</button>
              <button onClick={()=>setTestimonialIdx((testimonialIdx+1)%testimonials.length)} className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold text-xl flex items-center justify-center shadow hover:bg-orange-200 transition">›</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full py-8 bg-gradient-to-r from-orange-100 via-white to-lime-100 text-center text-orange-900 font-semibold mt-auto shadow-inner">
          <div>SmartMealAI © {new Date().getFullYear()} — Créé avec ❤️ pour la food et l’IA</div>
          <div className="text-sm text-orange-500 mt-2">UI inspirée par Cursor, ViteJS, shadcn/ui</div>
        </footer>
      </div>
    </div>
  );
} 