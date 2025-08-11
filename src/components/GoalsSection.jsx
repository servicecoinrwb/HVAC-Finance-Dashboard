import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit3, Target, Calendar, DollarSign, Plus, Minus, CheckCircle, TrendingUp, Clock, X } from 'lucide-react';

export const GoalsSection = ({ 
  goalsWithProgress = [], 
  openModal, 
  onDeleteGoal,
  onEditGoal
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    target: '',
    current: 0,
    deadline: '',
    type: 'savings'
  });

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
    if (progress >= 100) return 'from-green-500 to-emerald-500';
    if (progress >= 80) return 'from-green-500 to-green-600';
    if (progress >= 50) return 'from-yellow-500 to-orange-500';
    if (progress >= 25) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-600';
  };

  const getTimeRemaining = (deadline) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20' };
    if (diffDays === 0) return { text: 'Due Today', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/20' };
    if (diffDays === 1) return { text: '1 day left', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/20' };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (diffDays <= 30) return { text: `${diffDays} days left`, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
    return { text: `${diffDays} days left`, color: 'text-slate-600', bgColor: 'bg-slate-100 dark:bg-slate-700' };
  };

  const calculateDailyRequired = (goal) => {
    const remaining = goal.target - goal.current;
    const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? Math.ceil(remaining / daysLeft) : 0;
  };

  const updateGoalProgress = (goalId, newAmount) => {
    // This would need to be implemented in your main app
    console.log('Update goal progress:', goalId, newAmount);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (newGoal.name && newGoal.target && newGoal.deadline) {
      // Use the openModal function from props to create a new goal
      openModal('goal', {
        name: newGoal.name,
        description: newGoal.description,
        targetValue: Number(newGoal.target),
        current: Number(newGoal.current),
        deadline: newGoal.deadline,
        type: newGoal.type,
      });
      setNewGoal({ name: '', description: '', target: '', current: 0, deadline: '', type: 'savings' });
      setShowGoalModal(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* Header with Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg">
              <Target className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Financial Goals</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {goalsWithProgress.filter(g => g.progress >= 100).length} of {goalsWithProgress.length} completed
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowGoalModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>

        {/* Quick Stats Cards */}
        {goalsWithProgress.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                  <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300">Completed</p>
                  <p className="text-xl font-bold text-green-800 dark:text-green-200">
                    {goalsWithProgress.filter(g => g.progress >= 100).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                  <TrendingUp className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">In Progress</p>
                  <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                    {goalsWithProgress.filter(g => g.progress > 0 && g.progress < 100).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                  <Clock className="text-orange-600 dark:text-orange-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Total Value</p>
                  <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
                    ${goalsWithProgress.reduce((sum, goal) => sum + (goal.targetValue || 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goalsWithProgress.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="opacity-50" />
              </div>
              <h4 className="font-semibold text-lg mb-2">No financial goals yet</h4>
              <p className="text-sm mb-4">Set your first goal and start tracking your financial progress!</p>
              <button
                onClick={() => setShowGoalModal(true)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Create Your First Goal
              </button>
            </div>
          ) : (
            goalsWithProgress.map((goal) => {
              const progress = goal.progress || 0;
              const isCompleted = progress >= 100;
              const remaining = (goal.targetValue || 0) - (goal.current || 0);
              const timeRemaining = getTimeRemaining(goal.deadline);
              const progressColor = getProgressColor(progress);
              const isOverdue = timeRemaining.text === 'Overdue';
              const dailyRequired = calculateDailyRequired({
                target: goal.targetValue || 0,
                current: goal.current || 0,
                deadline: goal.deadline
              });
              
              return (
                <div key={goal.id} className={`relative border rounded-lg p-5 transition-all duration-200 hover:shadow-md ${
                  isCompleted 
                    ? 'border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10' 
                    : isOverdue
                    ? 'border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50/50 to-pink-50/50 dark:from-red-900/10 dark:to-pink-900/10'
                    : 'border-slate-200 dark:border-slate-600 hover:border-cyan-300 dark:hover:border-cyan-700'
                }`}>
                  
                  {showDeleteConfirm !== goal.id ? (
                    <>
                      {/* Goal Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-slate-800 dark:text-white">{goal.name}</h4>
                            {isCompleted && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                                ✓ Completed
                              </span>
                            )}
                            {goal.type && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                goal.type === 'savings' ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200' :
                                goal.type === 'debt' ? 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200' :
                                goal.type === 'investment' ? 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200' :
                                goal.type === 'purchase' ? 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200' :
                                'bg-cyan-100 dark:bg-cyan-800 text-cyan-800 dark:text-cyan-200'
                              }`}>
                                {goal.type || 'savings'}
                              </span>
                            )}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${timeRemaining.bgColor} ${timeRemaining.color}`}>
                              {timeRemaining.text}
                            </span>
                          </div>
                          {goal.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{goal.description}</p>
                          )}
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500 dark:text-slate-400">Current</p>
                              <p className="font-semibold text-slate-800 dark:text-white">${(goal.current || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 dark:text-slate-400">Target</p>
                              <p className="font-semibold text-slate-800 dark:text-white">${(goal.targetValue || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 dark:text-slate-400">Remaining</p>
                              <p className="font-semibold text-slate-800 dark:text-white">
                                ${remaining > 0 ? remaining.toLocaleString() : '0'}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500 dark:text-slate-400">Daily Need</p>
                              <p className="font-semibold text-slate-800 dark:text-white">
                                ${dailyRequired > 0 ? dailyRequired.toLocaleString() : '0'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => updateGoalProgress(goal.id, (goal.current || 0) + ((goal.targetValue || 0) * 0.1))}
                            className="text-green-600 hover:text-green-500 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                            title="Add 10%"
                          >
                            <Plus size={18} />
                          </button>
                          <button
                            onClick={() => updateGoalProgress(goal.id, Math.max(0, (goal.current || 0) - ((goal.targetValue || 0) * 0.1)))}
                            className="text-orange-600 hover:text-orange-500 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                            title="Subtract 10%"
                          >
                            <Minus size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(goal.id)}
                            className="text-red-600 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete Goal"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Progress</span>
                          <span className={`font-bold ${isCompleted ? 'text-green-600' : 'text-cyan-600'}`}>
                            {progress.toFixed(1)}%
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                            <div
                              className={`h-4 rounded-full transition-all duration-700 relative overflow-hidden bg-gradient-to-r ${progressColor}`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                          {progress > 15 && (
                            <div className="absolute inset-0 flex items-center px-2">
                              <span className="text-xs font-medium text-white drop-shadow">
                                ${(goal.current || 0).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                          {!isCompleted && remaining > 0 && dailyRequired > 0 && (
                            <span>Need ${dailyRequired.toLocaleString()}/day</span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Delete Confirmation Overlay */
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Trash2 className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                        <p className="text-slate-800 dark:text-white font-medium mb-4">
                          Delete "{goal.name}"?
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                          This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => confirmDelete(goal.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                          >
                            Delete Goal
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-4 py-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-800 dark:text-white rounded-lg transition-colors font-medium"
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

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg border border-slate-200 dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Create Financial Goal</h3>
              <button
                onClick={() => setShowGoalModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGoalSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Goal Type</label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({...newGoal, type: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="savings">💰 Savings Goal</option>
                  <option value="debt">💳 Debt Payoff</option>
                  <option value="investment">📈 Investment Target</option>
                  <option value="purchase">🛍️ Large Purchase</option>
                  <option value="emergency">🆘 Emergency Fund</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Emergency Fund, New Car, Pay off Credit Card"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your goal and why it matters to you"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Amount</label>
                  <input
                    type="number"
                    value={newGoal.current}
                    onChange={(e) => setNewGoal({...newGoal, current: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Amount</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10000"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Goal Calculation Helper */}
              {newGoal.target > 0 && newGoal.deadline && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">Goal Calculation:</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    To reach ${newGoal.target.toLocaleString()} by {new Date(newGoal.deadline).toLocaleDateString()}, 
                    you need to save ${Math.ceil((newGoal.target - newGoal.current) / Math.max(1, Math.ceil((new Date(newGoal.deadline) - new Date()) / (1000 * 60 * 60 * 24)))).toLocaleString()} per day.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};