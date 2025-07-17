import React from 'react';
import { ManagementSection } from './ManagementSection';

export const DebtManagement = ({ debts, openModal, handleDelete, searchTerm, setSearchTerm, handleImportCSV, handleExportCSV, debtPayoffStrategies }) => {
    const debtColumns = [
        { key: 'name', header: 'Name', render: item => <span className="font-medium">{item.name}</span> },
        { key: 'interestRate', header: 'Interest Rate', className: 'text-center', render: item => <span className="font-mono">{item.interestRate || 0}%</span> },
        { key: 'total', header: 'Total Amount', className: 'text-right', render: item => <span className="font-mono">${(item.totalAmount || 0).toFixed(2)}</span> },
        { key: 'paid', header: 'Paid Amount', className: 'text-right', render: item => <span className="font-mono">${(item.paidAmount || 0).toFixed(2)}</span> },
        { key: 'remaining', header: 'Remaining', className: 'text-right font-bold', render: item => <span className="font-mono text-orange-600 dark:text-orange-400">${((item.totalAmount || 0) - (item.paidAmount || 0)).toFixed(2)}</span> },
        { key: 'progress', header: 'Progress', render: item => {
            const progress = item.totalAmount > 0 ? ((item.paidAmount / item.totalAmount) * 100) : 0;
            return (
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            );
        }},
    ];

    return (
        <ManagementSection
            title="Debt Management"
            data={debts}
            columns={debtColumns}
            type="debt"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleImportCSV={handleImportCSV}
            handleExportCSV={handleExportCSV}
            openModal={openModal}
            handleDelete={handleDelete}
            debtPayoffStrategies={debtPayoffStrategies}
        />
    );
};
