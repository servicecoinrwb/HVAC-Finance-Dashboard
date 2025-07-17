import React from 'react';

export const StatCard = ({ title, value, icon, color, subtext }) => (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
            <div className={`text-${color}-500 dark:text-${color}-400`}>{icon}</div>
        </div>
        <div>
            <p className="text-3xl font-bold text-slate-800 dark:text-white mt-2">{value}</p>
            {subtext && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{subtext}</p>}
        </div>
    </div>
);
