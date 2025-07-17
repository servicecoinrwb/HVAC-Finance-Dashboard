import React from 'react';
import { PlusCircle } from 'lucide-react';

export const GoalsSection = ({ goalsWithProgress, openModal }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Financial Goals</h3>
                <button onClick={() => openModal('goal')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add New Goal</button>
            </div>
            <div className="space-y-6">
                {goalsWithProgress.map(goal => (
                    <div key={goal.id}>
                        <div className="flex justify-between items-end mb-1">
                            <span className="font-semibold">{goal.name}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{goal.progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                            <div className="bg-green-500 h-4 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-end mt-1 text-xs text-slate-500 dark:text-slate-500">
                            <span>Target: {goal.type === 'debt' ? 'Pay Off' : `$${goal.targetValue.toLocaleString()}`}</span>
                            <span>Deadline: {goal.deadline}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
