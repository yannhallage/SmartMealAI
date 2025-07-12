import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isAuth, onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();
  return (
    <nav className="w-full fixed top-0 left-0 z-20 bg-white/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold text-orange-400">🥗</span>
          <span className="text-xl font-bold text-orange-900 tracking-tight">SmartMealAI</span>
        </div>
        <div className="hidden md:flex gap-6">
          <Link to="#features" className="text-orange-900 hover:text-orange-500 transition font-medium">Fonctionnalités</Link>
          <Link to="#how" className="text-orange-900 hover:text-orange-500 transition font-medium">Comment ça marche ?</Link>
          <Link to="#faq" className="text-orange-900 hover:text-orange-500 transition font-medium">FAQ</Link>
          <Link to="#testimonials" className="text-orange-900 hover:text-orange-500 transition font-medium">Témoignages</Link>
          <a
            href="https://github.com/SmartMealAI"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 rounded-lg border border-orange-200 text-orange-900 hover:bg-orange-100 hover:text-orange-700 transition font-semibold"
          >
            GitHub
          </a>
          {isAuth ? (
            <button
              onClick={() => navigate("/")}
              className="px-4 py-1 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
            >
              Mon compte
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
            >
              Se connecter
            </button>
          )}
        </div>
        <div className="md:hidden">
          {/* Menu mobile à ajouter ici si besoin */}
        </div>
      </div>
    </nav>
  );
} 