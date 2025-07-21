import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit3, Target, Calendar, DollarSign } from 'lucide-react';

export const GoalsSection = ({ goalsWithProgress, openModal, onDeleteGoal, onEditGoal }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleDeleteClick = (goalId) => {
        setShowDeleteConfirm(goalId);
    };

    const confirmDelete = (goalId) => {
        onDeleteGoal(goalId);
        setShowDeleteConfirm(null);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(null);
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 50) return 'bg-yellow-500';
        if (progress >= 25) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const getTimeRemaining = (deadline) => {
        const today = new Date();
        const targetDate = new Date(deadline);
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return { text: 'Overdue', color: 'text-red-500' };
        if (diffDays === 0) return { text: 'Due Today', color: 'text-orange-500' };
        if (diffDays === 1) return { text: '1 day left', color: 'text-orange-500' };
        if (diffDays <= 7) return { text: `${diffDays} days left`, color: 'text-yellow-600' };
        if (diffDays <= 30) return { text: `${diffDays} days left`, color: 'text-blue-600' };
        return { text: `${diffDays} days left`, color: 'text-slate-600' };
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Financial Goals</h3>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm px-2 py-1 rounded-full">
                        {goalsWithProgress.length}
                    </span>
                </div>
                <button 
                    onClick={() => openModal('goal')} 
                    className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                >
                    <PlusCircle size={16} /> 
                    Add Goal
                </button>
            </div>

            {/* Goals List */}
            <div className="space-y-4">
                {goalsWithProgress.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-lg font-medium">No goals set yet</p>
                        <p className="text-sm">Create your first financial goal to get started!</p>
                    </div>
                ) : (
                    goalsWithProgress.map(goal => {
                        const timeRemaining = getTimeRemaining(goal.deadline);
                        const progressColor = getProgressColor(goal.progress);
                        const isOverdue = timeRemaining.text === 'Overdue';
                        
                        return (
                            <div key={goal.id} className={`relative p-4 rounded-lg border ${isOverdue ? 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50'} transition-all duration-200 hover:shadow-md`}>
                                {/* Goal Header */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{goal.name}</h4>
                                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                <span>Target: {goal.type === 'debt' ? 'Pay Off' : `$${goal.targetValue.toLocaleString()}`}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span className={timeRemaining.color}>{timeRemaining.text}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1 ml-4">
                                        <button
                                            onClick={() => onEditGoal && onEditGoal(goal)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                            title="Edit goal"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(goal.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                            title="Delete goal"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Progress
                                        </span>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {goal.progress.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                                        <div 
                                            className={`${progressColor} h-full rounded-full transition-all duration-500 ease-out`}
                                            style={{ width: `${Math.min(goal.progress, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Delete Confirmation */}
                                {showDeleteConfirm === goal.id && (
                                    <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg border-2 border-red-300 dark:border-red-700 flex items-center justify-center p-4">
                                        <div className="text-center">
                                            <p className="text-slate-800 dark:text-white font-medium mb-4">
                                                Delete "{goal.name}"?
                                            </p>
                                            <div className="flex gap-3 justify-center">
                                                <button
                                                    onClick={() => confirmDelete(goal.id)}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={cancelDelete}
                                                    className="px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};