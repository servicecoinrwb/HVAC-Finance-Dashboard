import { collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, getDoc, query, onSnapshot } from 'firebase/firestore';

// --- Helper Functions ---
const getCollectionRef = (db, userId, collectionName) => {
    return collection(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName);
};

const getDocRef = (db, userId, collectionName, docId) => {
    return doc(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName, docId);
};

// --- Generic Listener ---
export const getCollectionListener = (db, userId, collectionName, callback) => {
    const q = query(getCollectionRef(db, userId, collectionName));
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
    }, (err) => console.error(`Error fetching ${collectionName}:`, err));
};

// --- Work Order Functions ---
export const addWorkOrder = (db, userId, orderData) => {
    const newOrder = { ...orderData, createdAt: serverTimestamp() };
    return addDoc(getCollectionRef(db, userId, 'workOrders'), newOrder);
};

export const updateWorkOrder = (db, userId, orderId, payload) => {
    const workOrderRef = getDocRef(db, userId, 'workOrders', orderId);
    return updateDoc(workOrderRef, { ...payload, updatedAt: serverTimestamp() });
};

export const addNoteToWorkOrder = async (db, userId, orderId, noteText) => {
    const workOrderRef = getDocRef(db, userId, 'workOrders', orderId);
    const workOrderSnap = await getDoc(workOrderRef);
    if (workOrderSnap.exists()) {
        const newNote = { text: noteText.trim(), timestamp: new Date().toISOString() };
        const currentNotes = workOrderSnap.data().notes || [];
        return updateDoc(workOrderRef, {
            notes: [...currentNotes, newNote],
            updatedAt: serverTimestamp()
        });
    }
};

// --- Customer Functions ---
export const addCustomer = (db, userId, customerData) => {
    return addDoc(getCollectionRef(db, userId, 'customers'), { ...customerData, createdAt: serverTimestamp() });
};

export const updateCustomer = (db, userId, customerId, payload) => {
    const customerRef = getDocRef(db, userId, 'customers', customerId);
    return updateDoc(customerRef, { ...payload, updatedAt: serverTimestamp() });
};

export const deleteCustomer = (db, userId, customerId) => {
    const customerRef = getDocRef(db, userId, 'customers', customerId);
    return deleteDoc(customerRef);
};

// --- Technician Functions ---
export const addTechnician = (db, userId, techData) => {
    return addDoc(getCollectionRef(db, userId, 'technicians'), { ...techData, createdAt: serverTimestamp() });
};

export const updateTechnician = (db, userId, techId, payload) => {
    const techRef = getDocRef(db, userId, 'technicians', techId);
    return updateDoc(techRef, { ...payload, updatedAt: serverTimestamp() });
};

export const deleteTechnician = async (db, userId, techId, workOrders) => {
    const techDoc = await getDoc(getDocRef(db, userId, 'technicians', techId));
    if (!techDoc.exists()) return;
    const techToDelete = techDoc.data();

    const batch = writeBatch(db);
    (workOrders || []).forEach(wo => {
        if (wo.technician?.includes(techToDelete.name)) {
            const workOrderRef = getDocRef(db, userId, 'workOrders', wo.id);
            batch.update(workOrderRef, {
                technician: wo.technician.filter(t => t !== techToDelete.name)
            });
        }
    });

    const techRef = getDocRef(db, userId, 'technicians', techId);
    batch.delete(techRef);
    return batch.commit();
};

// --- Billing Functions ---
export const addInvoice = (db, userId, invoiceData) => {
    return addDoc(getCollectionRef(db, userId, 'invoices'), { ...invoiceData, createdAt: serverTimestamp() });
};

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

// --- NEW ADVANCED BILLING FUNCTIONS ---
export const updateInvoiceItems = (db, userId, invoiceId, items, discount, lateFee) => {
    const invoiceRef = getDocRef(db, userId, 'invoices', invoiceId);
    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const total = subtotal - (discount || 0) + (lateFee || 0);
    return updateDoc(invoiceRef, {
        lineItems: items,
        discount: discount || 0,
        lateFee: lateFee || 0,
        subtotal,
        total,
        updatedAt: serverTimestamp()
    });
};

export const generateInvoicePdf = (invoice) => {
    // In a real app, you'd use a library like jsPDF or a backend service.
    // This is a simplified simulation for demonstration.
    alert(`Generating PDF for Invoice #${invoice.id}...\n\n(This would open a new tab with the generated PDF)`);
    console.log("Simulating PDF Generation for:", invoice);
};

export const generateQuotePdf = (quote) => {
    alert(`Generating PDF for Quote #${quote.id}...\n\n(This would open a new tab with the generated PDF)`);
    console.log("Simulating PDF Generation for:", quote);
};
