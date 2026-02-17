# Virtual Try-On — AI-Powered Mobile App

A cross-platform React Native (Expo) app that lets users virtually try on clothes using AI. Upload your photo, pick a garment, and get a realistic generated image.

## Architecture

| Layer | Tech | Purpose |
|-------|------|---------|
| Mobile | React Native (Expo SDK 54) | iOS & Android app |
| Backend | Node.js + Express + TypeScript | API server, image processing |
| AI | Fashn AI API | Virtual try-on generation |
| Storage | Cloudinary | Image hosting |

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your API keys (or keep USE_MOCK_AI=true for development)
npm run dev
```

### 2. Mobile

```bash
cd mobile
# Update API_URL in constants/config.ts with your machine's local IP
npx expo start
```

Scan the QR code with Expo Go on your phone.

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3001) |
| `FASHN_API_KEY` | Fashn AI API key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `USE_MOCK_AI` | Set `true` to skip real AI calls during development |

### Mobile (`constants/config.ts`)

| Variable | Description |
|----------|-------------|
| `API_URL` | Backend server URL (use local IP for dev) |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/tryon` | Submit try-on (multipart/form-data) |

## Project Structure

```
virtual-tryon/
├── backend/           # Express + TypeScript backend
│   └── src/
│       ├── server.ts
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── services/
├── mobile/            # Expo React Native app
│   ├── app/           # expo-router screens
│   ├── components/    # Reusable UI components
│   ├── constants/     # Config & constants
│   ├── services/      # API client
│   └── store/         # Zustand state
└── README.md
```
