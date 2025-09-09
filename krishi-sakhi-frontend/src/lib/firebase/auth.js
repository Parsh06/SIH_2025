import { auth } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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


