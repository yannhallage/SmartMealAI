import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-basil-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-peach-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-coral-400 via-peach-400 to-honey-400 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-basil-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🤖</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-coral-600 to-peach-600 bg-clip-text text-transparent">
                  SmartMealAI
                </span>
                <span className="text-xs text-gray-500 -mt-1">Cuisine intelligente</span>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-sage-600 transition-colors font-medium">
                Accueil
              </a>
              <a href="#about" className="text-gray-700 hover:text-sage-600 transition-colors font-medium">
                À propos
              </a>
              <Link 
                to="/login"
                className="bg-gradient-to-r from-sage-400 to-mint-400 text-black px-6 py-2 rounded-lg font-medium hover:from-sage-500 hover:to-mint-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Se connecter
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-700 hover:text-sage-600 hover:bg-sage-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transforme tes restes en{" "}
                <span className="bg-gradient-to-r from-coral-600 via-peach-600 to-honey-600 bg-clip-text text-transparent">
                  recettes de chef
                </span>{" "}
                🍽️
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                SmartMealAI analyse tes ingrédients disponibles et génère des recettes 
                créatives et délicieuses. Plus de gaspillage, plus d'inspiration culinaire !
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-sage-400 to-mint-400 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-sage-500 hover:to-mint-500 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                  style={{ textAlign: 'center' }}
                >
                  🚀 Commencer gratuitement
                </Link>
                <motion.button 
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-sage-200 text-sage-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage-50 transition-all duration-200"
                >
                  ✨ Découvrir les fonctionnalités
                </motion.button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                  <span>IA avancée</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                  <span>Recettes personnalisées</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lavender-400 rounded-full"></div>
                  <span>Anti-gaspi</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=500&fit=crop" 
                  alt="Cuisine moderne avec IA" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-coral-200 to-peach-200 rounded-2xl opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités intelligentes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre IA analyse vos ingrédients et propose des recettes adaptées à vos goûts et contraintes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "Analyse IA",
                description: "Notre intelligence artificielle analyse vos ingrédients et comprend vos préférences culinaires"
              },
              {
                icon: "⚡",
                title: "Suggestions instantanées",
                description: "Obtenez des idées de recettes en quelques secondes, adaptées à vos ingrédients disponibles"
              },
              {
                icon: "🎯",
                title: "Recettes personnalisées",
                description: "Des recettes uniques créées spécialement pour vous, selon vos goûts et votre niveau"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-sage-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              SmartMealAI en chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont transformé leur façon de cuisiner
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50k+", label: "Utilisateurs actifs", icon: "👥" },
              { number: "100k+", label: "Recettes générées", icon: "🍽️" },
              { number: "95%", label: "Satisfaction client", icon: "⭐" },
              { number: "30%", label: "Réduction gaspillage", icon: "♻️" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-sage-600 to-mint-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sage-50 to-mint-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Prêt à révolutionner votre cuisine ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez SmartMealAI et découvrez comment l'IA peut transformer vos ingrédients 
              en délicieuses recettes. C'est gratuit et ça ne prend que 30 secondes !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={() => setIsLoggedIn(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-sage-400 to-mint-400 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-sage-500 hover:to-mint-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                🎯 Créer mon compte gratuit
              </motion.button>
              <motion.button 
                onClick={() => setIsLoggedIn(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-sage-200 text-sage-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage-50 transition-all duration-200"
              >
                🔑 Se connecter
              </motion.button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Aucune carte de crédit requise • Essai gratuit illimité
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pourquoi SmartMealAI ?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-coral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-coral-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Réduire le gaspillage alimentaire</h3>
                    <p className="text-gray-600">Transformez vos restes et ingrédients oubliés en délicieux repas. Économisez de l'argent et préservez l'environnement.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-peach-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-peach-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Gagner du temps en cuisine</h3>
                    <p className="text-gray-600">Plus besoin de réfléchir à quoi cuisiner, l'IA s'en charge. Des suggestions instantanées adaptées à vos goûts.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-basil-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-basil-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Découvrir de nouvelles saveurs</h3>
                    <p className="text-gray-600">L'IA vous propose des combinaisons créatives et originales que vous n'auriez jamais imaginées.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-honey-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cuisine saine et équilibrée</h3>
                    <p className="text-gray-600">Des recettes nutritionnellement équilibrées qui respectent vos objectifs santé et vos préférences alimentaires.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-sage-100 to-mint-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technologie avancée</h3>
                <p className="text-gray-700 mb-6">
                  Notre IA utilise des algorithmes de machine learning pour analyser des milliers de recettes 
                  et comprendre les meilleures combinaisons d'ingrédients.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sage-600">10k+</div>
                    <div className="text-sm text-gray-600">Recettes analysées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-mint-600">95%</div>
                    <div className="text-sm text-gray-600">Satisfaction client</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils adorent SmartMealAI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que nos utilisateurs disent de leur expérience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie L.",
                role: "Chef à domicile",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                text: "SmartMealAI m'a fait redécouvrir la cuisine ! J'utilise maintenant tous mes ingrédients et je ne gaspille plus rien.",
                rating: 5
              },
              {
                name: "Thomas B.",
                role: "Étudiant",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                text: "Parfait pour un étudiant comme moi ! L'IA me propose des recettes rapides et économiques avec ce que j'ai.",
                rating: 5
              },
              {
                name: "Sophie M.",
                role: "Maman de 3 enfants",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                text: "Mes enfants adorent les nouvelles recettes ! L'IA propose des plats équilibrés et savoureux que toute la famille apprécie.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur SmartMealAI
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Comment fonctionne SmartMealAI ?",
                answer: "Vous entrez simplement vos ingrédients disponibles, et notre IA analyse vos préférences pour vous proposer des recettes personnalisées et créatives."
              },
              {
                question: "SmartMealAI est-il vraiment gratuit ?",
                answer: "Oui ! L'inscription et l'utilisation de base sont entièrement gratuites. Aucune carte de crédit n'est requise pour commencer."
              },
              {
                question: "L'IA peut-elle s'adapter à mes allergies ?",
                answer: "Absolument ! Vous pouvez spécifier vos allergies et restrictions alimentaires dans votre profil pour des suggestions 100% adaptées."
              },
              {
                question: "Combien de recettes puis-je générer ?",
                answer: "Avec le plan gratuit, vous pouvez générer jusqu'à 50 recettes par mois. Les utilisateurs premium ont un accès illimité."
              },
              {
                question: "Mes données sont-elles sécurisées ?",
                answer: "Nous prenons la sécurité très au sérieux. Vos données personnelles et préférences culinaires sont chiffrées et protégées."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-sage-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-coral-400 via-peach-400 to-honey-400 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">🍽️</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-basil-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">SmartMealAI</span>
                  <span className="text-xs text-gray-500 -mt-1">Cuisine intelligente</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transformez vos ingrédients en délicieuses recettes grâce à l'intelligence artificielle.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartMealAI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 