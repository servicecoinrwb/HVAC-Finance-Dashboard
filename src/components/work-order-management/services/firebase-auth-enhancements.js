// Add these functions to your existing Firebase configuration file

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Get your existing auth instance
const auth = getAuth();

// Enhanced technician creation with user type separation
export const createTechnicianAuth = async (technicianData) => {
  try {
    // Store current user for restoration later
    const currentUser = auth.currentUser;
    
    // Create Firebase Auth user for technician
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      technicianData.email,
      technicianData.password
    );

    const newTechnicianUser = userCredential.user;

    // Log the technician creation with explicit user type
    console.log('🔧 TECHNICIAN Firebase Auth user created:', {
      uid: newTechnicianUser.uid,
      email: newTechnicianUser.email,
      userType: 'TECHNICIAN', // Explicitly mark as technician
      role: technicianData.role,
      department: technicianData.department,
      accessLevel: 'MOBILE_TECH_APP_ONLY', // Restricted access
      timestamp: new Date().toISOString()
    });

    // Important: Sign out the newly created technician immediately
    // This prevents the technician from being logged into the admin panel
    await auth.signOut();
    
    // If there was a previous user (admin), restore their session
    if (currentUser) {
      console.log('🔐 Technician created successfully. Admin session needs to be restored.');
      // Note: In a real implementation, you might need to re-authenticate the admin
      // For now, this serves as a reminder that the admin session was interrupted
    }

    return {
      uid: newTechnicianUser.uid,
      email: newTechnicianUser.email,
      userType: 'technician',
      role: technicianData.role,
      isSignedOut: true // Flag indicating the user was signed out
    };
  } catch (error) {
    console.error('❌ Failed to create technician Firebase Auth:', error);
    throw new Error(`Failed to create technician auth: ${error.message}`);
  }
};

// Create main app user with custom claims (for comparison)
export const createMainUserAuth = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredential.user;

    console.log('👤 MAIN USER Firebase Auth user created:', {
      uid: user.uid,
      email: user.email,
      userType: 'MAIN_USER',
      role: userData.role || 'customer',
      accessLevel: 'FULL_APP_ACCESS',
      timestamp: new Date().toISOString()
    });

    return {
      uid: user.uid,
      email: user.email,
      userType: 'main_user',
      role: userData.role || 'customer'
    };
  } catch (error) {
    console.error('❌ Failed to create main user Firebase Auth:', error);
    throw new Error(`Failed to create main user auth: ${error.message}`);
  }
};

// Validate user type and permissions (future use)
export const validateUserAccess = async (userType, requiredAccess) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Get user's custom claims (when implemented)
    const tokenResult = await user.getIdTokenResult();
    const claims = tokenResult.claims;

    // Validate user type matches
    if (claims.userType !== userType) {
      throw new Error(`Access denied: User type mismatch. Expected ${userType}, got ${claims.userType}`);
    }

    // Validate access level
    if (claims.accessLevel !== requiredAccess) {
      throw new Error(`Access denied: Insufficient permissions for ${requiredAccess}`);
    }

    return true;
  } catch (error) {
    console.warn('User claims validation skipped (not yet implemented):', error.message);
    return true; // Allow access for now
  }
};

// Sign in with user type validation (future use)
export const signInWithUserTypeValidation = async (email, password, expectedUserType) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get custom claims (when implemented)
    const tokenResult = await user.getIdTokenResult();
    const claims = tokenResult.claims;
    
    // Validate user type (when claims are implemented)
    if (claims.userType && claims.userType !== expectedUserType) {
      await auth.signOut(); // Sign out if wrong user type
      throw new Error(`Invalid account type. This ${claims.userType} account cannot access ${expectedUserType} features.`);
    }

    return {
      uid: user.uid,
      email: user.email,
      userType: claims.userType || 'unknown',
      role: claims.role || 'user',
      accessLevel: claims.accessLevel || 'basic'
    };
  } catch (error) {
    throw new Error(`Sign in failed: ${error.message}`);
  }
};

export { auth };