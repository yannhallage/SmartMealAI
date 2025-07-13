// src/api/auth.js

const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(formData) {
  // On retire confirmPassword du payload
  const { confirmPassword, name, email, password } = formData;
  // Adapter les champs pour le backend
  const payload = {
    nom_complet: name,
    email,
    motdepasse: password
  };
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur lors de la création du compte');
    return data;
  } catch (err) {
    console.error('[API] registerUser error:', err);
    throw err;
  }
} 