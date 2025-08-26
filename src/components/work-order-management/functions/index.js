// functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Creates a new technician user.
 * This function handles both creating the Firebase Authentication account
 * and the corresponding Firestore document for the technician.
 *
 * It must be called by an authenticated user (a company owner/admin).
 */
exports.createTechnician = functions.https.onCall(async (data, context) => {
  // 1. Authentication Check
  // Ensure the user calling this function is authenticated.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to create a technician."
    );
  }

  // 2. Data Validation
  // Ensure all required data is present.
  const { name, email, password, phone, mobileAccess } = data;
  if (!name || !email || (mobileAccess && !password)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields: name, email, and password (if mobile access is enabled)."
    );
  }

  const adminUid = context.auth.uid; // The UID of the admin making the request.
  let newTechnicianUid;

  try {
    // 3. Create Firebase Authentication User
    // If mobile access is enabled, create an auth account for the technician.
    if (mobileAccess) {
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: name,
        });
        newTechnicianUid = userRecord.uid;
        console.log("Successfully created new auth user:", newTechnicianUid);
    } else {
        // If no mobile access, we still need a unique ID for the Firestore document.
        newTechnicianUid = admin.firestore().collection('tmp').doc().id;
    }


    // 4. Prepare Technician Data for Firestore
    const technicianData = {
      id: newTechnicianUid, // Use the new UID as the document ID
      firebaseUid: mobileAccess ? newTechnicianUid : null,
      name: name,
      email: email,
      phone: phone,
      status: "Available",
      mobileAccess: mobileAccess,
      userType: "technician",
      role: "field_technician",
      createdAt: new Date().toISOString(),
      createdBy: adminUid, // Track which admin created this technician
    };

    // 5. Create Technician Document in Firestore
    // The path correctly places the new technician under the admin's data.
    const technicianDocRef = admin
      .firestore()
      .collection("artifacts/workOrderManagement/users")
      .doc(adminUid)
      .collection("technicians")
      .doc(newTechnicianUid);

    await technicianDocRef.set(technicianData);
    console.log("Successfully created Firestore document for technician:", newTechnicianUid);

    // 6. Return Success
    return {
      status: "success",
      message: "Technician created successfully.",
      technicianId: newTechnicianUid,
    };
  } catch (error) {
    console.error("Error creating technician:", error);

    // Provide specific error messages back to the client.
    if (error.code === "auth/email-already-exists") {
      throw new functions.https.HttpsError(
        "already-exists",
        "This email is already in use by another account."
      );
    }
    // Generic error for other issues.
    throw new functions.https.HttpsError(
      "internal",
      "An unexpected error occurred. Please try again."
    );
  }
});
