# MindBridge Naming Conventions

## File & Folder Structure

### Backend Files

#### Controllers
```
src/modules/[module]/controllers/[Resource][Action]Controller.js

Examples:
- src/modules/auth/controllers/AuthController.js
- src/modules/chatbot/controllers/ChatbotController.js
- src/modules/cognitiveEngine/controllers/DriftAnalysisController.js

Class Name: [Resource][Action]Controller
- class AuthController { }
- class ChatbotController { }
- class DriftAnalysisController { }

Methods: camelCase, action-focused
- async login(req, res) { }
- async sendMessage(req, res) { }
- async analyzeDrift(req, res) { }
```

#### Services
```
src/modules/[module]/services/[Resource]Service.js

Examples:
- src/modules/auth/services/AuthService.js
- src/modules/chatbot/services/ChatbotService.js
- src/modules/cognitiveEngine/services/DriftService.js

Class Name: [Resource]Service
- class AuthService { }
- class ChatbotService { }
- class DriftService { }

Methods: camelCase, focus on business logic
- async validateCredentials(email, password) { }
- async processUserMessage(userId, message) { }
- async calculateDriftScore(conversationId) { }
```

#### Shared Services
```
src/services/[Service]Service.js

Examples:
- src/services/AIService.js        # LLM calls (OpenAI/Groq/Gemini)
- src/services/TelegramService.js  # Telegram Bot API
- src/services/FileService.js      # File uploads/downloads
- src/services/LoggerService.js    # Logging
- src/services/EmailService.js     # Email dispatch

Class Name: [Service]Service
Methods: Static or instance methods
- static async callLLM(prompt) { }
- static async sendTelegramMessage(chatId, text) { }
```

#### Routes
```
src/modules/[module]/routes/index.js
or
src/modules/[module]/routes/[resource].routes.js

Examples:
- src/modules/auth/routes/index.js
- src/modules/chatbot/routes/chatbot.routes.js

Code:
router.post('/login', AuthController.login);
router.get('/conversations/:id', ChatbotController.getConversation);

Route Paths: kebab-case, resource-focused
- /auth/login
- /auth/refresh
- /chatbot/messages
- /chatbot/conversations
- /cognitive-engine/analyze
- /geofence/check
```

#### Models
```
src/models/[Resource]Model.js
or
src/models/[Resource].js

Examples:
- src/models/UserModel.js
- src/models/ConversationModel.js
- src/models/CognitiveMetricModel.js

Schema Name: [Resource]Schema (implicit from const name)
const userSchema = new mongoose.Schema({ ... });
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
```

#### Utilities & Helpers
```
src/utils/[featureName]Utils.js
src/utils/validators.js
src/utils/formatters.js
src/utils/constants.js

Examples:
- src/utils/authUtils.js
- src/utils/geofenceUtils.js
- src/utils/validators.js
- src/utils/constants.js

Functions: camelCase
- function validateEmail(email) { }
- function calculateDistance(lat1, lng1, lat2, lng2) { }
- function formatCognitiveScore(score) { }
```

#### Middleware
```
src/middleware/[featureName]Middleware.js

Examples:
- src/middleware/authMiddleware.js
- src/middleware/errorHandler.js
- src/middleware/validationMiddleware.js
- src/middleware/loggingMiddleware.js

Functions: camelCase, action-descriptive
- async authenticateJWT(req, res, next) { }
- async validateRole(requiredRole)(req, res, next) { }
- async errorHandler(err, req, res, next) { }
```

#### Configuration
```
src/config/[environment].js
src/config/database.js

Examples:
- src/config/default.js
- src/config/development.js
- src/config/production.js
- src/config/database.js

Exports: camelCase properties
module.exports = {
  port: 5004,
  databaseUri: '...',
  jwtSecret: '...'
};
```

#### Tests
```
tests/unit/[feature].test.js
tests/integration/[feature].integration.test.js
tests/e2e/[feature].e2e.test.js

Examples:
- tests/unit/authService.test.js
- tests/integration/chatbot.integration.test.js
- tests/e2e/authentication.e2e.test.js
```

---

### Frontend Files

#### Components
```
src/components/[Feature]/[ComponentName].jsx
src/components/[Feature]/[ComponentName].module.css

Examples:
- src/components/Chatbot/ChatMessage.jsx
- src/components/Chatbot/VoiceInput.jsx
- src/components/Dashboard/MetricsCard.jsx
- src/components/Common/Button.jsx
- src/components/Common/Modal.jsx

Component Name: PascalCase
- export default function ChatMessage(props) { }
- export default function VoiceInput({ onRecord }) { }

Props: camelCase
- <ChatMessage message={message} timestamp={time} />

Styles: CSS Modules (scoped)
```

#### Pages/Routes
```
src/pages/[role]/[PageName].jsx

Examples:
- src/pages/elderly/Home.jsx
- src/pages/elderly/Settings.jsx
- src/pages/caregiver/Dashboard.jsx
- src/pages/caregiver/PatientList.jsx
- src/pages/doctor/ReportView.jsx
```

#### Hooks
```
src/hooks/use[HookName].js

Examples:
- src/hooks/useAuth.js
- src/hooks/useFetch.js
- src/hooks/useChatbot.js
- src/hooks/useGeolocation.js
- src/hooks/useDashboardData.js

Function Name: Exact match with filename
- function useAuth() { ... }
```

#### Services (API Clients)
```
src/services/[featureName]Service.js

Examples:
- src/services/authService.js
- src/services/chatbotService.js
- src/services/metricsService.js
- src/services/dashboardService.js
- src/services/reportService.js

Functions: camelCase
- async function login(email, password) { }
- async function sendMessage(message) { }
- async function fetchMetrics(userId) { }

Exports: Named exports or default export
```

#### State Management (Redux/Zustand)
```
src/store/[featureName]Store.js
or
src/store/slices/[feature]Slice.js  (Redux)

Examples:
- src/store/authStore.js
- src/store/slices/authSlice.js
- src/store/chatbotStore.js
- src/store/dashboardStore.js

Actions: UPPER_SNAKE_CASE
- SET_USER
- SET_LOADING
- ADD_MESSAGE
- UPDATE_METRICS

Selectors: camelCase
- selectUser
- selectIsLoading
- selectMessages
```

#### Constants
```
src/utils/constants.js
or
src/config/constants.js

Examples:
const API_BASE_URL = 'http://localhost:5004/api/v1';
const ROLES = {
  ELDERLY: 'elderly',
  CAREGIVER: 'caregiver',
  DOCTOR: 'doctor'
};

const ALERT_SEVERITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4
};
```

#### Utils
```
src/utils/[utilityName].js

Examples:
- src/utils/apiClient.js      # Axios instance with interceptors
- src/utils/validators.js     # Form validation
- src/utils/formatters.js     # Date, number formatting
- src/utils/storage.js        # LocalStorage helper

Functions: camelCase
- function formatDate(date, format) { }
- function isValidEmail(email) { }
- function saveToLocalStorage(key, value) { }
```

---

## Naming Patterns

### Variables & Constants

#### Global Constants
```javascript
// UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 10485760;  // 10MB
const JWT_EXPIRE_TIME = 15 * 60;  // 15 minutes
const ROLES = { ELDERLY: 'elderly', CAREGIVER: 'caregiver' };
```

#### Regular Variables
```javascript
// camelCase
const elderlyId = req.params.id;
const driftScore = metrics.score;
let isLoading = false;
```

#### Objects & Complex Values
```javascript
// camelCase for properties
const user = {
  userId: '123',
  firstName: 'John',
  elderlyProfile: { ... }
};

const config = {
  databaseUri: '...',
  jwtSecret: '...'
};
```

### Functions & Methods

#### Regular Functions
```javascript
// camelCase, verb-first for actions
function validateEmail(email) { }
function calculateDistance(lat1, lng1, lat2, lng2) { }
function formatDate(date) { }
async function fetchUserData(userId) { }
```

#### Middleware
```javascript
// Descriptive of operation
function authenticationMiddleware(req, res, next) { }
function errorHandlerMiddleware(err, req, res, next) { }
function validateInputMiddleware(req, res, next) { }
```

#### Event Handlers (Frontend)
```javascript
// Handle[Event] or on[Event]
function handleSubmit(e) { }
function handleLogout() { }
function onMessageReceived(message) { }
function onClick() { }

// In JSX:
<button onClick={handleSubmit}>Submit</button>
<input onChange={handleInputChange} />
```

### Classes

#### Backend Controllers & Services
```javascript
// PascalCase, descriptive
class AuthController { }
class ChatbotService { }
class DriftAnalysisController { }

// Methods: camelCase, action-focused
class ChatbotService {
  async processMessage(userId, message) { }
  async analyzeConversation(conversationId) { }
}
```

#### Frontend Components
```javascript
// PascalCase
function ChatMessage({ message, sender }) { }
function VoiceInput({ onRecord }) { }
class Dashboard extends React.Component { }

// Props: camelCase
<ChatMessage 
  message={msg} 
  sender={'user'}
  timestamp={Date.now()}
/>
```

---

## Database Naming

### Collections
```
// lowercase, plural
db.users
db.conversations
db.cognitiveMetrics
db.riskEvents
db.geofences
db.locationHistory
db.caregiverRelationships
db.alerts
db.memories
db.doctorReports
db.auditLogs
```

### Field Names
```javascript
// camelCase
{
  _id: ObjectId,
  firstName: String,
  elderlyId: ObjectId,
  conversationId: ObjectId,
  driftScore: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Enums
```javascript
// UPPER_ENUM_VALUES
status: {
  type: String,
  enum: ['active', 'inactive', 'suspended'],
  default: 'active'
}

// Reference in code:
const STATUS_ACTIVE = 'active';
const STATUS_INACTIVE = 'inactive';
```

---

## API Routes

### RESTful Patterns

```
GET    /api/v1/[resource]                # List all
GET    /api/v1/[resource]/:id            # Get single
POST   /api/v1/[resource]                # Create
PUT    /api/v1/[resource]/:id            # Full update
PATCH  /api/v1/[resource]/:id            # Partial update
DELETE /api/v1/[resource]/:id            # Delete

// Nested resources
GET    /api/v1/elderly/:elderId/conversations     # Get elderly's conversations
GET    /api/v1/elderly/:elderId/metrics           # Get elderly's metrics
GET    /api/v1/caregiver/:caregiverId/alerts      # Get caregiver's alerts

// Custom actions (use verbs carefully)
POST   /api/v1/auth/login                # Special action
POST   /api/v1/auth/refresh              # Special action
POST   /api/v1/auth/logout               # Special action
POST   /api/v1/chatbot/messages          # Create message
GET    /api/v1/chatbot/conversations     # List conversations
POST   /api/v1/cognitive-engine/analyze  # Custom action
GET    /api/v1/geofence/status           # Get status
```

### Module-Specific Routes

```
/api/v1/auth/[action]
  - /login
  - /register
  - /refresh
  - /verify-email
  - /forgot-password
  - /reset-password

/api/v1/chatbot/[action]
  - /messages (POST send, GET history)
  - /conversations
  - /voice-input

/api/v1/cognitive-engine/[action]
  - /analyze
  - /metrics/:userId
  - /risks/:userId

/api/v1/geofence/[action]
  - /zones
  - /check-status
  - /breach-history

/api/v1/alerts/[action]
  - /acknowledge/:alertId
  - /history
  - /preferences

/api/v1/rag/[action]
  - /memories/:userId
  - /search
  - /context

/api/v1/dashboard/[action]
  - /stats/:userId
  - /trends
  - /risk-summary

/api/v1/doctor-reports/[action]
  - /generate
  - /history
  - /download/:reportId
```

---

## Environment Variables

### Naming Format
```
[SCOPE]_[FEATURE]_[DETAIL]=value

Examples:
JWT_SECRET
JWT_EXPIRE
JWT_REFRESH_SECRET

OPENAI_API_KEY
OPENAI_MODEL
OPENAI_EMBEDDINGS_MODEL

TELEGRAM_BOT_TOKEN
TELEGRAM_BOT_API_URL

GEOFENCE_DEFAULT_RADIUS_M
GEOFENCE_CHECK_INTERVAL_MS

CHATBOT_TEMPERATURE
CHATBOT_MAX_TOKENS
CHATBOT_SYSTEM_PROMPT

COGNITIVE_ENGINE_DRIFT_THRESHOLD
COGNITIVE_ENGINE_ALERT_ON_HIGH_DRIFT

RAG_CHUNK_SIZE
RAG_TOP_K_RESULTS

ALERT_TELEGRAM_ENABLED
ALERT_CRITICAL_COOLDOWN_MS

LOG_LEVEL
LOG_DIR
LOG_FILE_MAX_SIZE

DATABASE_URI
DATABASE_NAME

REDIS_HOST
REDIS_PORT

FEATURE_VOICE_ENABLED
FEATURE_RAG_ENABLED
```

---

## Git & Commit Conventions

### Branch Names
```
feature/[module]-[description]
  feature/auth-jwt-refresh
  feature/rag-vector-embeddings
  feature/chatbot-voice-processing

fix/[module]-[description]
  fix/auth-password-validation
  fix/cognitive-engine-drift-calculation

hotfix/[critical-issue]
  hotfix/memory-leak-socket-io

test/[test-purpose]
  test/auth-integration-tests

docs/[doc-update]
  docs/api-routes-update
```

### Commit Messages
```
Format: [type]: [message]

Types:
  feat:     New feature
  fix:      Bug fix
  refactor: Code restructuring
  docs:     Documentation
  test:     Tests
  chore:    Build, dependencies, config
  perf:     Performance improvement
  style:    Code style (formatting)

Examples:
  feat: implement JWT refresh token flow
  fix: validate email format in auth service
  refactor: split ChatbotService into smaller modules
  docs: add RAG architecture explanation
  test: add integration tests for geofence module
  perf: add caching for user profile queries
```

---

## Prefix Patterns

### Boolean Variables/Properties
```javascript
// is[Action], has[Feature], can[Action]
const isLoading = true;
const isVerified = user.isVerified;
const hasTokenExpired = checkExpiry(token);
const canAccessReports = user.permissions.canAccessReports;
```

### Error Handling
```javascript
// [Resource]Error class
class ValidationError extends Error { }
class NotFoundError extends Error { }
class AuthorizationError extends Error { }
class DatabaseError extends Error { }
```

### IDs & References
```javascript
// [Entity]Id format
const userId = req.user.id;
const conversationId = req.params.conversationId;
const metricId = metric._id;
const caregiverId = relationship.caregiverId;
```

---

## Special Conventions

### Deprecated Code
```javascript
// Mark clearly
/**
 * @deprecated Use newFunctionName instead
 * Will be removed in v2.0
 */
async function oldFunction() { }
```

### TODO Comments
```javascript
// TODO: Implement geolocation enrichment
// FIXME: Performance issue with large conversations
// HACK: Temporary solution for token validation
// NOTE: This depends on RAG module
```

### Private Methods/Properties
```javascript
// Use underscore prefix (convention)
class ChatbotService {
  async _loadMemories(userId) { }
  _validateInput(message) { }
}

// Or use # (modern JavaScript)
class ChatbotService {
  #loadMemories(userId) { }
  #validateInput(message) { }
}
```

---

**Last Updated**: February 28, 2026
