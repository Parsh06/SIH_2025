# Krishi Sakhi - Frontend & Backend Setup Guide

## Overview

This guide will help you connect and run both the frontend and backend of the Krishi Sakhi application.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Firebase project setup

## Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install CORS dependencies:**

   ```bash
   npm install cors @types/cors
   ```

4. **Create environment file (.env):**

   ```env
   MONGODB_URI=mongodb://localhost:27017/krishi-sakhi
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd krishi-sakhi-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file (.env):**

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## Features Implemented

### Backend Features

- ✅ CORS configuration for frontend communication
- ✅ Firebase authentication middleware
- ✅ Farmer management (CRUD operations)
- ✅ Farm management (CRUD operations)
- ✅ Activity tracking
- ✅ Advisory system
- ✅ Reminder system
- ✅ Modular API routes

### Frontend Features

- ✅ Modular API service layer
- ✅ Data context for state management
- ✅ Dashboard with real-time data display
- ✅ Profile management with backend integration
- ✅ Reminder system with backend integration
- ✅ Error handling and loading states
- ✅ Responsive design

## API Endpoints

### Farmers

- `GET /api/farmers` - Get all farmers
- `GET /api/farmers/me` - Get current farmer profile
- `POST /api/farmers` - Create farmer profile
- `PUT /api/farmers/:id` - Update farmer profile
- `DELETE /api/farmers/:id` - Delete farmer profile

### Farms

- `GET /api/farms` - Get all farms
- `POST /api/farms` - Create farm
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm

### Activities

- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create activity

### Advisories

- `GET /api/advisories` - Get all advisories
- `POST /api/advisories` - Create advisory

### Reminders

- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

## Data Flow

1. **Authentication**: Firebase handles user authentication
2. **API Requests**: Frontend uses modular API service to communicate with backend
3. **Data Management**: DataContext manages application state
4. **Real-time Updates**: Components automatically update when data changes

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured correctly
2. **Authentication Issues**: Check Firebase configuration
3. **Database Connection**: Verify MongoDB connection string
4. **API Errors**: Check console for detailed error messages

### Debug Steps

1. Check if both servers are running
2. Verify environment variables
3. Check browser console for errors
4. Check backend logs for API errors
5. Ensure MongoDB is running

## Next Steps

- Add more farm management features
- Implement activity tracking
- Add advisory system
- Enhance reminder functionality
- Add data visualization
- Implement real-time notifications
