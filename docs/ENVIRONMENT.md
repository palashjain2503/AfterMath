# Environment Variables Configuration

## Backend (.env)

```env
# === APPLICATION ===
NODE_ENV=development
PORT=5004
API_VERSION=v1
APP_NAME=MindBridge

# === DATABASE ===
MONGODB_URI=mongodb://localhost:27017/mindbridge
MONGODB_DB_NAME=mindbridge

# === JWT AUTHENTICATION ===
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# === EXTERNAL APIS ===
## LLM / AI Services (choose one or multiple)
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
OPENAI_MODEL=gpt-4
# OR
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxx
GROQ_MODEL=mixtral-8x7b-32768
# OR
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxx
GEMINI_MODEL=gemini-pro

## OpenAI Embeddings (for RAG)
OPENAI_EMBEDDINGS_MODEL=text-embedding-3-small

## Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh
TELEGRAM_BOT_API_URL=https://api.telegram.org/bot

## Google Maps (optional, for geolocation enrichment)
GOOGLE_MAPS_API_KEY=AIzaSyxxxxxxxxxxxxxxxx

# === FILE STORAGE ===
# Local or S3
FILE_STORAGE_TYPE=local  # or 's3'
UPLOAD_DIR=./uploads
MAX_UPLOAD_SIZE=10485760  # 10MB in bytes

# AWS S3 (if using S3)
AWS_S3_BUCKET=mindbridge-uploads
AWS_S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# === LOGGING ===
LOG_LEVEL=debug  # debug, info, warn, error
LOG_DIR=./logs
LOG_FILE_MAX_SIZE=10m
LOG_FILES_MAX=5

# === SECURITY ===
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# === CORS ===
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
CORS_CREDENTIALS=true

# === EMAIL (optional for notifications)
MAIL_PROVIDER=sendgrid  # or 'nodemailer', 'aws-ses'
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
MAIL_FROM=noreply@mindbridge.app

# === REDIS (optional for caching & Socket.io)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=

# === SOCKET.IO ===
SOCKET_IO_ENABLED=true
SOCKET_IO_CORS_ORIGIN=http://localhost:5173

# === AI MODEL PARAMETERS ===
CHATBOT_TEMPERATURE=0.7
CHATBOT_MAX_TOKENS=500
CHATBOT_SYSTEM_PROMPT="You are MindBridge, a compassionate AI companion for elderly users..."

COGNITIVE_ENGINE_DRIFT_THRESHOLD=0.65  # 0-1 scale
COGNITIVE_ENGINE_ALERT_ON_HIGH_DRIFT=true

# === RAG CONFIGURATION ===
RAG_CHUNK_SIZE=500
RAG_CHUNK_OVERLAP=100
RAG_TOP_K_RESULTS=5
RAG_SIMILARITY_THRESHOLD=0.7

# === GEOFENCE ===
GEOFENCE_DEFAULT_RADIUS_M=500  # meters
GEOFENCE_CHECK_INTERVAL_MS=60000  # 1 minute

# === ALERT SETTINGS ===
ALERT_TELEGRAM_ENABLED=true
ALERT_EMAIL_ENABLED=false
ALERT_SMS_ENABLED=false
ALERT_CRITICAL_COOLDOWN_MS=300000  # 5 minutes (prevent alert spam)

# === DOCTOR REPORTS ===
DOCTOR_REPORT_EXPORT_FORMAT=pdf  # or 'json'
DOCTOR_REPORT_INCLUDE_CONVERSATIONS=false
DOCTOR_REPORT_INCLUDE_METRICS=true

# === FEATURE FLAGS ===
FEATURE_VOICE_ENABLED=true
FEATURE_RAG_ENABLED=true
FEATURE_GEOFENCE_ENABLED=true
FEATURE_COGNITIVE_ENGINE_ENABLED=true

# === DEVELOPMENT ONLY ===
DEBUG=mindbridge:*
SEED_DATABASE=false  # Auto-seed test data on startup
```

## Frontend (.env)

```env
# === APPLICATION ===
VITE_APP_NAME=MindBridge
VITE_API_BASE_URL=http://localhost:5004/api/v1
VITE_SOCKET_IO_URL=http://localhost:5004

# === EXTERNAL SERVICES ===
VITE_GOOGLE_MAPS_API_KEY=AIzaSyxxxxxxxxxxxxxxxx
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxx  # Only if frontend makes direct calls (not recommended)

# === FEATURE FLAGS ===
VITE_FEATURE_VOICE_ENABLED=true
VITE_FEATURE_GEOFENCE_ENABLED=true
VITE_FEATURE_GOOGLE_MAPS=true

# === UI/UX ===
VITE_THEME_DARK_MODE=false
VITE_LANGUAGE=en  # en, es, fr, etc.

# === ANALYTICS (optional) ===
VITE_ANALYTICS_ENABLED=false
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# === DEVELOPMENT ===
VITE_DEBUG=true
```

## Environment Variable Grouping Strategy

### By Feature
- **Auth**: `JWT_*`, `BCRYPT_ROUNDS`
- **Chatbot**: `CHATBOT_*`, `OPENAI_*`, `GROQ_*`, `GEMINI_*`
- **Cognitive Engine**: `COGNITIVE_ENGINE_*`
- **RAG**: `RAG_*`, `OPENAI_EMBEDDINGS_*`
- **Geofence**: `GEOFENCE_*`, `GOOGLE_MAPS_*`
- **Alerts**: `ALERT_*`, `TELEGRAM_*`, `MAIL_*`
- **Infrastructure**: `DATABASE_*`, `REDIS_*`, `LOG_*`

### By Scope
- **Global**: `NODE_ENV`, `PORT`, `APP_NAME`
- **External APIs**: `*_API_KEY`, `*_MODEL`
- **Feature Toggles**: `FEATURE_*`
- **Limits**: `*_RATE_LIMIT_*`, `*_MAX_*`

## Environment-Specific Overrides

### Development
```bash
NODE_ENV=development
LOG_LEVEL=debug
MONGODB_URI=mongodb://localhost:27017/mindbridge-dev
JWT_EXPIRE=24h  # Longer for convenience
RATE_LIMIT_MAX_REQUESTS=1000  # Relaxed
```

### Staging
```bash
NODE_ENV=staging
LOG_LEVEL=info
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mindbridge-staging
RATE_LIMIT_MAX_REQUESTS=500
```

### Production
```bash
NODE_ENV=production
LOG_LEVEL=warn
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mindbridge
JWT_EXPIRE=15m  # Strict
RATE_LIMIT_MAX_REQUESTS=100  # Conservative
CORS_ORIGIN=https://app.mindbridge.io
```

## Secure Practices

### ✅ DO's
- Use strong, random secrets (min 32 characters)
- Store secrets in `.env` (never commit)
- Use different secrets per environment
- Rotate secrets regularly
- Use environment-specific DB instances
- Log sensitive operations (without exposing secrets)

### ❌ DON'Ts
- Commit `.env` files to git
- Use weak or obvious secrets
- Share secrets via email/chat
- Log API keys or tokens
- Use production secrets in development
- Hardcode secrets in code

## Configuration File Loading Order

```javascript
// server/src/config/index.js
const defaultConfig = require('./default');
const envConfig = require(`./${process.env.NODE_ENV}`);
module.exports = { ...defaultConfig, ...envConfig };
```

## Validation at Startup

```javascript
// server/src/config/validation.js
const requiredEnvs = [
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'PORT',
  'OPENAI_API_KEY' // or other LLM
];

requiredEnvs.forEach(env => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});
```

---

**Last Updated**: February 28, 2026
