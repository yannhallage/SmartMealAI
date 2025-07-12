import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

const features = [
  {
    icon: "🍊",
    title: "Suggestions IA instantanées",
    desc: "Recevez des idées de repas adaptées à vos ingrédients, générées par une intelligence artificielle culinaire de pointe.",
    gradient: "from-orange-200 via-orange-100 to-amber-100",
  },
  {
    icon: "🥕",
    title: "Anti-gaspi & malin",
    desc: "Valorisez vos restes et réduisez le gaspillage alimentaire en cuisinant intelligemment.",
    gradient: "from-lime-100 via-amber-100 to-orange-100",
  },
  {
    icon: "🥗",
    title: "Interface ultra-intuitive",
    desc: "Une expérience fluide, rapide et agréable, pensée pour tous les gourmets connectés.",
    gradient: "from-amber-100 via-orange-100 to-lime-100",
  },
  {
    icon: "👨‍🍳",
    title: "Recettes créatives",
    desc: "Découvrez des plats originaux, équilibrés et savoureux, même avec peu d’ingrédients.",
    gradient: "from-orange-100 via-lime-100 to-amber-100",
  },
];

const steps = [
  {
    icon: "🧺",
    title: "Je choisis mes ingrédients",
    desc: "Sélectionnez ce que vous avez dans votre frigo ou vos placards.",
  },
  {
    icon: "🤖",
    title: "L’IA imagine des recettes",
    desc: "Notre moteur intelligent analyse et propose des plats adaptés.",
  },
  {
    icon: "🍽️",
    title: "Je cuisine et je me régale !",
    desc: "Suivez la recette, dégustez, partagez et réduisez le gaspillage.",
  },
];

const faqs = [
  {
    q: "SmartMealAI est-il gratuit ?",
    a: "Oui, l’application est 100% gratuite pour tous les utilisateurs.",
  },
  {
    q: "Dois-je créer un compte ?",
    a: "Non, aucune inscription n’est requise pour générer des suggestions de repas.",
  },
  {
    q: "Comment l’IA choisit-elle les recettes ?",
    a: "L’IA analyse vos ingrédients et propose des plats équilibrés, variés et anti-gaspi.",
  },
  {
    q: "Mes données sont-elles privées ?",
    a: "Oui, vos ingrédients ne sont jamais stockés ni partagés.",
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
  {
    name: "Lina",
    username: "@lina.saveurs",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Des recettes originales, rapides et anti-gaspi. Je recommande à tous les étudiants !",
  },
  {
    name: "Marc",
    username: "@marc_cuisine",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    text: "Interface moderne, recettes variées, et surtout : plus de gaspillage à la maison !",
  },
];

const recipes = [
  {
    name: "Fresh and Healthy Salad",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    calories: 60,
    time: "5 mins",
    portion: "3 persons",
  },
  {
    name: "Delicious Spicy Beef Noodles",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    calories: 150,
    time: "18 mins",
    portion: "2 persons",
  },
  {
    name: "Red Hot BBQ Chicken Wings",
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    calories: 120,
    time: "45 mins",
    portion: "3 persons",
  },
  {
    name: "Healthy Fruit Smoothie",
    img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    calories: 110,
    time: "12 mins",
    portion: "3 persons",
  },
  {
    name: "Red Curry Chicken",
    img: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
    calories: 180,
    time: "30 mins",
    portion: "2 persons",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const handleLoginClick = () => setShowRegister(true);
  const handleLogoutClick = () => setIsAuth(false);
  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setIsAuth(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-lime-50 flex flex-col">
      {/* Navbar sticky */}
      <Navbar
        isAuth={isAuth}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
      />
      {showRegister && (
        <Register onClose={handleRegisterClose} />
      )}

      {/* Hero section avec image de fond */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 pt-32 overflow-hidden">
        {/* Image de fond floutée */}
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
          alt="Cuisine fond"
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm pointer-events-none select-none"
          style={{zIndex: 0}}
        />
        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1 mb-6 rounded-full bg-gradient-to-r from-orange-300 to-lime-200 text-orange-900 text-sm font-semibold shadow-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-2"><circle cx="10" cy="10" r="10" fill="#fff" fillOpacity=".15"/><path d="M10 4l2.09 6.26H18l-5.18 3.76L14.18 18 10 14.24 5.82 18l1.36-3.98L2 10.26h5.91z" fill="#fff"/></svg>
            SmartMealAI 2025
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-orange-900 mb-6 tracking-tight drop-shadow-lg">
            L’IA qui sublime vos restes
          </h1>
          <p className="text-xl md:text-2xl text-orange-700 max-w-2xl mb-10">
            Saisissez vos ingrédients, laissez l’intelligence artificielle vous inspirer et découvrez des plats savoureux, anti-gaspi et créatifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
            >
              Commencer
            </a>
            <a
              href="https://github.com/SmartMealAI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl border border-orange-200 text-orange-900 font-bold text-lg shadow-lg hover:bg-orange-100 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Recettes inspirantes */}
      <section className="relative w-full max-w-6xl mx-auto py-16 px-4 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl font-extrabold text-orange-900 mb-4 tracking-tight text-center font-serif"
        >
          Des idées simples et gourmandes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg text-orange-700 mb-6 text-center max-w-2xl"
        >
          Découvrez des recettes générées par <span className="font-semibold text-orange-500">SmartMealAI</span> pour vous inspirer au quotidien.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-2 mb-10"
        >
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Samantha William" className="w-8 h-8 rounded-full border-2 border-orange-300" />
          <span className="text-orange-900 font-medium">par Samantha William</span>
        </motion.div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {recipes.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(255, 140, 0, 0.15)" }}
              className="bg-white/90 rounded-2xl shadow-lg flex flex-col items-center p-6 border border-orange-100 hover:shadow-xl transition"
            >
              <img src={r.img} alt={r.name} className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 mb-4 shadow" />
              <div className="text-lg font-bold text-orange-900 mb-1 text-center">{r.name}</div>
              <div className="text-orange-500 text-sm mb-2">{r.calories} calories</div>
              <div className="flex justify-center gap-4 text-xs text-orange-700">
                <span>Time <span className="font-semibold">{r.time}</span></span>
                <span>Portion <span className="font-semibold">{r.portion}</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-orange-900 mb-10 text-center">Fonctionnalités</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-1 shadow-xl group hover:scale-105 transition bg-gradient-to-br ${f.gradient}`}
            >
              <div className="bg-white/90 rounded-2xl p-6 h-full flex flex-col items-center gap-2 group-hover:bg-white/80 transition">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="text-lg font-bold text-orange-900 mb-1">{f.title}</h3>
                <p className="text-orange-700 text-sm text-center">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section id="how" className="w-full max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-orange-900 mb-10 text-center">Comment ça marche ?</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 flex-1 min-w-[200px]">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-300 via-lime-200 to-amber-200 text-3xl font-bold shadow-lg mb-2">
                {s.icon}
              </div>
              <div className="text-lg font-bold text-orange-900">{s.title}</div>
              <div className="text-orange-700 text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ section */}
      <section id="faq" className="w-full max-w-3xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-orange-900 mb-10 text-center">FAQ</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-orange-200 bg-white/80">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-orange-900 font-semibold focus:outline-none"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-orange-400">{openFaq === i ? "-" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-orange-700 text-sm animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-orange-900 mb-10 text-center">Ils ont testé SmartMealAI</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/90 border border-orange-200 rounded-2xl shadow-lg p-6 flex flex-col gap-4 hover:scale-[1.03] transition duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-orange-300 shadow" />
                <div>
                  <div className="text-orange-900 font-semibold leading-tight">{t.name}</div>
                  <div className="text-orange-500 text-sm">{t.username}</div>
                </div>
              </div>
              <p className="text-orange-700 text-base">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center gap-2 px-8 py-6 border-t border-orange-200 bg-orange-50/80 text-orange-700 text-xs mt-8">
        <div>
          <a
            href="https://github.com/SmartMealAI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-orange-500"
          >
            GitHub
          </a>
        </div>
        <div>Contact : contact@smartmealai.app</div>
        <div>
          <a href="#" className="hover:underline hover:text-orange-500">Mentions légales</a>
        </div>
      </footer>
    </div>
  );
} 