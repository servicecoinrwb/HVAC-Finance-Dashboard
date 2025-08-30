import { collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, getDoc, query, onSnapshot, setDoc, where, orderBy, getDocs } from 'firebase/firestore';

// --- Enhanced Helper Functions for Technicians ---
const getCollectionRef = (db, userId, collectionName) => {
    return collection(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName);
};

const getDocRef = (db, userId, collectionName, docId) => {
    return doc(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName, docId);
};

// --- ENHANCED TECHNICIAN MANAGEMENT FUNCTIONS ---

// Enhanced technician creation with user type separation
export const addTechnicianWithAuth = async (db, userId, technicianData) => {
    try {
        const docRef = doc(getCollectionRef(db, userId, 'technicians'));
        
        const newTechnician = {
            ...technicianData,
            id: docRef.id,
            userType: 'technician', // Explicitly set as technician
            authStatus: technicianData.firebaseUid ? 'connected' : 'pending',
            status: technicianData.status || 'active',
            department: technicianData.department || 'Field Service',
            role: technicianData.role || 'field_technician',
            mobileAccess: technicianData.mobileAccess ?? true,
            skills: technicianData.skills || [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        console.log('🔧 FIRESTORE: Creating technician document:', {
            id: docRef.id,
            email: newTechnician.email,
            userType: newTechnician.userType,
            separatedFromMainUsers: true
        });

        await setDoc(docRef, newTechnician);
        
        console.log('✅ FIRESTORE: Technician document created successfully');
        return { id: docRef.id, ...newTechnician };
        
    } catch (error) {
        console.error('❌ FIRESTORE: Failed to add technician:', error);
        throw new Error(`Failed to add technician: ${error.message}`);
    }
};

// Enhanced technician update
export const updateTechnicianEnhanced = (db, userId, technicianId, payload) => {
    const technicianRef = getDocRef(db, userId, 'technicians', technicianId);
    return updateDoc(technicianRef, { 
        ...payload, 
        updatedAt: serverTimestamp() 
    });
};

// Enhanced technician delete with proper cleanup
export const deleteTechnicianEnhanced = async (db, userId, technicianId, workOrders) => {
    try {
        const techDoc = await getDoc(getDocRef(db, userId, 'technicians', technicianId));
        if (!techDoc.exists()) return;
        
        const techToDelete = techDoc.data();
        console.log('🗑️ FIRESTORE: Deleting technician:', techToDelete.email);

        const batch = writeBatch(db);
        
        // Remove technician from work orders
        (workOrders || []).forEach(wo => {
            if (wo.technician?.includes(techToDelete.name)) {
                const workOrderRef = getDocRef(db, userId, 'workOrders', wo.id);
                batch.update(workOrderRef, {
                    technician: wo.technician.filter(t => t !== techToDelete.name),
                    updatedAt: serverTimestamp()
                });
            }
        });

        const techRef = getDocRef(db, userId, 'technicians', technicianId);
        batch.delete(techRef);
        
        await batch.commit();
        console.log('✅ FIRESTORE: Technician deleted successfully');
        
    } catch (error) {
        console.error('❌ FIRESTORE: Failed to delete technician:', error);
        throw error;
    }
};

// Get all technicians with real-time listener
export const getTechniciansListener = (db, userId, callback) => {
    const q = query(
        getCollectionRef(db, userId, 'technicians'),
        orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
        const technicians = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
        
        console.log('📊 FIRESTORE: Technicians updated:', technicians.length);
        callback(technicians);
    }, (err) => {
        console.error('❌ Error fetching technicians:', err);
    });
};

// Link Firebase Auth UID to technician document
export const linkTechnicianFirebaseUID = async (db, userId, technicianId, firebaseUid) => {
    try {
        const technicianRef = getDocRef(db, userId, 'technicians', technicianId);
        
        await updateDoc(technicianRef, {
            firebaseUid: firebaseUid,
            authStatus: 'connected',
            updatedAt: serverTimestamp()
        });
        
        console.log('🔗 FIRESTORE: Firebase UID linked to technician:', {
            technicianId,
            firebaseUid
        });
        
        return true;
    } catch (error) {
        console.error('❌ FIRESTORE: Failed to link Firebase UID:', error);
        throw error;
    }
};

// Get technician by email
export const getTechnicianByEmail = async (db, userId, email) => {
    try {
        const q = query(
            getCollectionRef(db, userId, 'technicians'),
            where('email', '==', email)
        );
        
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        
        return null;
    } catch (error) {
        console.error('❌ Error getting technician by email:', error);
        throw error;
    }
};

// Check if email exists in customers/main users (to prevent conflicts)
export const checkEmailConflict = async (db, userId, email) => {
    try {
        // Check in customers/main users
        const customerQuery = query(
            getCollectionRef(db, userId, 'customers'),
            where('email', '==', email)
        );
        
        const customerSnapshot = await getDocs(customerQuery);
        
        if (!customerSnapshot.empty) {
            return {
                conflict: true,
                type: 'customer',
                message: 'Email already in use by a customer. Please use a different email for technician account.'
            };
        }
        
        // Check existing technicians
        const technicianQuery = query(
            getCollectionRef(db, userId, 'technicians'),
            where('email', '==', email)
        );
        
        const technicianSnapshot = await getDocs(technicianQuery);
        
        if (!technicianSnapshot.empty) {
            return {
                conflict: true,
                type: 'technician',
                message: 'Technician with this email already exists.'
            };
        }
        
        return { conflict: false };
        
    } catch (error) {
        console.error('❌ Error checking email conflict:', error);
        throw error;
    }
};

// Get technician stats
export const getTechnicianStats = async (db, userId) => {
    try {
        const q = query(getCollectionRef(db, userId, 'technicians'));
        const snapshot = await getDocs(q);
        
        const technicians = snapshot.docs.map(doc => doc.data());
        
        return {
            total: technicians.length,
            active: technicians.filter(t => t.status === 'active').length,
            mobileEnabled: technicians.filter(t => t.mobileAccess).length,
            connected: technicians.filter(t => t.authStatus === 'connected').length,
            pending: technicians.filter(t => t.authStatus === 'pending').length,
            authFailed: technicians.filter(t => t.authStatus === 'failed').length
        };
    } catch (error) {
        console.error('❌ Error getting technician stats:', error);
        throw error;
    }
};

// Get technicians by status
export const getTechniciansByStatus = async (db, userId, status) => {
    try {
        const q = query(
            getCollectionRef(db, userId, 'technicians'),
            where('status', '==', status),
            orderBy('name', 'asc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('❌ Error getting technicians by status:', error);
        throw error;
    }
};

// Get available technicians for work order assignment
export const getAvailableTechnicians = async (db, userId) => {
    try {
        const q = query(
            getCollectionRef(db, userId, 'technicians'),
            where('status', '==', 'active'),
            orderBy('name', 'asc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ 
            id: doc.id, 
            name: doc.data().name,
            email: doc.data().email,
            department: doc.data().department,
            skills: doc.data().skills || []
        }));
    } catch (error) {
        console.error('❌ Error getting available technicians:', error);
        throw error;
    }
};

// Update technician's last active time (for mobile app tracking)
export const updateTechnicianLastActive = async (db, userId, technicianId) => {
    try {
        const technicianRef = getDocRef(db, userId, 'technicians', technicianId);
        await updateDoc(technicianRef, {
            lastActiveAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('❌ Error updating technician last active:', error);
        throw error;
    }
};

// Bulk update technicians
export const bulkUpdateTechnicians = async (db, userId, technicianIds, updates) => {
    try {
        const batch = writeBatch(db);
        
        technicianIds.forEach(technicianId => {
            const technicianRef = getDocRef(db, userId, 'technicians', technicianId);
            batch.update(technicianRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
        });
        
        await batch.commit();
        console.log('✅ FIRESTORE: Bulk technician update completed');
    } catch (error) {
        console.error('❌ FIRESTORE: Failed bulk technician update:', error);
        throw error;
    }
};