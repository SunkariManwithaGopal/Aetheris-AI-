// lib/firebase.ts
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // If you don't have local system variables set, 
    // explicitly providing a mock project ID forces the SDK to bypass the environment check.
    admin.initializeApp({
      projectId: 'autonomous-research-agent-mock'
    });
  } catch (error) {
    console.warn('Firebase failed to initialize. Falling back to default initialization.');
    admin.initializeApp();
  }
}

export const db = admin.firestore();