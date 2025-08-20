import React, { useState } from 'react';
import { X, Wrench, Briefcase, Building, MapPin, AlertTriangle, MessageSquare } from 'lucide-react';
// CORRECT: Importing helpers instead of redefining them
import { excelDateToYYYYMMDD, jsDateToExcel, formatCurrency, getPriorityStyles, formatTimestamp } from '../utils/helpers';

const WorkOrderDetailModal = ({ order, onClose, onUpdate, onAddNote, technicians }) => {
    if (!order) return null;
    
    // State hooks remain here
    const [newStatus, setNewStatus] = useState(order['Order Status']);
    const [assignedTechnicians, setAssignedTechnicians] = useState(order.technician || []);
    const [scheduleDate, setScheduleDate] = useState(excelDateToYYYYMMDD(order['Schedule Date']));
    const [startTime, setStartTime] = useState(order.startTime || '');
    const [endTime, setEndTime] = useState(order.endTime || '');
    const [newNote, setNewNote] = useState('');
    const [clientWO, setClientWO] = useState(order.clientWO || '');
    
    // Handler functions remain here
    const handleTechChange = (techName) => {
        const newTechs = assignedTechnicians.includes(techName)
            ? assignedTechnicians.filter(t => t !== techName)
            : [...assignedTechnicians, techName];
        setAssignedTechnicians(newTechs);
    };

    const handleSaveChanges = () => {
        const payload = {};
        if (newStatus !== order['Order Status']) { 
            payload['Order Status'] = newStatus; 
            if (newStatus === 'Completed' && !order['Completed Date']) payload['Completed Date'] = jsDateToExcel(new Date()); 
        }
        if (JSON.stringify(assignedTechnicians) !== JSON.stringify(order.technician)) payload['technician'] = assignedTechnicians;
        const newScheduleDateExcel = yyyymmddToExcel(scheduleDate);
        if (newScheduleDateExcel !== order['Schedule Date'] || startTime !== order.startTime || endTime !== order.endTime) {
            payload['Schedule Date'] = newScheduleDateExcel;
            payload.startTime = startTime;
            payload.endTime = endTime;
            if (newStatus === 'Open' && scheduleDate) payload['Order Status'] = 'Scheduled';
        }
        if (clientWO !== order.clientWO) payload.clientWO = clientWO;
        if (Object.keys(payload).length > 0) onUpdate(order.id, payload);
    };

    const details = [ 
        { label: "Work Order #", value: order['WO#'], icon: <Wrench/> }, 
        { label: "Client WO#", value: order.clientWO, icon: <Briefcase />}, 
        { label: "Location", value: `${order.Company} (#${order['Loc #']})`, icon: <Building/> }, 
        { label: "Address", value: `${order.City}, ${order.State}`, icon: <MapPin/> }, 
        { label: "Priority", value: order.Priority, icon: <AlertTriangle/>, style: getPriorityStyles(order.Priority) + ' px-2 py-0.5 rounded-full text-xs font-semibold' }, 
        { label: "Task", value: order.Task }, 
        { label: "NTE Amount", value: formatCurrency(order.N