import { collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, serverTimestamp, getDoc, query, onSnapshot, setDoc, where, orderBy } from 'firebase/firestore';

// --- Helper Functions ---
const getCollectionRef = (db, userId, collectionName) => {
    return collection(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName);
};

const getDocRef = (db, userId, collectionName, docId) => {
    return doc(db, 'artifacts', 'workOrderManagement', 'users', userId, collectionName, docId);
};

// --- ENHANCED GEOCODING FUNCTIONS ---

// Address validation helper
export const validateAddress = (addressObj) => {
    const required = ['street', 'city', 'state'];
    const missing = required.filter(field => !addressObj[field]?.trim());
    
    if (missing.length > 0) {
        return {
            isValid: false,
            missing: missing,
            suggestion: `Please provide: ${missing.join(', ')}`
        };
    }
    
    return { isValid: true };
};

// Format address for geocoding
export const formatAddressForGeocoding = (addressObj) => {
    const { street, city, state, zip, country = 'USA' } = addressObj;
    
    const parts = [
        street,
        city,
        state,
        zip,
        country
    ].filter(part => part && part.trim());
    
    return parts.join(', ');
};

// Enhanced geocoding with Google Maps JavaScript API
export const geocodeAddress = async (address) => {
    try {
        // Validate input
        if (!address || typeof address !== 'string') {
            throw new Error('Address is required and must be a string');
        }

        // Check if Google Maps is loaded
        if (typeof google === 'undefined' || !google.maps || !google.maps.Geocoder) {
            throw new Error('Google Maps JavaScript API is not loaded');
        }

        const geocoder = new google.maps.Geocoder();
        const cleanAddress = address.trim().replace(/\s+/g, ' ');
        
        console.log('Geocoding request:', cleanAddress);

        return new Promise((resolve, reject) => {
            geocoder.geocode({ 
                address: cleanAddress,
                region: 'US' // Bias results to US, adjust as needed
            }, (results, status) => {
                console.log('Geocoding status:', status);
                console.log('Geocoding results:', results);
                
                switch (status) {
                    case google.maps.GeocoderStatus.OK:
                        if (results && results.length > 0) {
                            const result = results[0];
                            const location = result.geometry.location;
                            
                            resolve({
                                success: true,
                                coordinates: {
                                    lat: location.lat(),
                                    lng: location.lng()
                                },
                                formattedAddress: result.formatted_address,
                                addressComponents: result.address_components
                            });
                        } else {
                            reject(new Error('No results found for the provided address'));
                        }
                        break;
                        
                    case google.maps.GeocoderStatus.ZERO_RESULTS:
                        reject(new Error('No results found. Please check the address and try again.'));
                        break;
                        
                    case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
                        reject(new Error('API quota exceeded. Please try again later.'));
                        break;
                        
                    case google.maps.GeocoderStatus.REQUEST_DENIED:
                        reject(new Error('Request denied. Check your API key configuration.'));
                        break;
                        
                    case google.maps.GeocoderStatus.INVALID_REQUEST:
                        reject(new Error('Invalid request. Please provide a valid address.'));
                        break;
                        
                    default:
                        reject(new Error(`Geocoding failed with status: ${status}`));
                }
            });
        });
        
    } catch (error) {
        console.error('Geocoding error:', error);
        
        return {
            success: false,
            error: error.message,
            suggestions: [
                'Ensure the address includes street number, street name, city, and state/zip',
                'Check that Google Maps JavaScript API is properly loaded',
                'Verify your API key configuration in Google Cloud Console',
                'Try with a more complete or differently formatted address'
            ]
        };
    }
};

// Fallback REST API geocoding (when JS API is not available)
export const geocodeAddressREST = async (address, apiKey) => {
    try {
        if (!address || typeof address !== 'string') {
            throw new Error('Address is required and must be a string');
        }
        
        if (!apiKey) {
            throw new Error('Google Maps API key is required for REST API geocoding');
        }

        const cleanAddress = address.trim().replace(/\s+/g, ' ');
        const encodedAddress = encodeURIComponent(cleanAddress);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
        
        console.log('REST geocoding request:', cleanAddress);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('REST geocoding response:', data);
        
        switch (data.status) {
            case 'OK':
                if (data.results && data.results.length > 0) {
                    const result = data.results[0];
                    const location = result.geometry.location;
                    
                    return {
                        success: true,
                        coordinates: {
                            lat: location.lat,
                            lng: location.lng
                        },
                        formattedAddress: result.formatted_address,
                        addressComponents: result.address_components
                    };
                } else {
                    throw new Error('No results found for the provided address');
                }
                
            case 'ZERO_RESULTS':
                throw new Error('No results found. Please check the address and try again.');
                
            case 'OVER_QUERY_LIMIT':
                throw new Error('API quota exceeded. Please try again later or upgrade your plan.');
                
            case 'REQUEST_DENIED':
                throw new Error('Request denied. Check your API key and make sure Geocoding API is enabled.');
                
            case 'INVALID_REQUEST':
                throw new Error('Invalid request. Please provide a valid address.');
                
            case 'UNKNOWN_ERROR':
                throw new Error('Server error occurred. Please try again later.');
                
            default:
                throw new Error(`Geocoding failed with status: ${data.status}`);
        }
        
    } catch (error) {
        console.error('REST geocoding error:', error);
        
        return {
            success: false,
            error: error.message,
            suggestions: [
                'Ensure the address includes street number, street name, city, and state/zip',
                'Check that your Google Maps API key is valid and has Geocoding API enabled',
                'Verify you haven\'t exceeded your API quota',
                'Try with a more complete or differently formatted address'
            ]
        };
    }
};

// Smart geocoding that tries JS API first, then REST API
export const smartGeocode = async (address, apiKey = null) => {
    try {
        // First try with Google Maps JavaScript API
        const result = await geocodeAddress(address);
        
        if (result.success) {
            return result;
        }
        
        // If JS API failed and we have an API key, try REST API
        if (apiKey && result.error.includes('Google Maps JavaScript API')) {
            console.log('Falling back to REST API geocoding...');
            return await geocodeAddressREST(address, apiKey);
        }
        
        return result;
        
    } catch (error) {
        console.error('Smart geocoding error:', error);
        return {
            success: false,
            error: error.message,
            suggestions: ['Try with a more complete address or check your API configuration']
        };
    }
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

// Enhanced customer function with geocoding
export const addCustomerWithGeocoding = async (db, userId, customerData, apiKey = null) => {
    try {
        const docRef = doc(getCollectionRef(db, userId, 'customers'));
        
        // If customer has address data, try to geocode it
        if (customerData.address || (customerData.street && customerData.city && customerData.state)) {
            let addressToGeocode;
            
            // Handle both string addresses and address objects
            if (typeof customerData.address === 'string') {
                addressToGeocode = customerData.address;
            } else {
                // Create address from components
                const addressObj = {
                    street: customerData.street || customerData.address?.street,
                    city: customerData.city || customerData.address?.city,
                    state: customerData.state || customerData.address?.state,
                    zip: customerData.zip || customerData.address?.zip
                };
                
                // Validate address
                const validation = validateAddress(addressObj);
                if (!validation.isValid) {
                    console.warn('Address validation failed:', validation.suggestion);
                    // Still save customer without geocoding
                    return setDoc(docRef, { 
                        ...customerData, 
                        id: docRef.id, 
                        geocodingError: validation.suggestion,
                        createdAt: serverTimestamp() 
                    });
                }
                
                addressToGeocode = formatAddressForGeocoding(addressObj);
            }
            
            console.log('Attempting to geocode:', addressToGeocode);
            
            // Attempt geocoding
            const geocodeResult = await smartGeocode(addressToGeocode, apiKey);
            
            if (geocodeResult.success) {
                // Save customer with coordinates
                const customerWithCoords = {
                    ...customerData,
                    id: docRef.id,
                    coordinates: geocodeResult.coordinates,
                    formattedAddress: geocodeResult.formattedAddress,
                    createdAt: serverTimestamp()
                };
                
                await setDoc(docRef, customerWithCoords);
                
                return {
                    success: true,
                    id: docRef.id,
                    coordinates: geocodeResult.coordinates,
                    message: 'Customer added successfully with coordinates'
                };
            } else {
                // Save customer without coordinates but log the issue
                console.warn('Geocoding failed:', geocodeResult.error);
                
                const customerWithoutCoords = {
                    ...customerData,
                    id: docRef.id,
                    geocodingError: geocodeResult.error,
                    geocodingSuggestions: geocodeResult.suggestions,
                    createdAt: serverTimestamp()
                };
                
                await setDoc(docRef, customerWithoutCoords);
                
                return {
                    success: true,
                    id: docRef.id,
                    coordinates: null,
                    warning: `Customer saved without coordinates: ${geocodeResult.error}`,
                    suggestions: geocodeResult.suggestions
                };
            }
        } else {
            // No address provided, save customer normally
            await setDoc(docRef, { ...customerData, id: docRef.id, createdAt: serverTimestamp() });
            
            return {
                success: true,
                id: docRef.id,
                coordinates: null,
                message: 'Customer added successfully (no address provided)'
            };
        }
        
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
};

export const updateCustomer = (db, userId, customerId, payload) => {
    const customerRef = getDocRef(db, userId, 'customers', customerId);
    return updateDoc(customerRef, { ...payload, updatedAt: serverTimestamp() });
};

// Enhanced customer update with geocoding
export const updateCustomerWithGeocoding = async (db, userId, customerId, payload, apiKey = null) => {
    try {
        const customerRef = getDocRef(db, userId, 'customers', customerId);
        
        // Check if we're updating address-related fields
        const addressFields = ['address', 'street', 'city', 'state', 'zip'];
        const hasAddressUpdate = addressFields.some(field => field in payload);
        
        if (hasAddressUpdate) {
            // Get current customer data to merge with updates
            const customerSnap = await getDoc(customerRef);
            const currentData = customerSnap.exists() ? customerSnap.data() : {};
            const mergedData = { ...currentData, ...payload };
            
            // Attempt geocoding with merged data
            let addressToGeocode;
            
            if (mergedData.address && typeof mergedData.address === 'string') {
                addressToGeocode = mergedData.address;
            } else {
                const addressObj = {
                    street: mergedData.street,
                    city: mergedData.city,
                    state: mergedData.state,
                    zip: mergedData.zip
                };
                
                const validation = validateAddress(addressObj);
                if (validation.isValid) {
                    addressToGeocode = formatAddressForGeocoding(addressObj);
                }
            }
            
            if (addressToGeocode) {
                const geocodeResult = await smartGeocode(addressToGeocode, apiKey);
                
                if (geocodeResult.success) {
                    // Update with coordinates
                    const updatePayload = {
                        ...payload,
                        coordinates: geocodeResult.coordinates,
                        formattedAddress: geocodeResult.formattedAddress,
                        geocodingError: null, // Clear any previous errors
                        updatedAt: serverTimestamp()
                    };
                    
                    await updateDoc(customerRef, updatePayload);
                    
                    return {
                        success: true,
                        coordinates: geocodeResult.coordinates,
                        message: 'Customer updated successfully with coordinates'
                    };
                } else {
                    // Update without coordinates
                    const updatePayload = {
                        ...payload,
                        geocodingError: geocodeResult.error,
                        geocodingSuggestions: geocodeResult.suggestions,
                        updatedAt: serverTimestamp()
                    };
                    
                    await updateDoc(customerRef, updatePayload);
                    
                    return {
                        success: true,
                        coordinates: null,
                        warning: `Customer updated without coordinates: ${geocodeResult.error}`
                    };
                }
            }
        }
        
        // Standard update without geocoding
        await updateDoc(customerRef, { ...payload, updatedAt: serverTimestamp() });
        
        return {
            success: true,
            message: 'Customer updated successfully'
        };
        
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

export const deleteCustomer = (db, userId, customerId) => {
    const customerRef = getDocRef(db, userId, 'customers', customerId);
    return deleteDoc(customerRef);
};

// --- Technician Functions ---
export const addTechnician = (db, userId, techData) => {
    // Use provided ID (Firebase UID for mobile) or generate new one (for non-mobile)
    const docId = techData.id || doc(getCollectionRef(db, userId, 'technicians')).id;
    const docRef = doc(getCollectionRef(db, userId, 'technicians'), docId);
    
    return setDoc(docRef, { 
        ...techData, 
        id: docId, 
        createdAt: serverTimestamp() 
    });
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

// --- Service Report Functions (NEW) ---
export const addServiceReport = (db, userId, reportData) => {
    const docRef = doc(getCollectionRef(db, userId, 'serviceReports'));
    const newReport = {
        ...reportData,
        id: docRef.id,
        createdAt: serverTimestamp(),
        submittedAt: serverTimestamp()
    };
    return setDoc(docRef, newReport);
};

export const updateServiceReport = (db, userId, reportId, payload) => {
    const reportRef = getDocRef(db, userId, 'serviceReports', reportId);
    return updateDoc(reportRef, { 
        ...payload, 
        updatedAt: serverTimestamp() 
    });
};

export const deleteServiceReport = (db, userId, reportId) => {
    const reportRef = getDocRef(db, userId, 'serviceReports', reportId);
    return deleteDoc(reportRef);
};

// Get service reports for a specific work order
export const getServiceReportsByWorkOrder = (db, userId, workOrderId, callback) => {
    const q = query(
        getCollectionRef(db, userId, 'serviceReports'),
        where('workOrderId', '==', workOrderId),
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(reports);
    }, (err) => console.error('Error fetching service reports by work order:', err));
};

// Get service reports for a specific technician
export const getServiceReportsByTechnician = (db, userId, technicianId, callback) => {
    const q = query(
        getCollectionRef(db, userId, 'serviceReports'),
        where('technicianId', '==', technicianId),
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(reports);
    }, (err) => console.error('Error fetching service reports by technician:', err));
};

// Get service reports by status
export const getServiceReportsByStatus = (db, userId, status, callback) => {
    const q = query(
        getCollectionRef(db, userId, 'serviceReports'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(reports);
    }, (err) => console.error('Error fetching service reports by status:', err));
};

// Mark service report as reviewed
export const markServiceReportReviewed = (db, userId, reportId, reviewedBy) => {
    const reportRef = getDocRef(db, userId, 'serviceReports', reportId);
    return updateDoc(reportRef, {
        reviewedAt: serverTimestamp(),
        reviewedBy: reviewedBy,
        status: 'reviewed',
        updatedAt: serverTimestamp()
    });
};

// Add internal note to service report (for office use)
export const addNoteToServiceReport = async (db, userId, reportId, noteText, addedBy) => {
    const reportRef = getDocRef(db, userId, 'serviceReports', reportId);
    const reportSnap = await getDoc(reportRef);
    
    if (reportSnap.exists()) {
        const newNote = {
            text: noteText.trim(),
            addedBy: addedBy,
            timestamp: new Date().toISOString(),
            type: 'internal' // Distinguish from technician notes
        };
        
        const currentNotes = reportSnap.data().internalNotes || [];
        
        return updateDoc(reportRef, {
            internalNotes: [...currentNotes, newNote],
            updatedAt: serverTimestamp()
        });
    }
};

// Update work order status based on service report completion
export const updateWorkOrderFromServiceReport = async (db, userId, workOrderId, reportData) => {
    try {
        const workOrderRef = getDocRef(db, userId, 'workOrders', workOrderId);
        const workOrderSnap = await getDoc(workOrderRef);
        
        if (workOrderSnap.exists()) {
            const updates = {
                'Order Status': reportData.status === 'completed' ? 'Completed' : 'In Progress',
                completedDate: reportData.status === 'completed' ? reportData.completedAt : null,
                serviceReportId: reportData.id,
                actualDuration: reportData.startTime && reportData.completedAt ? 
                    Math.round((new Date(reportData.completedAt) - new Date(reportData.startTime)) / (1000 * 60)) : null, // minutes
                servicedAssets: reportData.units?.map(unit => unit.type).filter(Boolean) || [],
                updatedAt: serverTimestamp()
            };
            
            // Add service completion note
            if (reportData.status === 'completed') {
                const currentNotes = workOrderSnap.data().notes || [];
                const serviceNote = {
                    text: `Service completed by ${reportData.technicianName}. ${reportData.units?.length || 0} units serviced.`,
                    timestamp: new Date().toISOString(),
                    source: 'mobile_app'
                };
                updates.notes = [...currentNotes, serviceNote];
            }
            
            return updateDoc(workOrderRef, updates);
        }
    } catch (error) {
        console.error('Error updating work order from service report:', error);
        throw error;
    }
};

// Bulk operations for service reports
export const bulkUpdateServiceReports = async (db, userId, reportIds, updates) => {
    const batch = writeBatch(db);
    
    reportIds.forEach(reportId => {
        const reportRef = getDocRef(db, userId, 'serviceReports', reportId);
        batch.update(reportRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    });
    
    return batch.commit();
};

// Generate service report summary statistics
export const getServiceReportStats = async (db, userId, startDate = null, endDate = null) => {
    try {
        let q = query(getCollectionRef(db, userId, 'serviceReports'));
        
        if (startDate && endDate) {
            q = query(q, 
                where('createdAt', '>=', startDate),
                where('createdAt', '<=', endDate)
            );
        }
        
        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                const stats = {
                    total: reports.length,
                    completed: reports.filter(r => r.status === 'completed').length,
                    inProgress: reports.filter(r => r.status === 'in_progress').length,
                    pending: reports.filter(r => r.status === 'pending').length,
                    totalUnits: reports.reduce((sum, r) => sum + (r.units?.length || 0), 0),
                    avgDuration: 0,
                    technicianBreakdown: {}
                };
                
                // Calculate average duration
                const completedWithDuration = reports.filter(r => 
                    r.status === 'completed' && r.startTime && r.completedAt
                );
                
                if (completedWithDuration.length > 0) {
                    const totalMinutes = completedWithDuration.reduce((sum, r) => {
                        const duration = (new Date(r.completedAt) - new Date(r.startTime)) / (1000 * 60);
                        return sum + duration;
                    }, 0);
                    stats.avgDuration = Math.round(totalMinutes / completedWithDuration.length);
                }
                
                // Technician breakdown
                reports.forEach(report => {
                    const techId = report.technicianId;
                    const techName = report.technicianName || 'Unknown';
                    
                    if (!stats.technicianBreakdown[techId]) {
                        stats.technicianBreakdown[techId] = {
                            name: techName,
                            total: 0,
                            completed: 0
                        };
                    }
                    
                    stats.technicianBreakdown[techId].total++;
                    if (report.status === 'completed') {
                        stats.technicianBreakdown[techId].completed++;
                    }
                });
                
                resolve(stats);
                unsubscribe();
            }, reject);
        });
        
    } catch (error) {
        console.error('Error getting service report stats:', error);
        throw error;
    }
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

// --- Utility Functions for Geocoding Diagnostics ---
export const testGeocoding = async (testAddress = "1600 Amphitheatre Parkway, Mountain View, CA", apiKey = null) => {
    console.log('Testing geocoding with address:', testAddress);
    
    try {
        const result = await smartGeocode(testAddress, apiKey);
        
        if (result.success) {
            console.log('Geocoding successful!');
            console.log('Coordinates:', result.coordinates);
            console.log('Formatted address:', result.formattedAddress);
        } else {
            console.log('Geocoding failed:', result.error);
            console.log('Suggestions:', result.suggestions);
        }
        
        return result;
        
    } catch (error) {
        console.error('Test error:', error);
        return { success: false, error: error.message };
    }
};
