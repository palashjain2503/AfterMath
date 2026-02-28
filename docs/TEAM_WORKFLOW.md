# MindBridge Team Collaboration Guide

## Team Structure

```
3 Developers:
├── Backend Dev 1: Auth + RAG (Modules)
├── Backend Dev 2: Chatbot + Cognitive Engine + Alerts
└── Backend Dev 3 (or Distributed): Geofence + Remaining Modules
```

---

## Module Ownership & Responsibilities

### Developer 1: Auth & RAG
**Modules**: `auth`, `rag`
**Routes**: `/api/v1/auth/*`, `/api/v1/rag/*`
**Primary Models**: User, Memory
**Shared Models**: Conversation

**Responsibilities**:
- JWT token generation & validation
- User registration, login, password reset
- Memory storage & vector embeddings
- Semantic search for RAG retrieval
- Memory verification workflow

**NOT responsible for**:
- Caregiver relationships (coordinate with user service)
- Alert generation (coordinate with alerts module)
- Report generation (coordinate with dashboard module)

**External Integrations**:
- OpenAI Embeddings API
- bcryptjs for password hashing

---

### Developer 2: Chatbot + Cognitive Engine + Alerts
**Modules**: `chatbot`, `cognitiveEngine`, `alerts`
**Routes**: `/api/v1/chatbot/*`, `/api/v1/cognitive-engine/*`, `/api/v1/alerts/*`
**Primary Models**: Conversation, CognitiveMetric, RiskEvent, Alert

**Responsibilities**:
- Voice & text message processing
- LLM integration (OpenAI/Groq/Gemini)
- Speech analysis (clarity, rate, pause patterns)
- Text analysis (coherence, memory gaps)
- Drift scoring algorithm
- Risk event detection & escalation
- Alert generation & routing
- Telegram bot integration

**NOT responsible for**:
- Memory storage (coordinate with RAG)
- User authentication (use Auth module)
- Geofence logic (separate module)
- Reports (coordinate with dashboard)

**External Integrations**:
- OpenAI/Groq/Gemini LLM APIs
- Telegram Bot API
- Web Speech API (frontend)

---

### Developer 3 / Distributed: Geofence + Dashboard + Doctor Reports + User Management
**Modules**: `geofence`, `dashboard`, `doctorReports`, `users`
**Routes**: `/api/v1/geofence/*`, `/api/v1/dashboard/*`, `/api/v1/doctor-reports/*`, `/api/v1/users/*`
**Primary Models**: Geofence, LocationHistory, DoctorReport, CaregiverRelationship

**Responsibilities**:
- Safe zone management & configuration
- Location tracking & geofence breach detection
- Dashboard aggregation & visualization data
- Trend analysis calculations
- Doctor report generation & export
- User profile management
- Caregiver relationship management
- Permission enforcement

**NOT responsible for**:
- Cognitive analysis (coordinate with cognitive engine)
- Alert dispatch (coordinate with alerts module)
- Memory management (coordinate with RAG)

**External Integrations**:
- Google Maps API (optional)
- File export (PDF generation)

---

## Shared Responsibilities

### Shared Models & Services
These are **never owned** by a single developer but maintained collectively:

**Shared Services** (`src/services/`):
- `AIService.js` - LLM calls (used by chatbot & RAG)
- `TelegramService.js` - Telegram bot (used by alerts)
- `FileService.js` - File uploads/downloads (used by multiple modules)
- `LoggerService.js` - Structured logging (used by all)
- `EmailService.js` - Email notifications (used by alerts, auth)
- `ValidationService.js` - Input validation (used by all)

**Shared Models** (`src/models/`):
- User & roles
- CaregiverRelationship
- Constants & enums

### Rules for Shared Components
1. **Never break existing interfaces** without team discussion
2. **Coordinate changes** via daily standup or PR review
3. **Backward compatible changes only** (add new params, don't rename)
4. **Document changes** in PR description
5. **Test integration** with dependent modules

---

## Coordination Points

### Daily Standup (15 min)
**When**: 10:00 AM
**What to discuss**:
- What you accomplished yesterday
- What you're working on today
- Any blockers or cross-module dependencies
- Planned commits/PRs

### Code Review Checklist
1. ✅ Follows naming conventions
2. ✅ No circular dependencies
3. ✅ Proper error handling
4. ✅ Tests included
5. ✅ No hardcoded values (use constants)
6. ✅ Logging at appropriate levels
7. ✅ No modification of other modules' files
8. ✅ Shared service contracts honored

### Merge Conflict Prevention Strategy

#### 1. **Separate File Ownership**
```
GOOD:
Developer 1: src/modules/auth/controllers/AuthController.js
Developer 2: src/modules/chatbot/controllers/ChatbotController.js
(Different files → no conflicts)

BAD:
Developers 1 & 2 both editing: src/services/AIService.js
(Same file → conflicts likely)
```

#### 2. **Shared File Policies**
If multiple developers must edit a shared file:
- **Lock the file** via discussion before editing
- **Coordinate via chat** (Discord/Slack)
- **Short editing windows** (complete changes in <4 hours)
- **Test integration** before pushing
- **Code review by affected developer** before merge

#### 3. **Model Changes**
When adding fields to shared models:
```javascript
// ✅ GOOD: Add optional field with default
userSchema.add({
  twoFactorSecret: { type: String, default: null }
});

// ❌ BAD: Remove or rename existing fields
// (breaks other modules using this field)
```

#### 4. **Service Method Signatures**
When modifying shared services:
```javascript
// ✅ GOOD: Add optional param with default
static async callLLM(prompt, { model = 'gpt-4', temperature = 0.7 } = {}) { }

// ❌ BAD: Change param order or type
// (breaks all callers)
```

#### 5. **Route Aggregation**
Never edit another developer's route file:
```
src/routes/index.js

// Each module routes itself:
const authRoutes = require('../modules/auth/routes');
const chatbotRoutes = require('../modules/chatbot/routes');
const geofenceRoutes = require('../modules/geofence/routes');

router.use('/auth', authRoutes);
router.use('/chatbot', chatbotRoutes);
router.use('/geofence', geofenceRoutes);
```

---

## Git Workflow

### Branch Naming
```
feature/[module]-[feature]
feature/auth-jwt-refresh
feature/chatbot-voice-input
feature/cognitive-engine-drift-v2

fix/[module]-[issue]
fix/auth-password-validation
fix/chatbot-memory-leak

hotfix/[critical]
hotfix/token-expiration-bug
```

### Commit Message Convention
```
Format: [type](module): description

Examples:
feat(auth): implement JWT token refresh endpoint
fix(chatbot): handle empty conversation edge case
refactor(cognitive-engine): split drift calculation logic
docs(rag): update memory embedding process
test(alerts): add telegram notification tests
perf(dashboard): optimize trend calculation with caching
```

### Pull Request Process

#### 1. Before Creating PR
```bash
# Update from main
git fetch origin
git rebase origin/main

# Ensure tests pass
npm test

# Check linting
npm run lint

# Verify no console.logs or debugger statements
npm run check:debug
```

#### 2. PR Title Format
```
[MODULE] Brief description

Examples:
[AUTH] Implement JWT refresh token endpoint
[CHATBOT] Add voice message processing
[COGNITIVE] Fix drift calculation edge case
```

#### 3. PR Description Template
```markdown
## Description
Brief explanation of changes

## Related Issue
Closes #123

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation

## Testing
How to test these changes:
1. ...
2. ...

## Checklist
- [ ] My code follows naming conventions
- [ ] I have tested with my module's models
- [ ] I have not modified other modules' files
- [ ] New dependencies added (if any)
- [ ] Documentation updated
- [ ] No circular dependencies introduced
```

#### 4. Code Review Requirements
- **Minimum 1 approval** from another developer
- **Developers should review cross-module changes**
- **Author must address all comments**
- **No self-merging** (at least one peer review)

#### 5. Merge Strategy
```bash
# Squash commits for cleaner history
git merge --squash feature/auth-jwt-refresh

# Or keep commits if feature is complex
git merge --no-ff feature/chatbot-voice-input

# Push to main
git push origin main
```

---

## Dependency Management

### When to Add a Package
1. ✅ **DO add** if it reduces code complexity (e.g., `axios` instead of `fetch`)
2. ✅ **DO add** if it's industry standard (e.g., `bcryptjs` for hashing)
3. ❌ **DON'T add** if you can implement simply (e.g., string utilities)
4. ❌ **DON'T add** duplicates (e.g., don't add `lodash` if using native Array methods)

### Adding Dependencies
1. **Coordinate with team** before adding
2. **Update package-lock.json**
3. **Document in PR** why it's needed
4. **Prefer smaller, focused packages** over large frameworks

---

## Database Schema Changes

### When Adding Fields
1. **Announce in standup** before implementation
2. **Add as optional** (default value) initially
3. **Create migration** if removing/renaming
4. **Update schema documentation** in DATABASE_SCHEMA.md
5. **Notify dependent modules** via PR

### Example: Adding Field
```javascript
// ✅ GOOD: Optional with default
const userSchema = new Schema({
  // existing fields...
  twoFactorSecret: {
    type: String,
    default: null,  // Don't break existing records
    required: false
  }
});

// Update DATABASE_SCHEMA.md
```

---

## Testing Strategy

### Test Organization
```
tests/
├── unit/
│   ├── modules/
│   │   ├── auth/
│   │   ├── chatbot/
│   │   └── ...
│   └── services/
│       └── AIService.test.js
├── integration/
│   ├── auth.integration.test.js
│   ├── chatbot.integration.test.js
│   └── ...
└── e2e/
    ├── authentication.e2e.test.js
    ├── userFlow.e2e.test.js
    └── ...
```

### Testing Responsibilities
1. **You write tests** for your module
2. **Unit tests** for services (min 80% coverage)
3. **Integration tests** for cross-module features
4. **Run tests** before PR (all tests must pass)

### Running Tests
```bash
# All tests
npm test

# Specific module
npm test -- auth

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## Release Process

### Versioning
```
MAJOR.MINOR.PATCH
v1.0.0

- MAJOR: Breaking changes (rare)
- MINOR: New features (weekly/biweekly)
- PATCH: Bug fixes (as needed)
```

### Release Checklist
1. ✅ All tests passing
2. ✅ Linting clean
3. ✅ No console.logs in production code
4. ✅ Environment variables documented
5. ✅ Database migrations tested
6. ✅ API documentation updated
7. ✅ Changelog entries written
8. ✅ Manual testing by team lead
9. ✅ Tag created: `git tag v1.0.0`
10. ✅ Deployment executed

---

## Conflict Resolution Examples

### Scenario 1: Shared Service Change
```
Dev 1 needs to add param to AIService.callLLM()
Dev 2 uses AIService.callLLM() in chatbot

SOLUTION:
1. Dev 1 announces in standup: "Adding temperature param to AIService"
2. Dev 1 makes param optional with default
3. Dev 1 creates PR targeting both modules
4. Dev 2 reviews before merge
5. Dev 2 updates chatbot to use new param if beneficial
```

### Scenario 2: Model Field Addition
```
Dev 2 wants to add urgencyLevel to CognitiveMetric
Dev 3 also needs metadata on CognitiveMetric

SOLUTION:
1. Dev 2 & Dev 3 discuss in Slack
2. Decide on shared schema that serves both
3. Dev 2 creates PR with both fields
4. Both review, then merge
```

### Scenario 3: Route Naming Conflict
```
Dev 1 wants: POST /api/v1/auth/tokens
Dev 2 wants: POST /api/v1/chatbot/tokens

SOLUTION:
Not a conflict! Different modules = different routes
Dev 1: /api/v1/auth/tokens (JWT management)
Dev 2: /api/v1/chatbot/tokens (session tokens)
```

---

## Communication Channels

### Async Communication (Slack)
- Daily updates
- Questions about implementations
- Code review requests
- General discussions

### Sync Communication (Video Call)
- **10 AM Standup** (15 min) - Daily
- **Weekly Tech Sync** (30 min) - Design reviews, architecture
- **PR Review Sessions** (30 min) - Before major merges
- **Ad-hoc pairing** - Complex features, debugging

---

## Troubleshooting Guide

### "I broke something in another module's code"
1. Immediately notify the responsible developer
2. Create a hotfix branch
3. Revert the breaking change
4. Create a new PR addressing the issue properly
5. Get explicit approval from affected developer

### "I have a merge conflict"
```bash
# Don't panic, follow these steps:
git fetch origin
git rebase origin/main

# If conflict occurs, look at the file:
# <<<<<<< HEAD (your changes)
# ======= (incoming changes)
# >>>>>>> branch-name

# Manually resolve (probably coordinate with other dev)
# Then:
git add .
git rebase --continue
git push origin feature/your-feature --force
```

### "I need to modify another module's code"
1. **STOP** - Don't edit their files directly
2. Check if you can use existing APIs/services
3. Open an issue or PR describing what you need
4. Work with the responsible developer to implement
5. Never sneak changes into other modules

### "I can't test my changes due to another module's code"
1. Create a **mock/stub** of the dependent module
2. Implement your code against the mock
3. Test integration once the dependency is ready
4. Update stubs after integration testing

---

## Best Practices Checklist

### Before Committing
- [ ] Code follows naming conventions
- [ ] No console.logs or debugger statements
- [ ] No hardcoded credentials or secrets
- [ ] Error handling implemented
- [ ] Logging appropriate
- [ ] Tests written & passing
- [ ] No import from other modules (except shared)
- [ ] Lint checking passes

### Before PR
- [ ] Branch rebased on latest main
- [ ] Commit messages are clear
- [ ] PR description is complete
- [ ] All tests pass locally
- [ ] No merge conflicts introduced
- [ ] Documentation (README, API docs) updated
- [ ] Third-party dependency additions justified

### Before Merge
- [ ] At least 1 approval
- [ ] All CI checks passing
- [ ] Conflicts resolved correctly
- [ ] Team aware of breaking changes (if any)
- [ ] Changelog updated

---

## Scalability & Handoff

### If New Developers Join
1. **Assign a mentor** from existing team
2. **Read ARCHITECTURE.md** thoroughly
3. **Start with simple features** in less critical modules
4. **Pair program** for first 2-3 weeks
5. **Gradually take ownership** of smaller modules

### Scaling to More Developers
When adding Developer 4+:
- Keep module ownership clear
- Redistribute responsibilities based on growth
- Consider splitting large modules
- Increased code review rigor
- More frequent syncs

---

**Last Updated**: February 28, 2026

See also: [ARCHITECTURE.md](ARCHITECTURE.md), [NAMING_CONVENTIONS.md](NAMING_CONVENTIONS.md), [API_ROUTES.md](API_ROUTES.md)
