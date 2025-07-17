import React, { useMemo } from 'react';
import { Bell, X } from 'lucide-react';

export const AlertsPanel = ({ bills, paidStatus, onClose }) => {
    const upcomingBills = useMemo(() => {
        const today = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(today.getDate() + 3);

        return bills.filter(bill => {
            if (paidStatus[bill.id]) return false;
            const dueDate = new Date(today.getFullYear(), today.getMonth(), bill.dueDay);
            return dueDate >= today && dueDate <= threeDaysFromNow;
        });
    }, [bills, paidStatus]);

    if (upcomingBills.length === 0) return null;

    return (
        <div className="bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <div className="flex items-center">
                <Bell size={20} className="mr-3" />
                <div>
                    <strong className="font-bold">Upcoming Bills!</strong>
                    <ul className="list-disc list-inside mt-1">
                        {upcomingBills.map(bill => (
                            <li key={bill.id}>{bill.name} is due on day {bill.dueDay}.</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <X size={18} />
            </button>
        </div>
    );
};
