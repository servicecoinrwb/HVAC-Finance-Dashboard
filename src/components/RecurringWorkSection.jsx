import React from 'react';
import { PlusCircle, Edit, Trash2, FileText } from 'lucide-react';

export const RecurringWorkSection = ({
  recurringWork,
  openModal,
  handleDelete,
  handleEnhancedExportCSV,
  searchTerm,
  setSearchTerm,
}) => {
  const filteredWork = recurringWork.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Recurring Work Management</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleEnhancedExportCSV(recurringWork, 'recurring_work', ['name', 'clientId', 'revenue', 'frequency', 'nextDueDate', 'notes'])}
            className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
          >
            <FileText size={16} />
            Export
          </button>
          <button
            onClick={() => openModal('recurring')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle size={18} />
            Add Recurring Work
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recurring work..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3">Work Name</th>
              <th className="p-3">Client ID</th>
              <th className="p-3 text-right">Revenue</th>
              <th className="p-3">Frequency</th>
              <th className="p-3">Next Due Date</th>
              <th className="p-3">Notes</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWork.map(item => (
              <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.clientId}</td>
                <td className="p-3 text-right font-mono">${(item.revenue || 0).toFixed(2)}</td>
                <td className="p-3">{item.frequency}</td>
                <td className="p-3">{item.nextDueDate}</td>
                <td className="p-3 text-sm text-slate-500">{item.notes}</td>
                <td className="p-3 text-center">
                  <button onClick={() => openModal('recurring', item)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 mr-2">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete('recurring', item.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};