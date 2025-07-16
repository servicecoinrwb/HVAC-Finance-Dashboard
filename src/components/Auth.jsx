import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { DollarSign } from 'lucide-react';

const Auth = ({ setUserId }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            // The onAuthStateChanged listener in App.jsx will handle setting the user ID
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <DollarSign className="mx-auto h-12 w-auto text-cyan-500" />
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>
                <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        
                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:bg-slate-400"
                            >
                                {isLoading ? 'Processing...' : (isLogin ? 'Sign in' : 'Create account')}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-cyan-600 hover:text-cyan-500 ml-1">
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
