import { collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, getDoc, query, onSnapshot } from 'firebase/firestore';

const getCollectionRef = (db, userId, collectionName) => {
    return collection(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName);
};

const getDocRef = (db, userId, collectionName, docId) => {
    return doc(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName, docId);
};

// Generic listener for any collection
export const getCollectionListener = (db, userId, collectionName, callback) => {
    const q = query(getCollectionRef(db, userId, collectionName));
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
    }, (err) => console.error(`Error fetching ${collectionName}:`, err));
};

// Work Order Functions
export const addWorkOrder = (db, userId, orderData) => {
    const newOrder = {
        ...orderData,
        createdAt: serverTimestamp()
    };
    return addDoc(getCollectionRef(db, userId, 'workOrders'), newOrder);
};

export const updateWorkOrder = (db, userId, orderId, payload) => {
    const workOrderRef = getDocRef(db, userId, 'workOrders', orderId);
    return updateDoc(workOrderRef, { ...payload, updatedAt: serverTimestamp() });
};

// Customer Functions
export const addCustomer = (db, userId, customerData) => {
    return addDoc(getCollectionRef(db, userId, 'customers'), { ...customerData, createdAt: serverTimestamp() });
};

export const updateCustomer = (db, userId, customerId, payload) => {
    const customerRef = getDocRef(db, userId, 'customers', customerId);
    return updateDoc(customerRef, { ...payload, updatedAt: serverTimestamp() });
};

// Add other functions for technicians, invoices, quotes etc. in the same pattern.
// For example:
export const addInvoice = (db, userId, invoiceData) => {
    return addDoc(getCollectionRef(db, userId, 'invoices'), { ...invoiceData, createdAt: serverTimestamp() });
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