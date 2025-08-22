import { collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, getDoc, query, onSnapshot } from 'firebase/firestore';

// --- Helper Functions ---
const getCollectionRef = (db, userId, collectionName) => {
    return collection(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName);
};

const getDocRef = (db, userId, collectionName, docId) => {
    return doc(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName, docId);
};

// --- NEW: Geocoding Function ---
export const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    try {
        const results = await geocoder.geocode({ address });
        if (results.results[0]) {
            const { lat, lng } = results.results[0].geometry.location;
            return { lat: lat(), lng: lng() };
        }
    } catch (error) {
        console.error('Geocoding failed:', error);
        alert('Could not find coordinates for the address. Please check the address and try again.');
    }
    return null;
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
    const docRef = doc(getCollectionRef(db, userId, 'workOrders'));
    return setDoc(docRef, { ...newOrder, id: docRef.id });
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
    const docRef = doc(getCollectionRef(db, userId, 'customers'));
    return setDoc(docRef, { ...customerData, id: docRef.id, createdAt: serverTimestamp() });
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
    const docRef = doc(getCollectionRef(db, userId, 'technicians'));
    return setDoc(docRef, { ...techData, id: docRef.id, createdAt: serverTimestamp() });
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
    const docRef = doc(getCollectionRef(db, userId, 'invoices'), invoiceData.id);
    return setDoc(docRef, { ...invoiceData, createdAt: serverTimestamp() });
};

export const addQuote = (db, userId, quoteData) => {
    const docRef = doc(getCollectionRef(db, userId, 'quotes'), quoteData.id);
    return setDoc(docRef, { ...quoteData, createdAt: serverTimestamp() });
};

export const updateInvoice = (db, userId, invoiceId, payload) => {
    const invoiceRef = getDocRef(db, userId, 'invoices', invoiceId);
    return updateDoc(invoiceRef, { ...payload, updatedAt: serverTimestamp() });
};

export const updateQuote = (db, userId, quoteId, payload) => {
    const quoteRef = getDocRef(db, userId, 'quotes', quoteId);
    return updateDoc(quoteRef, { ...payload, updatedAt: serverTimestamp() });
};

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
