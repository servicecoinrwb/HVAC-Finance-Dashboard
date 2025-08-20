// Add this entire block to the end of your firestore.jsx file

// --- Technician Functions ---
export const addTechnician = (db, userId, techData) => {
    return addDoc(getCollectionRef(db, userId, 'technicians'), { ...techData, createdAt: serverTimestamp() });
};

export const updateTechnician = (db, userId, techId, payload) => {
    const techRef = getDocRef(db, userId, 'technicians', techId);
    return updateDoc(techRef, { ...payload, updatedAt: serverTimestamp() });
};

export const deleteTechnician = async (db, userId, techId, workOrders) => {
    const techToDelete = (await getDoc(getDocRef(db, userId, 'technicians', techId))).data();
    if (!techToDelete) return;

    const batch = writeBatch(db);
    
    // Remove technician from any assigned work orders
    workOrders.forEach(wo => {
        if (wo.technician?.includes(techToDelete.name)) {
            const workOrderRef = getDocRef(db, userId, 'workOrders', wo.id);
            batch.update(workOrderRef, {
                technician: wo.technician.filter(t => t !== techToDelete.name)
            });
        }
    });

    // Delete the technician document
    const techRef = getDocRef(db, userId, 'technicians', techId);
    batch.delete(techRef);
    
    return batch.commit();
};


// --- Billing Functions ---
export const addQuote = (db, userId, quoteData) => {
    return addDoc(getCollectionRef(db, userId, 'quotes'), { ...quoteData, createdAt: serverTimestamp() });
};

export const updateInvoice = (db, userId, invoiceId, payload) => {
    const invoiceRef = getDocRef(db, userId, 'invoices', invoiceId);
    return updateDoc(invoiceRef, { ...payload, updatedAt: serverTimestamp() });
};

export const updateQuote = (db, userId, quoteId, payload) => {
    const quoteRef = getDocRef(db, userId, 'quotes', quoteId);
    return updateDoc(quoteRef, { ...payload, updatedAt: serverTimestamp() });
};