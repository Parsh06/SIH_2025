import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

interface AuthenticatedRequest extends Request {
  user?: { uid: string };
}

dotenv.config();

if (!admin.apps.length) {
  try {
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_PRIVATE_KEY ||
      !process.env.FIREBASE_CLIENT_EMAIL
    ) {
      console.error('❌ Firebase Admin SDK configuration missing!');
      console.error('Required environment variables:');
      console.error(
        '- FIREBASE_PROJECT_ID:',
        process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'
      );
      console.error(
        '- FIREBASE_PRIVATE_KEY:',
        process.env.FIREBASE_PRIVATE_KEY ? '✅ Set' : '❌ Missing'
      );
      console.error(
        '- FIREBASE_CLIENT_EMAIL:',
        process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Missing'
      );
      console.error(
        '\nPlease create a .env file in the backend directory with your Firebase service account credentials.'
      );
      process.exit(1);
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });

    console.log('✅ Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error(
      '❌ Failed to initialize Firebase Admin SDK:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

export const authenticateFirebase = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};