# Firebase Setup Guide

## Required Environment Variables

Create a `.env` file in the `krishi-sakhi-frontend` directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > General > Your apps
4. Add a web app and copy the config values
5. Enable Authentication > Sign-in method > Google
6. Add your domain to authorized domains

## Features Implemented

✅ **Google Authentication**

- Sign in with Google
- Sign up with Google
- Proper error handling for existing accounts

✅ **Form Validation**

- Email format validation
- Password strength validation (8+ chars, uppercase, lowercase, number)
- Name validation (2-50 characters)
- Password confirmation matching
- Real-time validation feedback

✅ **User Experience**

- Loading states for both email and Google auth
- Clear error messages
- Form field highlighting for errors
- Disabled states during loading
