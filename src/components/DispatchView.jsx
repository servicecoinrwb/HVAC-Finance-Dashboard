import React, { useState } from 'react';

// --- Utility Functions (You may need to move these to a shared utils.js file later) ---
const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;
const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;
const excelDateToYYYYMMDD = (d) => { const date = excelToJSDate(d); return date ? date.toISOString().split('T')[0] : ''; };
const yyyymmddToExcel = (s) => s ? jsDateToExcel(new Date(s + 'T00:00:00')) : null;
const getPriorityStyles = (p) => ({'emergency':'bg-red-100 text-red-800 border-red-500','urgent':'bg-orange-100 text-orange-800 border-orange-500','regular':'bg-blue-100 text-blue-800 border-blue-500','low':'bg-gray-100 text-gray-800 border-gray-500',}[p?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-500');
const getTechStatusStyles = (s) => ({'available': 'bg-green-100 text-green-800', 'on site': 'bg-blue-100 text-blue-800', 'en route': 'bg-yellow-100 text-yellow-800', 'on break': 'bg-gray-100 text-gray-800', 'on call': 'bg-teal-100 text-teal-800', 'day off': 'bg-slate-200 text-slate-800'}[s?.toLowerCase()] || 'bg-gray-100 text-gray-800');


export const DispatchView = ({ workOrders, technicians, onSelectOrder, onUpdateOrder }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const hours = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM
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
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Dispatch Board</h2>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex gap-4">
                <div className="w-1/4 bg-white p-4 rounded-lg shadow-sm" onDrop={handleUnassignDrop} onDragOver={handleDragOver}>
                    <h3 className="text-lg font-bold mb-4">Unassigned Jobs</h3>
                    <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                        {unscheduledOrders.map(order => (
                            <div key={order.id} draggable onDragStart={(e) => handleDragStart(e, order)} className={`p-2 border-l-4 rounded cursor-grab ${getPriorityStyles(order.Priority)}`}>
                                <p className="font-bold text-sm">{order.Company}</p>
                                <p className="text-xs text-gray-600">{order.Task}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/4 bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
                    <div className="grid gap-px bg-gray-200 min-w-max" style={{gridTemplateColumns: `60px repeat(${activeTechnicians.length}, minmax(200px, 1fr))`, gridTemplateRows: `auto repeat(${hours.length * 4}, 20px)`}}>
                        <div className="bg-gray-100 sticky top-0 z-10"></div>
                        {activeTechnicians.map(tech => (<div key={tech.id} className="bg-gray-100 text-center font-bold p-2 sticky top-0 z-10 flex flex-col"><span>{tech.name}</span><span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${getTechStatusStyles(tech.status)}`}>{tech.status}</span></div>))}
                        {hours.map(hour => (<React.Fragment key={hour}><div className="row-start-auto bg-gray-50 text-right pr-2 text-xs text-gray-500 -translate-y-2 sticky left-0 z-10" style={{ gridRow: (hour - 7) * 4 + 2 }}>{hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}</div>
                            {activeTechnicians.map((tech, techIndex) => (
                                <React.Fragment key={tech.id}>
                                    {Array.from({length: 4}).map((_, i) => (
                                        <div 
                                            key={`${tech.id}-${hour}-${i}`}
                                            onDrop={(e) => handleDrop(e, tech.name, `${String(hour).padStart(2, '0')}:${String(i*15).padStart(2,'0')}`)} 
                                            onDragOver={handleDragOver} 
                                            className="border-t border-gray-200" 
                                            style={{ gridRow: (hour - 7) * 4 + i + 2, gridColumn: techIndex + 2 }}>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>))}
                        {scheduledOrders.flatMap(order => 
                            order.technician.map(techName => {
                                const gridColumn = getTechnicianColumn(techName);
                                const rowStart = timeToRow(order.startTime);
                                const rowEnd = timeToRow(order.endTime);
                                if (gridColumn < 0 || !rowStart || !rowEnd || rowEnd <= rowStart) return null;
                                return (<div key={`${order.id}-${techName}`} draggable onDragStart={(e) => handleDragStart(e, order)} className={`p-2 m-px rounded-lg text-xs cursor-grab overflow-hidden ${getPriorityStyles(order.Priority)}`} style={{gridColumn, gridRow: `${rowStart} / ${rowEnd}`}} onClick={() => onSelectOrder(order)}><p className="font-bold truncate">{order.Company}</p><p className="truncate">{order.Task}</p></div>);
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};