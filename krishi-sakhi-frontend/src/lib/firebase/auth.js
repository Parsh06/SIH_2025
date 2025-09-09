import { auth, googleProvider } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signUpWithEmail({ email, password, displayName }) {
  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(credentials.user, { displayName });
  }
  return credentials.user;
}

export async function signInWithEmail({ email, password }) {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
}

export function signOutUser() {
  return signOut(auth);
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    // Handle specific Google auth errors
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by your browser. Please allow popups and try again.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with this email address. Please sign in with your email and password instead.');
    } else if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this Google account. Please sign up first.');
    } else {
      throw new Error(error.message || 'Google sign-in failed. Please try again.');
    }
  }
}

export async function signUpWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    // Handle specific Google auth errors
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-up was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by your browser. Please allow popups and try again.');
    } else if (error.code === 'auth/email-already-in-use') {
      throw new Error('An account already exists with this email address. Please sign in instead.');
    } else {
      throw new Error(error.message || 'Google sign-up failed. Please try again.');
    }
  }
}


