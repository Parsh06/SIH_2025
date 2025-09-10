# Krishi Sakhi - AI-Powered Agricultural Assistant

![Krishi Sakhi](https://img.shields.io/badge/Krishi%20Sakhi-AI%20Powered%20Farming-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Krishi Sakhi** is a comprehensive AI-powered agricultural assistant designed specifically for smallholder farmers in Kerala, India. The platform combines modern web technologies with AI capabilities to provide personalized farming guidance, weather monitoring, market price tracking, and multilingual support.

## 🌟 Key Features

### 🤖 AI-Powered Features
- **Multilingual AI Assistant**: Voice and text support in Malayalam and English
- **Smart Weather Monitoring**: Real-time weather data with farming-specific advisories
- **Market Price Analysis**: Comprehensive crop price tracking and market insights
- **Personalized Advisory**: Context-aware farming recommendations

### 📱 Modern Web Application
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Dashboard**: Live weather data, farm statistics, and alerts
- **Voice Controls**: Hands-free operation with speech recognition
- **Offline Capability**: Core features work without internet connection

### 🚜 Farming Management
- **Farm Profiling**: Detailed farm and farmer information management
- **Activity Tracking**: Log farming activities and operations
- **Reminder System**: Smart alerts for farming tasks and schedules
- **Government Schemes**: Access to relevant agricultural schemes and programs

## 🏗️ Architecture Overview

The project follows a modern full-stack architecture with three main components:

```
SIH_2025/
├── aiserver/ 
├── backend/                 # Node.js/TypeScript API Server
├── krishi-sakhi-frontend/   # React/Vite Frontend Application
├── language/                # Python AI Language Module
└── data/                    # Market Data and Analytics
```

## 🛠️ Technology Stack

### Backend (Node.js/TypeScript)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK
- **API**: RESTful API with CORS support
- **Validation**: Request validation middleware

### Frontend (React/Vite)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **Authentication**: Firebase Auth

### AI Module (Python)
- **AI Engine**: Google Gemini API
- **Speech Recognition**: SpeechRecognition library
- **Text-to-Speech**: Google Text-to-Speech (gTTS)
- **Audio Processing**: PyAudio and pygame
- **Language Support**: Malayalam and English

### Data & Analytics
- **Market Data**: CSV-based market price data
- **Weather API**: Open-Meteo weather service
- **Data Processing**: Papa Parse for CSV handling

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Firebase Project** (for authentication)
- **Google Gemini API Key** (for AI features)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SIH_2025
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/krishi-sakhi
PORT=5000
FRONTEND_URL=http://localhost:5173
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd krishi-sakhi-frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. AI Language Module Setup

```bash
cd language
pip install -r requirements.txt
```

Create a `.env` file in the language directory:

```env
GEMINI_API_KEY=your-gemini-api-key
```

Run the AI assistant:

```bash
python app.py
```

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # API route handlers
│   ├── middlewares/     # Authentication & validation
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── types/               # TypeScript type definitions
└── package.json
```

### Frontend Structure
```
krishi-sakhi-frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── charts/      # Data visualization components
│   │   ├── prices/      # Price analysis components
│   │   └── ui/          # Base UI components
│   ├── context/         # React Context providers
│   ├── i18n/            # Internationalization files
│   ├── lib/             # Firebase configuration
│   ├── pages/           # Application pages
│   ├── services/        # API service layer
│   └── styles/          # Global styles
├── public/
│   └── data/            # Static data files
└── package.json
```

### Language Module Structure
```
language/
├── app.py              # Main AI assistant application
├── requirements.txt    # Python dependencies
└── .env               # Environment variables
```

## 🔧 API Endpoints

### Authentication
- `POST /api/farmers` - Create farmer profile
- `GET /api/farmers/me` - Get current farmer profile
- `PUT /api/farmers/:id` - Update farmer profile

### Farm Management
- `GET /api/farms` - Get all farms
- `POST /api/farms` - Create farm
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm

### Activity Tracking
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Advisory System
- `GET /api/advisories` - Get all advisories
- `POST /api/advisories` - Create advisory
- `PUT /api/advisories/:id` - Update advisory

### Reminder System
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

## 🌐 Frontend Pages

### Core Pages
- **Dashboard**: Weather monitoring, farm statistics, and smart advisories
- **Profile**: Farmer and farm information management
- **Activity**: Farming activity logging and tracking
- **Advisory**: Personalized farming recommendations
- **Reminders**: Task management and alerts
- **Prices**: Market price analysis and trends
- **Chat**: AI assistant interface
- **Settings**: Application preferences

### Additional Features
- **Knowledge Base**: Agricultural information and resources
- **Government Schemes**: Access to relevant programs
- **Nearby Markets**: Local market information
- **Voice Controls**: Hands-free operation

## 🗄️ Database Schema

### Farmer Model
```typescript
interface IFarmer {
  name: string;
  phoneNumber: string;
  location: string;
  firebaseUid: string;
  farms: IFarm['_id'][];
  reminders: IReminder['_id'][];
  createdAt: Date;
}
```

### Farm Model
```typescript
interface IFarm {
  farmer: IFarmer['_id'];
  sizeInAcres: number;
  soilType: string;
  irrigation: string;
  location: string;
  crops: string[];
  activities: IActivity['_id'][];
  createdAt: Date;
}
```

### Activity Model
```typescript
interface IActivity {
  farm: IFarm['_id'];
  type: string;
  description: string;
  date: Date;
  notes?: string;
  createdAt: Date;
}
```

## 🌍 Internationalization

The application supports multiple languages:
- **English**: Primary language
- **Malayalam**: Regional language for Kerala farmers

Language files are located in `krishi-sakhi-frontend/src/i18n/`

## 📊 Data Sources

### Market Data
- **Source**: Scraped market price data
- **Format**: CSV files with commodity prices
- **Coverage**: Multiple districts and markets
- **Update Frequency**: Daily

### Weather Data
- **Provider**: Open-Meteo API
- **Coverage**: Global weather data
- **Features**: 7-day forecasts, current conditions
- **Integration**: Real-time weather monitoring

## 🔐 Security Features

- **Firebase Authentication**: Secure user authentication
- **JWT Tokens**: Stateless authentication
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Request data validation
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Start the production server: `npm start`
3. Configure environment variables
4. Set up MongoDB connection
5. Configure Firebase credentials

### Frontend Deployment
1. Build the React application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables
4. Set up Firebase project

### AI Module Deployment
1. Install Python dependencies
2. Configure Gemini API key
3. Set up audio dependencies
4. Run as a service or background process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini API** for AI capabilities
- **Firebase** for authentication services
- **Open-Meteo** for weather data
- **MongoDB** for database services
- **React Community** for excellent documentation

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Roadmap

- [ ] Mobile app development (React Native)
- [ ] IoT sensor integration
- [ ] Advanced AI crop disease detection
- [ ] Blockchain-based supply chain tracking
- [ ] Multi-language support expansion
- [ ] Offline-first architecture
- [ ] Advanced analytics dashboard
- [ ] Integration with government databases

---

**Built with ❤️ for Kerala's smallholder farmers**

*Krishi Sakhi - Your Digital Farming Companion*
