# MindBridge Setup & Development Guide

## Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **MongoDB**: 5.0 or higher (local or cloud)
- **Git**: 2.30+
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - MongoDB for VS Code
  - REST Client
  - Prettier
  - ESLint

### Optional Tools
- **Postman** or **REST Client** for API testing
- **MongoDB Compass** for database visualization
- **Docker** for containerization
- **ngrok** for Telegram webhook tunneling

---

## Backend Setup

### 1. Project Initialization

```bash
# Clone repository (if exists) or create new
cd mindbridge/server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit with your credentials
nano .env
```

### 2. Environment Configuration

**Create `.env` file in `server/` directory:**

```env
# === APPLICATION ===
NODE_ENV=development
PORT=5004
API_VERSION=v1
APP_NAME=MindBridge

# === DATABASE ===
MONGODB_URI=mongodb://localhost:27017/mindbridge
MONGODB_DB_NAME=mindbridge

# === JWT ===
JWT_SECRET=your-very-secret-key-min-32-characters-long-please
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters-long
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# === LLM PROVIDER (choose one)
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
OPENAI_MODEL=gpt-4
OPENAI_EMBEDDINGS_MODEL=text-embedding-3-small

# === TELEGRAM ===
TELEGRAM_BOT_TOKEN=123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh

# === FILE STORAGE ===
UPLOAD_DIR=./uploads
MAX_UPLOAD_SIZE=10485760

# === LOGGING ===
LOG_LEVEL=debug
LOG_DIR=./logs

# === CORS ===
CORS_ORIGIN=http://localhost:5173

# === REDIS (optional) ===
REDIS_ENABLED=false
REDIS_HOST=localhost
REDIS_PORT=6379

# === FEATURE FLAGS ===
FEATURE_VOICE_ENABLED=true
FEATURE_RAG_ENABLED=true
FEATURE_GEOFENCE_ENABLED=true
```

### 3. Install & Configure MongoDB

#### Option A: Local MongoDB
```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install -y mongodb
sudo service mongod start

# Windows (choco)
choco install mongodb

# Verify connection
mongosh
> show databases
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/mindbridge`
4. Add to `.env` as `MONGODB_URI`

### 4. Initialize Database (Optional)

Create `server/scripts/seedDb.js`:
```javascript
const mongoose = require('mongoose');
const User = require('../src/models/UserModel');

mongoose.connect(process.env.MONGODB_URI);

async function seedDatabase() {
  try {
    // Clear existing data (DEV ONLY)
    // await User.deleteMany({});

    // Create test elderly user
    await User.create({
      email: 'elderly@test.com',
      password: 'hashed_password',
      firstName: 'John',
      lastName: 'Doe',
      role: 'elderly',
      status: 'active'
    });

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
```

Run with: `node server/scripts/seedDb.js`

### 5. Start Development Server

```bash
# Install dependencies (if not done)
npm install

# Start server with nodemon
npm run dev

# Output:
# ✅ Server running on http://localhost:5004
# ✅ MongoDB connected
# ✅ Listening on port 5004
```

### 6. Verify Backend Setup

```bash
# Test health endpoint
curl http://localhost:5004/api/v1/health

# Response:
# { "status": "ok", "timestamp": "2026-02-28T10:00:00Z" }

# Test auth endpoint
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

## Frontend Setup

### 1. Project Initialization

```bash
cd mindbridge/client

# Install dependencies
npm install

# Copy environment
cp .env.example .env
```

### 2. Environment Configuration

**Create `.env` file in `client/` directory:**

```env
VITE_APP_NAME=MindBridge
VITE_API_BASE_URL=http://localhost:5004/api/v1
VITE_SOCKET_IO_URL=http://localhost:5004
VITE_FEATURE_VOICE_ENABLED=true
```

### 3. Start Development Server

```bash
# Install if needed
npm install

# Start Vite dev server
npm run dev

# Output:
# Local: http://localhost:5173/
# Press 'o' to open in browser
```

### 4. Verify Frontend Setup

1. Open browser to `http://localhost:5173`
2. Check browser console for errors
3. Network tab should show API calls to `http://localhost:5004`

---

## Full Stack Integration Test

### 1. User Registration Flow

```bash
# Terminal 1: Start backend
cd mindbridge/server
npm run dev

# Terminal 2: Start frontend
cd mindbridge/client
npm run dev

# Terminal 3: Test API
curl -X POST http://localhost:5004/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "elderly",
    "phone": "+1234567890"
  }'

# Response (201):
# {
#   "success": true,
#   "user": { ... },
#   "tokens": {
#     "accessToken": "eyJhbGciOiJIUzI1NiIs...",
#     "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
#   }
# }
```

### 2. Login & Get User

```bash
# Get access token from registration response, then:
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5004/api/v1/users/profile

# Should return user profile
```

### 3. Frontend Integration

1. Open browser to `http://localhost:5173/login`
2. Enter credentials: `john@example.com` / `SecurePass123!`
3. Should redirect to dashboard
4. Check localStorage for tokens: `localStorage.getItem('accessToken')`

---

## Development Workflow

### Code Structure After Running Commands

```
mindbridge/
├── server/
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── index.js        # Main entry point (runs here)
│   │   ├── config/
│   │   │   ├── index.js    # Config loader
│   │   │   ├── default.js
│   │   │   └── database.js
│   │   ├── middleware/
│   │   ├── models/
│   │   │   ├── UserModel.js
│   │   │   ├── ConversationModel.js
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── AIService.js
│   │   │   ├── TelegramService.js
│   │   │   └── ...
│   │   └── modules/
│   │       ├── auth/
│   │       ├── chatbot/
│   │       └── ...
│   ├── tests/
│   ├── logs/              # Created after first run
│   ├── uploads/           # Created after first upload
│   ├── package.json
│   ├── .env              # Create this
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── ...
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env              # Create this
│   └── .env.example
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_ROUTES.md
│   ├── DATABASE_SCHEMA.md
│   ├── ENVIRONMENT.md
│   ├── NAMING_CONVENTIONS.md
│   ├── TEAM_WORKFLOW.md
│   └── SETUP.md
│
├── README.md
├── .gitignore
└── docker-compose.yml (optional)
```

### Common npm Commands

**Backend**:
```bash
npm run dev           # Start development (nodemon)
npm start             # Start production
npm test              # Run tests
npm run lint          # Check code style
npm run seed          # Seed database
npm run migrations    # Run database migrations
```

**Frontend**:
```bash
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Check code style
npm run test          # Run tests
```

---

## Debugging Tips

### Backend Debugging

#### Using Node Inspector
```bash
# Terminal 1: Start with inspector
node --inspect=9229 server/src/index.js

# Terminal 2: Open Chrome DevTools
open chrome://inspect

# Click "Inspect" under the node process
```

#### Using VS Code Debugger

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "program": "${workspaceFolder}/server/src/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "envFile": "${workspaceFolder}/server/.env"
    }
  ]
}
```

Press `F5` to debug.

### Frontend Debugging

1. Open browser DevTools: `F12` or `Cmd+Option+I`
2. Components tab: Inspect React components
3. Network tab: Check API requests
4. Console: Check errors & warnings
5. Storage tab: Check localStorage (tokens), sessionStorage

### Common Issues & Solutions

#### "MongoDB connection failed"
```
✅ Solution:
1. Is MongoDB running? (mongosh should connect)
2. Is MONGODB_URI correct in .env?
3. If using Atlas, is IP whitelisted?
4. Is database name in URI?
```

#### "JWT validation failed"
```
✅ Solution:
1. Is JWT_SECRET in .env at least 32 chars?
2. Is token properly formatted: "Bearer <TOKEN>"?
3. Has token expired? (Check exp in decoded JWT)
4. Are both server & frontend using same secret?
```

#### "CORS errors"
```
✅ Solution:
1. Check CORS_ORIGIN in .env matches frontend URL
2. For localhost: should include both :3000 and :5173
3. Ensure frontend sends credentials: `credentials: 'include'`
4. Backend should have: `res.header('Access-Control-Allow-Credentials', 'true')`
```

#### "Module not found error"
```
✅ Solution:
1. Did you npm install?
2. Check import paths (case-sensitive on Linux/Mac)
3. Path should be relative to current file location
4. Use: ../../../services/AIService (not absolute paths)
```

---

## Testing

### Writing a Simple Test

Create `server/tests/unit/authService.test.js`:
```javascript
const { describe, it, expect, beforeEach } = require('@jest/globals');
const AuthService = require('../../src/modules/auth/services/AuthService');

describe('AuthService', () => {
  describe('hashPassword', () => {
    it('should hash password and return hashed value', async () => {
      const password = 'TestPass123!';
      const hashed = await AuthService.hashPassword(password);
      
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(20);
    });
  });
});
```

Run: `npm test`

### E2E Testing with Postman

1. Install Postman
2. Create collection "MindBridge"
3. Add requests for each endpoint
4. Set variables for token reuse
5. Create test scripts:

```javascript
// After login request
const response = pm.response.json();
pm.environment.set('accessToken', response.tokens.accessToken);

// Use in subsequent requests
Authorization: Bearer {{accessToken}}
```

---

## Performance Optimization

### Backend Optimization Checklist
- [ ] Enable Redis caching for frequent queries
- [ ] Add database indexes on frequently filtered fields
- [ ] Implement pagination for large datasets
- [ ] Compress responses with gzip
- [ ] Use clustering for CPU-bound operations
- [ ] Implement rate limiting
- [ ] Monitor memory usage with heapdumps

### Frontend Optimization Checklist
- [ ] Lazy load route components
- [ ] Code splitting in Vite build
- [ ] Cache API responses in Redux/Zustand
- [ ] Implement proper resource cleanup
- [ ] Use React.memo for expensive components
- [ ] Monitor bundle size
- [ ] Optimize images & assets

---

## Deployment Preparation

### Pre-Deployment Checklist
- [ ] All tests passing (`npm test`)
- [ ] Linting clean (`npm run lint`)
- [ ] No console.logs in code
- [ ] Environment variables properly set
- [ ] Database migrations reviewed
- [ ] API documentation updated
- [ ] CHANGELOG updated with version notes
- [ ] Git tags created

### Environment Files for Production
- Create `.env.production` with production values
- Never commit real credentials
- Use secret management (AWS Secrets Manager, etc.)
- Rotate keys regularly

### Docker Setup (Optional)

Create `Dockerfile.server`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 5004
CMD ["npm", "start"]
```

Build & run:
```bash
docker build -f Dockerfile.server -t mindbridge-server .
docker run -p 5004:5004 -e MONGODB_URI=mongodb://... mindbridge-server
```

---

## Useful Resources

### Documentation
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

### Tools
- [REST Client VS Code Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### Learning
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Patterns](https://patterns.dev/posts/provider-pattern)
- [MongoDB Design Patterns](https://www.mongodb.com/docs/manual/applications/data-models/)

---

## Getting Help

### Before Asking
1. Check [ARCHITECTURE.md](ARCHITECTURE.md) for design questions
2. Search [API_ROUTES.md](API_ROUTES.md) for endpoint specs
3. Review [NAMING_CONVENTIONS.md](NAMING_CONVENTIONS.md) for code style
4. Check console output for error messages

### When Asking
- Provide error message (full stack trace)
- Screenshot of issue
- Steps to reproduce
- What you've already tried
- Code snippet (if relevant)

### Escalation Path
1. **Quick questions**: Slack in #mindbridge-dev
2. **Code issues**: Create GitHub issue with label (bug, help-wanted)
3. **Design decisions**: Bring to team sync meeting
4. **Critical blockers**: Escalate to tech lead

---

**Last Updated**: February 28, 2026

Next steps: [ARCHITECTURE.md](ARCHITECTURE.md) → [API_ROUTES.md](API_ROUTES.md) → [TEAM_WORKFLOW.md](TEAM_WORKFLOW.md)
