import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg m-4 relative border dark:border-slate-700">
            <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                <X size={24} />
            </button>
            <div className="p-6">{children}</div>
        </div>
    </div>
);
