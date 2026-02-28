# MindBridge Project Dependencies

## Overview
Complete dependency management for the MindBridge elderly companion AI system with chatbot, voice input, and real-time features.

---

## Frontend Dependencies (React + Vite)
**Location:** `client/package.json`
**Install:** `npm install --legacy-peer-deps`

### Core Framework
- `react`: 18.2.0 - UI framework
- `react-dom`: 18.2.0 - DOM rendering
- `react-router-dom`: 6.17.0 - Routing
- `vite`: 5.0.0 - Build tool

### State Management
- `zustand`: 4.4.1 - Lightweight state store

### Styling
- `tailwindcss`: 3.3.5 - Utility-first CSS
- `autoprefixer`: 10.4.16 - CSS prefixes
- `postcss`: 8.4.31 - CSS processor

### UI Components & Icons
- `react-icons`: 4.12.0 - SVG icons (2000+)
- `framer-motion`: 10.16.4 - Smooth animations
- `recharts`: 2.10.0 - Charts & graphs

### Audio & Voice
- `react-mic`: 12.4.6 - Microphone input (optional)
- Uses browser Web Audio API for recording
- Uses browser Speech Recognition API for transcription

### HTTP Client
- `axios`: 1.5.0 - API requests with interceptors

### Development Tools
- `@vitejs/plugin-react`: 4.2.0 - React plugin for Vite
- `eslint`: 8.52.0 - Code linting
- `prettier`: 3.0.3 - Code formatting

**Total Packages:** 599 (with dependencies)

---

## Backend Dependencies (Node.js + Express)
**Location:** `server/package.json`
**Install:** `npm install`

### Core Framework
- `express`: 4.18.2 - Web framework
- `nodemon`: 3.0.1 - Auto-restart on changes
- `cors`: 2.8.5 - CORS middleware
- `helmet`: 7.1.0 - Security headers
- `compression`: 1.7.4 - Response compression
- `morgan`: 1.10.0 - HTTP logging

### Environment & Config
- `dotenv`: 16.3.1 - Environment variables

### Database
- `mongoose`: 8.0.0 - MongoDB ODM
- `mongodb`: 6.3.0 - MongoDB driver

### API Integration
- `axios`: 1.6.0 - HTTP client
- `openai`: 4.26.0 - OpenAI API (fallback)
- `groq`: 0.4.1 - Groq API for LLM
- `google-generativeai`: 0.3.0 - Google Gemini API

### Real-time Features
- `socket.io`: 4.7.2 - WebSocket communication
- `socket.io-client`: 4.7.2 - Client library

### Validation & Security
- `bcryptjs`: 2.4.3 - Password hashing
- `jsonwebtoken`: 9.1.2 - JWT tokens
- `express-rate-limit`: 7.0.0 - Rate limiting
- `express-validator`: 7.0.0 - Input validation

### Email & Notifications
- `nodemailer`: 6.9.7 - Email service
- `sendgrid`: 6.10.0 - SendGrid integration

### Utilities
- `uuid`: 9.0.1 - Unique IDs
- `moment`: 2.29.4 - Date/time handling
- `lodash`: 4.17.21 - Utility functions

**Total Packages:** 795 (with dependencies)

---

## Python Dependencies (Optional Backend Services)
**Location:** `requirements.txt`
**Install:** `pip install -r requirements.txt`
**Python Version:** 3.9+

### Core Backend
- `flask`: 3.0.0 - Web framework (or use FastAPI)
- `flask-cors`: 4.0.0 - CORS support
- `python-dotenv`: 1.0.0 - Env variables
- `gunicorn`: 21.2.0 - Production server

### FastAPI (Alternative to Flask)
- `fastapi`: 0.104.1 - Modern async framework
- `uvicorn`: 0.24.0 - ASGI server
- `starlette`: 0.27.0 - Web toolkit

### Database
- `pymongo`: 4.5.0 - MongoDB driver
- `sqlalchemy`: 2.0.21 - SQL ORM
- `motor`: 3.3.2 - Async MongoDB
- `redis`: 5.0.1 - Redis client

### AI/LLM Integration
- `openai`: 1.3.0 - OpenAI API
- `groq`: 0.4.1 - Groq API client
- `google-generativeai`: 0.3.0 - Gemini API
- `langchain`: 0.0.333 - LLM framework
- `transformers`: 4.35.0 - HuggingFace models

### NLP & Text Processing
- `nltk`: 3.8.1 - NLP toolkit
- `spacy`: 3.6.1 - Industrial NLP
- `textblob`: 0.17.1 - Simplified NLP
- `gensim`: 4.3.2 - Topic modeling
- `sentence-transformers`: 2.2.2 - Sentence embeddings

### Audio Processing
- `librosa`: 0.10.0 - Audio analysis
- `soundfile`: 0.12.1 - Audio I/O
- `pydub`: 0.25.1 - Audio manipulation
- `SpeechRecognition`: 3.10.0 - Speech-to-text
- `pyttsx3`: 2.90 - Text-to-speech

### Machine Learning
- `torch`: 2.0.1 - PyTorch
- `numpy`: 1.24.3 - Numerical computing
- `scikit-learn`: 1.3.1 - ML algorithms
- `pandas`: 2.0.3 - Data manipulation

### Testing & Quality
- `pytest`: 7.4.2 - Testing framework
- `black`: 23.9.1 - Code formatter
- `mypy`: 1.5.1 - Type checking
- `flake8`: 6.1.0 - Linting

**Total Packages:** 80+ (core + optional)

---

## Installation Instructions

### 1. Environment Setup
```bash
# Create virtual environment (Python)
python -m venv venv
venv\Scripts\activate  # Windows

# Create .env files
cp server/.env.example server/.env
# Fill in: GEMINI_API_KEY, GROQ_API_KEY, MONGODB_URI, etc.
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd client
npm install --legacy-peer-deps
```

### 4. Install Python Dependencies (Optional)
```bash
pip install -r requirements.txt
```

### 5. Run Development Servers
```bash
# Terminal 1: Start Backend
cd server
npm run dev

# Terminal 2: Start Frontend
cd client
npm run dev
```

---

## Key Configuration Files

### Environment Variables
- **Server:** `server/.env` (see `.env.example`)
  ```
  NODE_ENV=development
  PORT=5004
  AI_MODEL=groq  # or 'gemini'
  GROQ_API_KEY=your_key_here
  MONGODB_URI=mongodb://localhost:27017/mindbridge
  ```

- **Client:** Uses `VITE_API_URL` from Vite config (default: `http://localhost:5004`)

### Build Configuration
- **Vite:** `client/vite.config.js` - React + Tailwind setup
- **Tailwind:** `client/tailwind.config.js` - Custom theme (primary: cyan, secondary: purple)
- **Babel:** Auto-configured by Vite

---

## API Service Dependencies

### Chatbot LLM Options
1. **Groq** (Current - Recommended)
   - Model: `llama-3.3-70b-versatile`
   - Free tier with generous quota
   - Very fast inference

2. **Google Gemini** (Backup)
   - Model: `gemini-2.0-flash`
   - Free tier (50 requests/minute)
   - Better for elderly-friendly responses

3. **OpenAI** (Fallback)
   - Model: `gpt-4` or `gpt-3.5-turbo`
   - Requires paid API key
   - Best quality but expensive

---

## Production Deployment

### Server
```bash
# Build & run with PM2
npm install -g pm2
npm run build  # If applicable
pm2 start ecosystem.config.js
```

### Client
```bash
# Build optimized bundle
npm run build
# Output in dist/ folder - serve with any static host
```

### Python Services (if used)
```bash
# Using Gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

---

## Dependency Updates

### Check for Updates
```bash
# Node dependencies
npm outdated

# Python dependencies
pip list --outdated
```

### Update Strategy
- Update devDependencies freely (testing tools, linters)
- Update core dependencies with testing
- Avoid major version bumps for production packages

---

## Known Issues & Workarounds

1. **React 18 + qrcode.react Incompatibility**
   - Fixed: Using `--legacy-peer-deps` flag
   - Alternative: Use `qrcode` package directly

2. **Mongoose + Node 22 Compatibility**
   - Update to latest Mongoose if issues occur

3. **Groq Model Deprecation**
   - Old: `mixtral-8x7b-32768` (deprecated)
   - New: `llama-3.3-70b-versatile`

---

## Security Notes

- **API Keys:** Never commit `.env` files - they're in `.gitignore`
- **Dependencies:** Review `package-lock.json` before major updates
- **Vulnerabilities:** Run `npm audit` regularly
- **Python:** Use virtual environment to isolate dependencies

---

## Support & Documentation

- **Node Packages:** https://www.npmjs.com
- **Python Packages:** https://pypi.org
- **Groq API:** https://console.groq.com
- **Google Gemini:** https://ai.google.dev
- **React:** https://react.dev
- **Express:** https://expressjs.com
- **MongoDB:** https://docs.mongodb.com

---

**Last Updated:** February 28, 2026
**Project:** MindBridge v1.0.0
