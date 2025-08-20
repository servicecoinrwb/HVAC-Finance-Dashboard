import React from 'react';
import { Briefcase, User, Calendar as CalendarIcon } from 'lucide-react';
import { getPriorityStyles, getStatusStyles, excelDateToJSDateString, formatTime } from './utils/helpers';

const OrderCard = ({ order, onSelectOrder }) => (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4" style={{borderColor: getPriorityStyles(order.Priority).borderColor}}>
        <div className="p-5">
            <div className="flex justify-between items-start">
                <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${getPriorityStyles(order.Priority)}`}>{order.Priority}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusStyles(order['Order Status'])}`}>{order['Order Status']}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-3 flex items-center"><Briefcase size={12} className="mr-1.5"/> {order.Client}</p>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{order.Company} - #{order['Loc #']}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{order.Task}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center"><User className="w-4 h-4 mr-2 text-gray-400" /><span>{order.technician?.join(', ') || 'Unassigned'}</span></div>
                <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-400" /><span>Scheduled: {excelDateToJSDateString(order['Schedule Date']) || 'Not Set'} {order.startTime && `(${formatTime(order.startTime)})`}</span></div>
                {order.clientWO && <div className="flex items-center"><span className="font-bold mr-2">Client WO:</span><span>{order.clientWO}</span></div>}
            </div>
        </div>
        <div className="bg-gray-50 dark:bg-slate-600 px-5 py-3">
            <button onClick={() => onSelectOrder(order)} className="w-full text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">View Details</button>
        </div>
    </div>
);

export default OrderCard;