import React, { useState } from "react";

export default function Register({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Ici, tu pourras brancher l'API d'inscription plus tard
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-orange-400 hover:text-orange-600 text-2xl font-bold">×</button>
        <h2 className="text-2xl font-bold text-orange-900 mb-6 text-center">Créer un compte</h2>
        {submitted ? (
          <div className="text-center text-orange-700 font-semibold py-8">Inscription réussie ! 🎉</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              className="p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 text-white font-bold py-3 rounded-xl shadow hover:scale-105 transition"
            >
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 