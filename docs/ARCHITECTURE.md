# MindBridge Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React + Vite)                  │
│  ┌──────────────┬────────────────┬─────────────────────────────┐ │
│  │  Elderly UI  │  Caregiver UI  │    Doctor Dashboard UI      │ │
│  └──────────────┴────────────────┴─────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Redux Store / Zustand (Global State Management)             │ │
│  │ - Auth State, User Profile, Alerts, Dashboard Data         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ API Client Layer (axios / fetch with interceptors)          │ │
│  │ - Auth Service, Chatbot Service, Dashboard Service         │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                   REST API + WebSocket
                   (Socket.io for real-time)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Backend (Node.js + Express)                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ API Gateway / Route Aggregation Layer                       │ │
│  │ - Centralized routes: /api/v1/auth, /api/v1/chatbot, etc.  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Global Middleware Stack                                     │ │
│  │ - Auth (JWT), Error Handling, Logging, Rate Limiting       │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                     Modular Services                         │ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ Auth Module (Developer 1)                                │ │
│  │ │ - JWT generation, refresh tokens, password hashing      │ │
│  │ │ - User role validation                                  │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ Chatbot Module (Developer 2)                             │ │
│  │ │ - Voice processing, message handling                     │ │
│  │ │ - Integration with RAG for context retrieval            │ │
│  │ │ - LLM API calls (OpenAI/Groq/Gemini)                    │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ Cognitive Engine Module (Developer 2)                    │ │
│  │ │ - Speech analysis (clarity, pause patterns)              │ │
│  │ │ - Text analysis (coherence, memory gaps)                 │ │
│  │ │ - Drift scoring algorithm                                │ │
│  │ │ - Risk event triggers                                    │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ RAG Module (Developer 1)                                 │ │
│  │ │ - Vector embedding (OpenAI embeddings)                   │ │
│  │ │ - Memory storage & retrieval                             │ │
│  │ │ - Family history context injection                       │ │
│  │ │ - Semantic search                                        │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ Geofence Module                                          │ │
│  │ │ - Location boundary checks                               │ │
│  │ │ - Real-time GPS tracking                                 │ │
│  │ │ - Exit/entry event triggers                              │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ Alerts Module                                            │ │
│  │ │ - Telegram escalation service                            │ │
│  │ │ - Alert routing (caregiver notification logic)           │ │
│  │ │ - Alert history & ACK tracking                           │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ Dashboard Module                                         │ │
│  │ │ - Analytics aggregation                                  │ │
│  │ │ - Trend calculation                                      │ │
│  │ │ - Risk scoring summaries                                 │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  │ ┌──────────────────────────────────────────────────────────┐ │
│  │ │ Doctor Reports Module                                    │ │
│  │ │ - Comprehensive report generation                        │ │
│  │ │ - PDF export                                             │ │
│  │ │ - Trend analysis summaries                               │ │
│  │ └──────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Shared Services Layer (No module ownership)                 │ │
│  │ - AIService (LLM calls), TelegramService, LoggerService     │ │
│  │ - FileService (Multer), ValidationService                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Data Access Layer (Models)                                  │ │
│  │ - User, Conversation, CognitiveMetric, Geofence            │ │
│  │ - RiskEvent, Alert, CaregiverRelationship                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Data Layer (MongoDB)                         │
│  - Collections: users, conversations, metrics, geofences, etc. │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│               External Services (APIs)                          │
│  - OpenAI / Groq / Gemini (LLM)                                │
│  - Telegram Bot API (Alerts)                                    │
│  - Google Maps API (Geolocation)                                │
└─────────────────────────────────────────────────────────────────┘
```

## Module Design Pattern

Each module follows this structure:

```
module/
├── controllers/           # Handles HTTP requests → calls services
│   ├── SomeController.js
│   └── index.js           # Exports
├── services/              # Business logic (core logic lives here)
│   ├── SomeService.js
│   └── index.js
├── routes/                # HTTP route definitions
│   ├── index.js
│   └── SomeRouter.js
└── types/ (optional)      # TypeScript interfaces / JSDoc types
    └── index.js
```

### Dependency Flow (One Direction)
```
routes → controllers → services → models & shared services
```

## Key Principles

### 1. **Separation of Concerns**
- **Routes**: HTTP handling only
- **Controllers**: Request validation & response formatting
- **Services**: Business logic (never touch HTTP)
- **Models**: Database schema & queries
- **Utils**: Reusable functions across modules

### 2. **No Circular Dependencies**
- Module A cannot import from Module B if B imports from A
- Use shared services for cross-module communication
- Services are agnostic to who calls them

### 3. **Independent Module Development**
- Each developer works in their module folder
- Changes to other modules don't affect your work
- Shared models are updated via coordinated PRs

### 4. **Scalability**
- **Horizontal**: Stateless services can be replicated
- **Vertical**: Modular structure scales with feature additions
- **Database**: Indexing on frequently queried fields

## Data Flow Example: Chatbot Interaction

```
1. Frontend sends message:
   POST /api/v1/chatbot/messages
   { userId, message, conversationId }

2. Route Handler (routes/index.js):
   → Validates JWT token (middleware)
   → Calls ChatbotController.processMessage()

3. Controller (controllers/ChatbotController.js):
   → Parses & sanitizes input
   → Calls ChatbotService methods

4. Service (services/ChatbotService.js):
   → Retrieves user context via User model
   → Fetches memory via RAG service
   → Calls AIService for LLM response
   → Saves conversation to Conversation model
   → Returns formatted response

5. Controller:
   → Formats response
   → Calls CognitiveEngineService (optional drift analysis)
   → Returns 200 with data

6. Frontend:
   → Receives message
   → Updates Redux store
   → Displays in UI
```

## Error Handling Strategy

```
Global Error Middleware (app.js):
  ↑
  └─ Catches all errors from routes/controllers

Service Layer Errors:
  → Throws custom AppError with code & message
  → Controller catches & passes to middleware

Expected vs Unexpected Errors:
  - Expected: ValidationError, NotFoundError (handled gracefully)
  - Unexpected: Database crashes (logged & alert sent)

Logging:
  - WARN for validation errors
  - ERROR for unexpected issues
  - INFO for successful operations
```

## Environment-Based Configuration

```
config/
├── default.js        # Shared defaults
├── development.js    # Dev overrides
├── production.js     # Prod overrides
└── database.js       # MongoDB connection logic
```

## Authentication Flow

```
1. User logs in → AuthController.login()
   ├─ Validates credentials
   ├─ Hashes password, checks DB
   ├─ Generates JWT + refresh token
   └─ Returns tokens

2. Frontend stores tokens (secure HTTP-only cookie for refresh)

3. Protected routes:
   ├─ Validates JWT via middleware
   ├─ Extracts user from JWT
   └─ Passes user to controller

4. Token refresh:
   ├─ Frontend detects 401
   ├─ Uses refresh token endpoint
   ├─ Gets new JWT
   └─ Retries original request
```

## Avoiding Circular Dependencies

### ❌ Bad Practice
```javascript
// auth/services/AuthService.js
const { ChatbotService } = require('../../chatbot/services');

// chatbot/services/ChatbotService.js
const { AuthService } = require('../../auth/services');
```

### ✅ Good Practice
```javascript
// auth/services/AuthService.js
const { AIService } = require('../../services'); // shared

// chatbot/services/ChatbotService.js
const { AIService } = require('../../services'); // shared
```

## Scaling Considerations

### **Microservices Transition** (Future)
If the app grows, module structure allows easy migration to microservices:
```
Each module → separate service/codebase
Shared services → dedicated services (AI, Telegram, etc.)
APIs → message queues (RabbitMQ/Kafka)
```

### **Caching Strategy**
- Redis cache for user profiles, ML models
- ETags for API responses
- Client-side caching via Redux

### **Load Balancing**
- Stateless backend allows horizontal scaling
- Session data in MongoDB (JWT tokens are ephemeral)
- Socket.io with Redis adapter for multi-instance support

### **Database Optimization**
- Indexes on frequently filtered fields
- Pagination for large datasets
- Soft deletes for audit trails
- Connection pooling with MongoDB

---

**Last Updated**: February 28, 2026
