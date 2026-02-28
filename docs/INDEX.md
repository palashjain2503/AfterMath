# MindBridge - Complete Architecture & Setup Guide

## 📋 Quick Navigation

| Document | Purpose |
|----------|---------|
| **[README.md](README.md)** | Project overview & quick start |
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** | 🏗️ System design & module structure |
| **[API_ROUTES.md](docs/API_ROUTES.md)** | 📡 Complete API endpoint documentation |
| **[DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** | 💾 MongoDB schema definitions |
| **[ENVIRONMENT.md](docs/ENVIRONMENT.md)** | 🔑 Environment variables guide |
| **[NAMING_CONVENTIONS.md](docs/NAMING_CONVENTIONS.md)** | 📝 Code style & naming standards |
| **[TEAM_WORKFLOW.md](docs/TEAM_WORKFLOW.md)** | 👥 Team collaboration & Git workflow |
| **[SETUP.md](docs/SETUP.md)** | 🚀 Development environment setup |

---

## 🎯 Quick Start (5 Minutes)

### Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
# ✅ Server running on http://localhost:5004
```

### Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
# ✅ App running on http://localhost:5173
```

### Test Full Stack
```bash
# In another terminal, test the API
curl -X POST http://localhost:5004/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!",
    "firstName": "John",
    "role": "elderly"
  }'
```

---

## 📂 Project Structure

```
mindbridge/
├── server/                          # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── app.js                  # Express app
│   │   ├── index.js                # Entry point
│   │   ├── config/                 # Centralized config
│   │   ├── middleware/             # Global middleware
│   │   ├── models/                 # MongoDB schemas
│   │   ├── services/               # Shared business logic
│   │   │   ├── AIService.js        # LLM integration
│   │   │   ├── TelegramService.js  # Telegram alerts
│   │   │   ├── FileService.js      # File uploads
│   │   │   └── ...
│   │   ├── routes/                 # Route aggregation
│   │   ├── controllers/            # Global controllers
│   │   ├── utils/                  # Helper functions
│   │   └── modules/                # Feature modules (8 modules)
│   │       ├── auth/               # Dev 1
│   │       │   ├── controllers/
│   │       │   ├── services/
│   │       │   └── routes/
│   │       ├── chatbot/            # Dev 2
│   │       ├── cognitiveEngine/    # Dev 2
│   │       ├── geofence/           # Dev 3
│   │       ├── alerts/             # Dev 2
│   │       ├── rag/                # Dev 1
│   │       ├── dashboard/          # Dev 3
│   │       └── doctorReports/      # Dev 3
│   ├── tests/
│   ├── logs/
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── client/                          # React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   ├── Chatbot/
│   │   │   ├── Dashboard/
│   │   │   └── Geofence/
│   │   ├── pages/                  # Role-based pages
│   │   │   ├── elderly/
│   │   │   ├── caregiver/
│   │   │   └── doctor/
│   │   ├── hooks/
│   │   ├── services/               # API clients
│   │   ├── store/                  # Redux/Zustand
│   │   ├── utils/
│   │   ├── layouts/
│   │   └── styles/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── index.html
│
├── docs/                            # Complete documentation
│   ├── ARCHITECTURE.md              # System design
│   ├── API_ROUTES.md                # All endpoints
│   ├── DATABASE_SCHEMA.md           # 11 collections
│   ├── ENVIRONMENT.md               # All env variables
│   ├── NAMING_CONVENTIONS.md        # Code standards
│   ├── TEAM_WORKFLOW.md             # Collaboration guide
│   ├── SETUP.md                     # Development setup
│   └── INDEX.md                     # This file
│
├── .gitignore
├── README.md
└── docker-compose.yml (optional)
```

---

## 🏗️ Architecture Highlights

### **Modular Design**
- 8 independent feature modules
- Each module has controllers, services, routes
- Clear separation of concerns
- **No circular dependencies**

### **Three-Layer Architecture**
```
Routes (HTTP) → Controllers (Request handling) → Services (Business logic) → Models (DB)
```

### **Shared Services** (No module ownership)
- `AIService.js` - LLM calls (OpenAI/Groq/Gemini)
- `TelegramService.js` - Telegram API
- `FileService.js` - File uploads
- `LoggerService.js` - Centralized logging
- `EmailService.js` - Email notifications

### **Global Middleware Stack**
```
Request → CORS → Auth (JWT) → Validation → Error Handler → Logger
```

### **Role-Based Access Control (RBAC)**
```
Elderly User      → Chatbot, metrics, memories
Caregiver User    → Dashboard, alerts, patient management
Doctor User       → Reports, patient summaries
```

---

## 👥 Team Structure & Responsibilities

### **Developer 1: Auth & RAG**
**Modules**: `auth`, `rag`
- User registration, login, password reset
- JWT token management
- Memory storage & vector embeddings
- Semantic search for personalized context
- **Routes**: `/api/v1/auth/*`, `/api/v1/rag/*`

### **Developer 2: Chatbot, Cognitive Engine & Alerts**
**Modules**: `chatbot`, `cognitiveEngine`, `alerts`
- Voice & text message processing
- LLM integration
- Speech/text analysis (drift detection)
- Cognitive metrics & risk events
- Alert generation & Telegram escalation
- **Routes**: `/api/v1/chatbot/*`, `/api/v1/cognitive-engine/*`, `/api/v1/alerts/*`

### **Developer 3: Geofence, Dashboard, Reports & Users**
**Modules**: `geofence`, `dashboard`, `doctorReports`, `users`
- Geolocation tracking & safe zones
- Dashboard analytics aggregation
- Doctor report generation
- User profile & caregiver relationship management
- **Routes**: `/api/v1/geofence/*`, `/api/v1/dashboard/*`, `/api/v1/doctor-reports/*`, `/api/v1/users/*`

---

## 🔄 Data Flow Example: Chatbot Message

```
1. FRONTEND
   └─ User sends: "How are you today?"
   └─ Calls: POST /api/v1/chatbot/messages

2. BACKEND - ROUTE HANDLER
   └─ Validates JWT token (middleware)
   └─ Calls: ChatbotController.processMessage()

3. BACKEND - CONTROLLER
   └─ Parses & sanitizes input
   └─ Calls: ChatbotService.processUserMessage()

4. BACKEND - SERVICE (CHATBOT)
   └─ Retrieves user context (User model)
   └─ Calls: RAGService.retrieveMemories(userId, message)
   └─ Calls: AIService.callLLM(prompt_with_context)
   └─ Saves conversation (Conversation model)
   └─ Calls: CognitiveEngineService.analyzeConversation()

5. BACKEND - SERVICE (COGNITIVE ENGINE)
   └─ Analyzes speech metrics (if voice)
   └─ Analyzes text metrics
   └─ Calculates drift score
   └─ If drift > threshold: calls AlertService
   └─ Saves CognitiveMetric to DB

6. BACKEND - SERVICE (ALERTS)
   └─ Creates Alert record
   └─ Calls: TelegramService.sendMessage()
   └─ Notifies caregiver via Telegram

7. BACKEND - RESPONSE
   └─ Returns 200 with:
      - Bot response
      - Cognitive metrics
      - Any triggered alerts

8. FRONTEND
   └─ Displays bot message
   └─ Updates Redux state
   └─ Shows alert notification if any
```

---

## 📡 API Overview

All endpoints require JWT token (except auth):
```
Authorization: Bearer <JWT_TOKEN>
```

### **Module Endpoints**
| Module | Base Route | Operations |
|--------|-----------|-----------|
| Auth | `/api/v1/auth` | Register, login, refresh, reset password |
| Chatbot | `/api/v1/chatbot` | Send messages, get conversations |
| Cognitive Engine | `/api/v1/cognitive-engine` | Analyze drift, get metrics, risk events |
| RAG | `/api/v1/rag` | Search memories, add/update memories |
| Geofence | `/api/v1/geofence` | Create zones, check status, breach history |
| Alerts | `/api/v1/alerts` | Get alerts, acknowledge, set preferences |
| Dashboard | `/api/v1/dashboard` | Get summary, metrics, trends, risk analysis |
| Doctor Reports | `/api/v1/doctor-reports` | Generate, list, download, delete reports |
| Users | `/api/v1/users` | Profile, relationships, permissions |

Full documentation: [API_ROUTES.md](docs/API_ROUTES.md)

---

## 💾 Database (MongoDB)

### **11 Collections**
1. **users** - User accounts with roles
2. **conversations** - Chat history
3. **cognitiveMetrics** - Drift detection data
4. **riskEvents** - High-risk incidents
5. **geofences** - Safe zones
6. **locationHistory** - GPS tracking
7. **caregiverRelationships** - Elderly-caregiver links
8. **alerts** - Notifications log
9. **memories** - RAG context storage
10. **doctorReports** - Generated reports
11. **auditLogs** - Compliance tracking

Schema details: [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)

---

## 🔐 Security Features

### **Authentication**
- JWT tokens (15m expiry, 7d refresh)
- bcrypt password hashing (10 rounds)
- Refresh token rotation
- CSRF protection (if using sessions)

### **Authorization**
- Role-based access control (RBAC)
- Route-level permission checks
- Resource-level access validation

### **Data Security**
- Rate limiting (100 req/15min default)
- Input validation & sanitization
- MongoDB injection prevention (Mongoose)
- CORS origin restriction
- HTTPS enforcement (production)

### **Sensitive Data**
- Never committed (uses .env)
- Encrypted in transit (HTTPS)
- Proper secret rotation
- Audit logging for sensitive operations

---

## 🔧 Development Workflow

### **GitHub Flow**
```
1. Fetch latest: git fetch origin
2. Create feature branch: git checkout -b feature/module-description
3. Make commits: git commit -m "feat(module): description"
4. Push: git push origin feature/module-description
5. Create PR with description
6. Wait for review & all tests to pass
7. Merge with rebase/squash
```

### **Commit Convention**
```
[type](module): description

Types: feat, fix, refactor, docs, test, perf, style
Modules: auth, chatbot, cognitive-engine, geofence, etc.

Examples:
feat(auth): implement JWT refresh endpoint
fix(chatbot): handle null conversation edge case
test(cognitive-engine): add drift calculation tests
```

### **Merge Conflict Prevention**
- ✅ Each developer owns their modules
- ✅ Shared files have clear ownership
- ✅ Daily standups to coordinate DB changes
- ✅ Code review before merging
- ✅ Backward-compatible changes only

---

## 📦 Environment Variables

All sensitive configuration is in `.env` files (never committed).

### **Backend**
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - Token signing key
- `OPENAI_API_KEY` - LLM provider
- `TELEGRAM_BOT_TOKEN` - Alert dispatch
- Plus 40+ other configurations

### **Frontend**
- `VITE_API_BASE_URL` - Backend endpoint
- `VITE_GOOGLE_MAPS_API_KEY` - Maps
- Plus 30+ feature flags & analytics

Full reference: [ENVIRONMENT.md](docs/ENVIRONMENT.md)

---

## 🚀 Running the Application

### **Development (3 Terminals)**
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend
cd client && npm run dev

# Terminal 3: Tests (optional)
cd server && npm test
```

### **Production**
```bash
# Build frontend
cd client && npm run build

# Run backend with prod env
NODE_ENV=production npm start

# Or use Docker Compose
docker-compose up
```

---

## 📚 Learning Path

1. **Start here** → [README.md](README.md)
2. **Understand design** → [ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. **Check naming** → [NAMING_CONVENTIONS.md](docs/NAMING_CONVENTIONS.md)
4. **Learn APIs** → [API_ROUTES.md](docs/API_ROUTES.md)
5. **Review database** → [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)
6. **Setup locally** → [SETUP.md](docs/SETUP.md)
7. **Collaboration** → [TEAM_WORKFLOW.md](docs/TEAM_WORKFLOW.md)

---

## ❓ FAQ

### **How do I avoid merge conflicts?**
→ Each developer works in their module folder. Shared files are locked during changes. See [TEAM_WORKFLOW.md](docs/TEAM_WORKFLOW.md).

### **How do I add a new feature?**
→ Identify which module it belongs to, follow the controller→service→model pattern, add tests, create PR.

### **What if I need to modify another module?**
→ Don't edit directly. Create an issue/PR and coordinate with the responsible developer.

### **How do I test my changes?**
→ Write unit tests in `tests/unit/`, run `npm test`, deploy to staging first.

### **Can multiple developers edit the same service?**
→ Avoid if possible. If needed, coordinate via Slack, make backward-compatible changes, get peer review.

### **What's the deployment process?**
→ PR → Review → Merge to main → Run tests → Build → Deploy to staging → Manual testing → Deploy to production.

---

## 🎓 Key Principles

1. **Modularity** - Each module is independent
2. **Separation of Concerns** - Routes ≠ Controllers ≠ Services ≠ Models
3. **No Circular Dependencies** - A can't import B if B imports A
4. **Explicit Contracts** - Services have clear interfaces
5. **Coordination Points** - Daily standups, PRs, code reviews
6. **Documentation** - Code is documented, APIs are documented
7. **Testing** - Unit tests for services, integration tests for modules
8. **Backward Compatibility** - Don't break existing APIs

---

## 🤝 Team Collaboration Checklist

- [ ] Daily standup at 10:00 AM
- [ ] Code review before merging
- [ ] No direct commits to main branch
- [ ] Feature branches named clearly
- [ ] Commits have descriptive messages
- [ ] Database changes announced in advance
- [ ] Shared service changes coordinated
- [ ] Tests pass before PR
- [ ] Linting clean before PR
- [ ] Documentation updated with changes

---

## 📞 Getting Help

| Issue | Where to Ask |
|-------|-------------|
| Quick question | #mindbridge-dev Slack channel |
| Code issue | Create GitHub issue with details |
| Design decision | Bring to weekly tech sync |
| Urgent blocker | Escalate to tech lead |

---

## 📊 Project Statistics

- **Total Modules**: 8 (auth, chatbot, cognitive, geofence, alerts, rag, dashboard, reports)
- **API Endpoints**: 50+ (across all modules)
- **Database Collections**: 11
- **Team Size**: 3 developers
- **Lines of Documentation**: 5004+
- **Environment Variables**: 70+

---

## 🎯 Next Steps

1. **Clone/Setup**: [SETUP.md](docs/SETUP.md)
2. **Understand your module**: Read ARCHITECTURE.md section for your module
3. **Review APIs you'll use**: Check [API_ROUTES.md](docs/API_ROUTES.md)
4. **Check naming standards**: Follow [NAMING_CONVENTIONS.md](docs/NAMING_CONVENTIONS.md)
5. **Coordinate with team**: Sync in daily standup

---

**Last Updated**: February 28, 2026

---

## License
MIT

---

## Quick Reference

```bash
# Start dev environment
npm run dev          # Backend (in server/)
npm run dev          # Frontend (in client/)

# Testing
npm test             # Run all tests

# Linting
npm run lint         # Check code style

# Building
npm run build        # Frontend (in client/)

# Database
npm run seed         # Populate test data (in server/)

# Deploy
NODE_ENV=production npm start

# Git workflow
git checkout -b feature/module-description
git commit -m "feat(module): description"
git push origin feature/module-description
# Create PR on GitHub
```

---

For detailed information on any topic, refer to the specific documentation files listed at the top of this page.
