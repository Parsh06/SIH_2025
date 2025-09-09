
# Krishi Sakhi — AI-powered personal farming assistant (Frontend)

Farmer-friendly, natural-theme React app with Tailwind and shadcn-style components.
Includes English/Malayalam toggle, voice input, activity logging, advisories,
reminders, knowledge hub, and a chat placeholder. Fully router-based with a clean layout.

## Tech
- React + Vite
- TailwindCSS
- shadcn-style UI (lightweight, zero deps)
- React Router
- LocalStorage persistence
- Web Speech API for mic (optional)

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Notes
- Replace the placeholder chat/advisories/prices with API calls later.
- The language toggle flips between English and Malayalam across the app.
- Voice button uses `webkitSpeechRecognition` where available.
