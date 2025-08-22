import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, PlusCircle, UserX } from 'lucide-react';
import { excelDateToYYYYMMDD } from '../utils/helpers'; // Assuming you have this helper

const CalendarSection = ({ workOrders, tasks, technicians, openModal }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const eventsByDate = useMemo(() => {
        const map = {};
        
        // Process Work Orders
        (workOrders || []).forEach(order => {
            if (order['Schedule Date']) {
                const jobDate = excelDateToYYYYMMDD(order['Schedule Date']);
                if (!map[jobDate]) map[jobDate] = [];
                map[jobDate].push({ ...order, type: 'job' });
            }
        });

        // Process Tasks
        (tasks || []).forEach(task => {
            if (task.date) {
                const taskDate = new Date(task.date).toISOString().split('T')[0];
                if (!map[taskDate]) map[taskDate] = [];
                map[taskDate].push({ ...task, type: 'task' });
            }
        });

        // Process Technician Time Off
        (technicians || []).forEach(tech => {
            if (tech.status === 'Day Off' && tech.dayOffDate) { // Assuming a 'dayOffDate' field exists
                 const offDate = new Date(tech.dayOffDate).toISOString().split('T')[0];
                 if (!map[offDate]) map[offDate] = [];
                 map[offDate].push({ id: `off-${tech.id}`, name: `${tech.name} - Day Off`, type: 'time-off' });
            }
        });

        return map;
    }, [workOrders, tasks, technicians]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // A simple loading/empty state check
    if (!workOrders || !tasks || !technicians) {
        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                Loading calendar events...
            </div>
        );
    }

    const getEventStyles = (type) => {
        switch(type) {
            case 'job': return 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200';
            case 'task': return 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200';
            case 'time-off': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronLeft /></button>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronRight /></button>
            </div>
            <div className="flex justify-end gap-2 mb-4">
                <button onClick={() => openModal('task')} className="flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-400 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add Task</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {daysOfWeek.map(day => <div key={day} className="font-bold text-sm text-slate-500 dark:text-slate-400 py-2">{day}</div>)}
                {calendarDays.map((day, index) => {
                    const dateString = day ? day.toISOString().split('T')[0] : '';
                    return (
                        <div key={index} className={`h-32 border border-slate-200 dark:border-slate-700 rounded-md p-1 overflow-y-auto ${day ? 'cursor-pointer' : 'bg-slate-50 dark:bg-slate-800/50'}`} onClick={() => day && openModal('task', { date: dateString })}>
                            {day && <span className="text-xs font-semibold text-gray-800 dark:text-white">{day.getDate()}</span>}
                            {(day && eventsByDate[dateString] || []).map(event => (
                                <div key={event.id} onClick={(e) => { e.stopPropagation(); if(event.type !== 'time-off') openModal(event.type, event); }} className={`text-xs rounded p-1 mt-1 hover:opacity-80 ${getEventStyles(event.type)}`}>
                                    {event.type === 'time-off' && <UserX size={12} className="inline mr-1"/>}
                                    {event.name || event.title || event.Company}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CalendarSection;
