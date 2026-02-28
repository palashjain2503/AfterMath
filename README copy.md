# MindBridge - AI-Powered Elderly Companion System

A production-ready MERN full-stack application for elderly care, cognitive drift detection, and caregiver integration.

## 🏗 Project Structure

```
client/
│
├── public/
│   ├── index.html
│   ├── manifest.json
│
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │
│   ├── components/
│   │   ├── Voice/
│   │   │   ├── VoiceRecorder.jsx
│   │   │   ├── VoiceVisualizer.jsx
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── CognitiveGraph.jsx
│   │   │   ├── MoodTrend.jsx
│   │   │   ├── GameStats.jsx
│   │   │   ├── EmergencyHistory.jsx
│   │   │
│   │   ├── QR/
│   │   │   ├── QRDisplay.jsx
│   │   │
│   │   ├── Games/
│   │   │   ├── MemoryMatch.jsx
│   │   │   ├── PatternGame.jsx
│   │   │   ├── SequenceGame.jsx
│   │   │
│   │   ├── Video/
│   │   │   ├── VideoCall.jsx
│   │   │   ├── CallControls.jsx
│   │   │
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── AccessibilityToggle.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ElderDashboard.jsx
│   │   ├── CaregiverDashboard.jsx
│   │   ├── DoctorPanel.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── SocketContext.js
│   │   ├── UserContext.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── voiceService.js
│   │   ├── emergencyService.js
│   │   ├── gameService.js
│   │
│   ├── hooks/
│   │   ├── useVoice.js
│   │   ├── useCognitiveScore.js
│   │   ├── useWebRTC.js
│   │
│   ├── utils/
│   │   ├── accessibilityHelpers.js
│   │   ├── constants.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│
├── package.json

server/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── jwt.js
│   │   ├── twilio.js
│   │   ├── gemini.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Conversation.js
│   │   ├── CognitiveScore.js
│   │   ├── EmergencyLog.js
│   │   ├── HealthRecord.js
│   │   ├── GameStats.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── conversationController.js
│   │   ├── cognitiveController.js
│   │   ├── emergencyController.js
│   │   ├── healthController.js
│   │   ├── gameController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── conversationRoutes.js
│   │   ├── cognitiveRoutes.js
│   │   ├── emergencyRoutes.js
│   │   ├── healthRoutes.js
│   │   ├── gameRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorHandler.js
│   │
│   ├── services/
│   │   ├── emergencyClassifier.js
│   │   ├── qrGenerator.js
│   │   ├── notificationService.js
│   │   ├── cognitiveAnalyzer.js
│   │
│   ├── sockets/
│   │   ├── socketHandler.js
│   │
│   ├── app.js
│   ├── server.js
│
├── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Git

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Configure .env with your credentials
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## 📋 Key Features

- 🗣️ Voice-first chatbot for elderly users
- 🧠 Cognitive drift detection (speech + text metrics)
- 📍 Geofencing with safety alerts
- 🚨 Telegram API emergency escalation
- 📊 Caregiver dashboard with trend analysis
- 👨‍⚕️ Doctor report generation & export
- 🔐 Role-based access control (Elderly/Caregiver/Doctor)
- 💾 RAG-based personalized memory retrieval

## 🏢 Team Collaboration Guidelines

### Developer Roles
1. **Backend Dev 1**: Auth + RAG modules
2. **Backend Dev 2**: Chatbot + Cognitive Engine modules
3. **Frontend Dev**: UI/UX across all roles + integration

### Commit Strategy
- **Feature branches**: `feature/module-description` (e.g., `feature/auth-jwt-setup`)
- **Bug fixes**: `fix/issue-description`
- **Hotfixes**: `hotfix/critical-issue`
- **Commits**: Atomic, descriptive (`git commit -m "feat: implement JWT token refresh"`)

### Merge Conflicts Prevention
- Each module has isolated routes, controllers, and services
- Models are centralized to avoid duplication
- Shared utils have clear interfaces and are documented
- Daily standups to coordinate DB schema changes

## 📚 Documentation

See the `docs/` folder for detailed information on:
- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Routes](docs/API_ROUTES.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Environment Variables](docs/ENVIRONMENT.md)
- [Naming Conventions](docs/NAMING_CONVENTIONS.md)
- [Team Workflow](docs/TEAM_WORKFLOW.md)

## 🔧 Tech Stack

**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
**Frontend**: React 18, Vite, Redux/Zustand, Tailwind CSS
**APIs**: OpenAI/Groq/Gemini, Telegram Bot API
**Real-time**: Socket.io (optional)
**File Uploads**: Multer
**Mapping**: Leaflet.js
**Charts**: Chart.js / Recharts

## 📝 License

MIT

---

**Last Updated**: February 28, 2026
