import React, { useState } from 'react';
import { excelDateToYYYYMMDD, yyyymmddToExcel, getPriorityStyles, getTechStatusStyles } from '../utils/helpers';

const DispatchView = ({ workOrders, technicians, onSelectOrder, onUpdateOrder }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const hours = Array.from({ length: 13 }, (_, i) => i + 7);
    const activeTechnicians = technicians.filter(t => t.name !== 'Unassigned');

    const getTechnicianColumn = (techName) => {
        const index = activeTechnicians.findIndex(t => t.name === techName);
        return index === -1 ? -1 : index + 2;
    };

    const timeToRow = (timeStr) => {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) return 0;
        return ((h - 7) * 4) + (m / 15) + 2;
    };

    const scheduledOrders = workOrders.filter(wo => excelDateToYYYYMMDD(wo['Schedule Date']) === selectedDate && wo.startTime && wo.endTime && wo.technician?.length > 0);
    const unscheduledOrders = workOrders.filter(wo => wo['Order Status'] === 'Open' || !wo.technician || wo.technician.length === 0).sort((a, b) => {
        const priorityOrder = { 'Emergency': 1, 'Urgent': 2, 'Regular': 3, 'Low': 4 };
        return (priorityOrder[a.Priority] || 5) - (priorityOrder[b.Priority] || 5);
    });

    const handleDragStart = (e, order) => {
        e.dataTransfer.setData("workOrder", JSON.stringify(order));
    };

    const handleDrop = (e, techName, time) => {
        e.preventDefault();
        const order = JSON.parse(e.dataTransfer.getData("workOrder"));
        const newStartTime = time;
        const newEndTime = `${String(parseInt(time.split(':')[0]) + 2).padStart(2, '0')}:${time.split(':')[1]}`;

        onUpdateOrder(order.id, {
            ...order,
            technician: [techName],
            'Schedule Date': yyyymmddToExcel(selectedDate),
            startTime: newStartTime,
            endTime: newEndTime,
            'Order Status': 'Scheduled',
        });
    };

    const handleUnassignDrop = (e) => {
        e.preventDefault();
        const order = JSON.parse(e.dataTransfer.getData("workOrder"));
        onUpdateOrder(order.id, {
            ...order,
            technician: [],
            'Schedule Date': null,
            startTime: null,
            endTime: null,
            'Order Status': 'Open',
        });
    };
    
    const handleDragOver = (e) => e.preventDefault();

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Dispatch Board</h3>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
            </div>
            <div className="flex gap-4">
                <div className="w-1/4 bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm" onDrop={handleUnassignDrop} onDragOver={handleDragOver}>
                    <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Unassigned Jobs</h4>
                    <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                        {unscheduledOrders.map(order => (
                            <div key={order.id} draggable onDragStart={(e) => handleDragStart(e, order)} className={`p-2 border-l-4 rounded cursor-grab ${getPriorityStyles(order.Priority)}`}>
                                <p className="font-bold text-sm">{order.Company}</p>
                                <p className="text-xs text-gray-600">{order.Task}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/4 bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm overflow-x-auto">
                    <div className="grid gap-px bg-gray-200 dark:bg-slate-600 min-w-max" style={{gridTemplateColumns: `60px repeat(${activeTechnicians.length}, minmax(200px, 1fr))`, gridTemplateRows: `auto repeat(${hours.length * 4}, 20px)`}}>
                        <div className="bg-gray-100 dark:bg-slate-600 sticky top-0 z-10"></div>
                        {activeTechnicians.map(tech => (
                            <div key={tech.id} className="bg-gray-100 dark:bg-slate-600 text-center font-bold p-2 sticky top-0 z-10 flex flex-col">
                                <span className="text-gray-800 dark:text-white">{tech.name}</span>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${getTechStatusStyles(tech.status)}`}>{tech.status}</span>
                            </div>
                        ))}
                        {hours.map(hour => (
                            <React.Fragment key={hour}>
                                <div className="row-start-auto bg-gray-50 dark:bg-slate-600 text-right pr-2 text-xs text-gray-500 dark:text-gray-400 -translate-y-2 sticky left-0 z-10" style={{ gridRow: (hour - 7) * 4 + 2 }}>{hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}</div>
                                {activeTechnicians.map((tech, techIndex) => (
                                    <React.Fragment key={tech.id}>
                                        {Array.from({length: 4}).map((_, i) => (
                                            <div 
                                                key={`${tech.id}-${hour}-${i}`}
                                                onDrop={(e) => handleDrop(e, tech.name, `${String(hour).padStart(2, '0')}:${String(i*15).padStart(2,'0')}`)} 
                                                onDragOver={handleDragOver} 
                                                className="border-t border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700" 
                                                style={{ gridRow: (hour - 7) * 4 + i + 2, gridColumn: techIndex + 2 }}>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                        {scheduledOrders.flatMap(order => 
                            order.technician.map(techName => {
                                const gridColumn = getTechnicianColumn(techName);
                                const rowStart = timeToRow(order.startTime);
                                const rowEnd = timeToRow(order.endTime);
                                if (gridColumn < 0 || !rowStart || !rowEnd || rowEnd <= rowStart) return null;
                                return (
                                    <div key={`${order.id}-${techName}`} draggable onDragStart={(e) => handleDragStart(e, order)} className={`p-2 m-px rounded-lg text-xs cursor-grab overflow-hidden ${getPriorityStyles(order.Priority)}`} style={{gridColumn, gridRow: `${rowStart} / ${rowEnd}`}} onClick={() => onSelectOrder(order)}>
                                        <p className="font-bold truncate">{order.Company}</p>
                                        <p className="truncate">{order.Task}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispatchView;