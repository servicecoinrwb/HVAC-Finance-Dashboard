// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

exports.createTechnician = functions.https.onCall(async (data, context) => {
  // Verify the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const businessOwnerUID = context.auth.uid;
  const { name, email, password, phone, mobileAccess } = data;

  // Validate required fields
  if (!name || !email) {
    throw new functions.https.HttpsError('invalid-argument', 'Name and email are required');
  }

  if (mobileAccess && (!password || password.length < 6)) {
    throw new functions.https.HttpsError('invalid-argument', 'Password must be at least 6 characters for mobile access');
  }

  try {
    let firebaseUid = null;

    // Create Firebase Auth user if mobile access is enabled
    if (mobileAccess) {
      console.log('Creating Firebase Auth user for:', email);
      
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: name,
      });
      
      firebaseUid = userRecord.uid;
      console.log('Created Firebase user:', firebaseUid);
    }

    // Create technician document in Firestore
    const technicianData = {
      id: firebaseUid || admin.firestore().collection('temp').doc().id,
      name: name,
      email: email,
      phone: phone || '',
      status: 'active',
      mobileAccess: mobileAccess || false,
      firebaseUid: firebaseUid,
      userType: 'technician',
      role: 'field_technician',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: businessOwnerUID,
      skills: [],
      // Add any other default fields your app expects
    };

    const docRef = db.doc(`artifacts/workOrderManagement/users/${businessOwnerUID}/technicians/${technicianData.id}`);
    await docRef.set(technicianData);

    console.log('Technician document created:', technicianData.id);

    return {
      success: true,
      technicianId: technicianData.id,
      message: `Technician ${name} created successfully${mobileAccess ? ' with mobile access' : ''}`,
      firebaseUid: firebaseUid
    };

  } catch (error) {
    console.error('Error creating technician:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-exists') {
      throw new functions.https.HttpsError('already-exists', 'A user with this email already exists');
    }
    
    if (error.code === 'auth/invalid-email') {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid email address');
    }
    
    if (error.code === 'auth/weak-password') {
      throw new functions.https.HttpsError('invalid-argument', 'Password is too weak');
    }

    throw new functions.https.HttpsError('internal', 'Failed to create technician: ' + error.message);
  }
});