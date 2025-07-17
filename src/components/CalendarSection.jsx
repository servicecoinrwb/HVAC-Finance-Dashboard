import Auth from './Auth.jsx'; // Corrected path// import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

const CalendarSection = ({ jobs, tasks, openModal }) => {
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
        jobs.forEach(job => {
            const jobDate = new Date(job.date).toISOString().split('T')[0];
            if (!map[jobDate]) {
                map[jobDate] = [];
            }
            map[jobDate].push({ ...job, type: 'job' });
        });
        tasks.forEach(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            if (!map[taskDate]) {
                map[taskDate] = [];
            }
            map[taskDate].push({ ...task, type: 'task' });
        });
        return map;
    }, [jobs, tasks]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronLeft /></button>
                <h2 className="text-xl font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronRight /></button>
            </div>
             <div className="flex justify-end gap-2 mb-4">
                <button onClick={() => openModal('task')} className="flex items-center gap-2 text-sm bg-amber-500 hover:bg-amber-400 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add Task</button>
                <button onClick={() => openModal('job')} className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"><PlusCircle size={16} /> Add Job</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {daysOfWeek.map(day => <div key={day} className="font-bold text-sm text-slate-500 dark:text-slate-400 py-2">{day}</div>)}
                {calendarDays.map((day, index) => (
                    <div key={index} className={`h-32 border border-slate-200 dark:border-slate-700 rounded-md p-1 overflow-y-auto ${day ? 'cursor-pointer' : 'bg-slate-50 dark:bg-slate-800/50'}`} onClick={() => day && openModal('task', { date: day.toISOString().split('T')[0] })}>
                        {day && <span className="text-xs font-semibold">{day.getDate()}</span>}
                        {day && eventsByDate[day.toISOString().split('T')[0]]?.map(event => (
                            <div key={event.id} onClick={(e) => { e.stopPropagation(); openModal(event.type, event); }} className={`text-xs rounded p-1 mt-1 hover:opacity-80 ${event.type === 'job' ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'}`}>
                                {event.name || event.title}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarSection;
