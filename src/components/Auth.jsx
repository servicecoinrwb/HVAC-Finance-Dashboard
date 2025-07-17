// src/components/Auth.jsx

import React, { useState } from 'react';
// FIX: Removed getAuth as it's no longer needed in this file
import { signInWithEmailAndPassword } from "firebase/auth";

// FIX: The component now receives the `auth` object from Firebase as a prop
const Auth = ({ auth, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // FIX: Removed the line `const auth = getAuth();` which was causing the error.
  // The component now uses the `auth` instance passed down from App.jsx.

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setError(""); // Clear previous errors

    if (!email || !password) {
        setError("Please enter both email and password.");
        return;
    }

    try {
      // This `auth` object is now the one passed in via props
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener in App.jsx will handle setting the user ID
    } catch (err) {
      console.error("Login failed:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-1 text-center text-slate-800 dark:text-white">Welcome Back</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Please log in to continue</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            type="email"
            placeholder="Email" 
            className="block p-3 w-full border rounded-md bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
          />
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password" 
            className="block p-3 w-full border rounded-md bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none" 
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            type="submit"
            className="mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// You must export the component so other files can import it
export default Auth;
