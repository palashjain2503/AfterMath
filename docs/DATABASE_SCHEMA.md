# MindBridge Database Schema

## Overview

MongoDB schema design for MindBridge. All collections use MongoDB ObjectId for `_id` and timestamps.

---

## Collections

### 1. **Users** (`users`)

Stores user accounts with role-based access.

```javascript
{
  _id: ObjectId,
  
  // Basic Info
  email: String (unique, required),
  password: String (hashed, bcrypt),
  firstName: String,
  lastName: String,
  phone: String,
  dateOfBirth: Date,
  
  // Role & Permissions
  role: Enum ["elderly", "caregiver", "doctor"],
  isVerified: Boolean,
  verificationToken: String (optional),
  
  // Elderly-Specific Fields
  // (null if role !== 'elderly')
  elderlyProfile: {
    medicalConditions: [String],  // "Alzheimer's", "Parkinson's", etc.
    medications: [String],
    emergencyContacts: [ObjectId],  // References to caregiver users
    caregiverRelationships: [{
      caregiverId: ObjectId (ref: users),
      role: String ("primary", "secondary", "family"),
      addedAt: Date
    }],
    riskLevel: Enum ["low", "medium", "high"],
    lastActivityAt: Date,
    locationEnabled: Boolean,
    lastKnownLocation: {
      coordinates: [Number],  // [lat, lng]
      accuracy: Number,
      timestamp: Date
    }
  },
  
  // Caregiver-Specific Fields
  caregiverProfile: {
    relation: String ("spouse", "adult_child", "professional", "other"),
    elderlyPatients: [ObjectId],  // References to elderly users
    canAccessReports: Boolean,
    canManageAlerts: Boolean,
    telegramChatId: Number (optional),  // For Telegram alerts
    notificationPreferences: {
      alertLevel: Enum ["all", "high", "critical"],
      methods: [Enum ["telegram", "email", "sms"]]
    }
  },
  
  // Doctor-Specific Fields
  doctorProfile: {
    licenseNumber: String,
    specialization: String,
    hospital: String,
    assignedPatients: [ObjectId],  // Elderly users
    canViewFullConversations: Boolean
  },
  
  // Account Management
  status: Enum ["active", "inactive", "suspended"],
  lastLoginAt: Date,
  loginAttempts: Number,
  lockedUntil: Date (optional),
  
  // Privacy & Security
  twoFactorEnabled: Boolean,
  twoFactorSecret: String (optional),
  
  createdAt: Date (auto),
  updatedAt: Date (auto),
  
  // Indexes
  // email (unique)
  // elderlyProfile.caregiverRelationships.caregiverId
  // caregiverProfile.elderlyPatients
  // doctorProfile.assignedPatients
}
```

---

### 2. **Conversations** (`conversations`)

Stores chat history between elderly and chatbot.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  
  // Content
  messages: [{
    _id: ObjectId,
    sender: Enum ["user", "bot"],
    content: String,
    voiceTranscript: String (optional),
    voiceUrl: String (optional),  // S3/local file path
    messageType: Enum ["text", "voice", "mixed"],
    embedding: [Number] (optional, for RAG),
    createdAt: Date
  }],
  
  // Context
  topic: String (optional),  // "family", "health", "current_events"
  ragContext: [{
    memoryId: ObjectId,
    relevanceScore: Number,
    usedAt: Date
  }],
  
  // Sentiment & Analysis
  sentiment: Enum ["positive", "neutral", "negative"],
  emotionalState: String,  // "happy", "anxious", "confused"
  
  // Status
  isActive: Boolean,
  endedAt: Date (optional),
  
  createdAt: Date (auto),
  updatedAt: Date (auto),
  
  // Indexes
  // elderlyId + createdAt (for quick pagination)
  // createdAt DESC (for latest conversations)
}
```

---

### 3. **Cognitive Metrics** (`cognitiveMetrics`)

Stores drift detection metrics (speech + text analysis).

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  conversationId: ObjectId (ref: conversations, optional),
  
  // Speech Metrics
  speechMetrics: {
    averagePauseLength: Number (seconds),
    speechRate: Number (words/minute),
    clarity: Number (0-1),  // Clarity score
    loweringPitch: Number (0-1),  // Speech pitch changes
    repeatPhrases: Number,  // Count of repeated phrases
    filler Words: Number,  // "um", "ah", etc.
    articulationQuality: Number (0-1)
  },
  
  // Text Metrics
  textMetrics: {
    wordCount: Number,
    vocabularyDiversity: Number (0-1),  // Type/token ratio
    sentenceComplexity: Number (0-1),
    memoryGaps: Number,  // Explicitly forgotten facts mentioned before
    confusionRate: Number (0-1),  // Rate of contradictions
    coherence: Number (0-1),  // Topic flow
    sentimentScore: Number (-1 to 1)
  },
  
  // Cognitive Analysis
  driftScore: Number (0-1),  // Main indicator
  driftCategory: Enum ["normal", "mild", "moderate", "severe"],
  anomalyDetected: Boolean,
  anomalyType: String (optional),  // "forgetting", "repetition", "incoherence"
  
  // Risk Assessment
  urgencyLevel: Enum ["low", "medium", "high", "critical"],
  shouldNotify: Boolean,
  triggeringFactors: [String],  // ["memory_gaps", "slow_speech_rate"]
  
  // Context
  analysisMethod: String,  // "speech", "text", "hybrid"
  modelVersion: String,  // "v1.0", "v1.1"
  confidence: Number (0-1),  // Confidence in drift assessment
  
  recordedAt: Date (required),
  createdAt: Date (auto),
  
  // Indexes
  // elderlyId + recordedAt DESC (for trend analysis)
  // driftScore DESC (for risk ranking)
}
```

---

### 4. **Risk Events** (`riskEvents`)

Stores triggered alerts and high-risk incidents.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  cognitiveMetricId: ObjectId (ref: cognitiveMetrics, optional),
  conversationId: ObjectId (ref: conversations, optional),
  
  // Event Details
  eventType: Enum [
    "high_drift_detected",
    "memory_gap_pattern",
    "speech_degradation",
    "geofence_breach",
    "missed_routine",
    "irregular_activity",
    "manual_caregiver_flag"
  ],
  severity: Number (1-5),  // 1=low, 5=critical
  description: String,
  
  // Supporting Data
  relatedMetrics: {
    metricType: String,
    value: Number,
    threshold: Number,
    deviation: Number
  },
  context: String,  // Additional context about why this was flagged
  
  // Escalation
  requiresEscalation: Boolean,
  escalatedToCaregiver: Boolean,
  escalationMethod: Enum ["telegram", "email", "sms", "phone"],
  escalatedAt: Date (optional),
  
  // Caregiver Response
  acknowledgedBy: ObjectId (ref: users, optional),
  acknowledgedAt: Date (optional),
  acknowledgmentNotes: String,
  status: Enum ["open", "acknowledged", "resolved", "false_positive"],
  
  // Resolution
  resolvedAt: Date (optional),
  resolutionNotes: String,
  actionTaken: String (optional),  // "contacted_doctor", "monitoring_increased"
  
  createdAt: Date (auto),
  updatedAt: Date (auto),
  
  // Indexes
  // elderlyId + createdAt DESC (for risk timeline)
  // severity DESC (for priority)
  // status (for open events)
}
```

---

### 5. **Geofence Settings** (`geofences`)

Stores safe zones and location-based alerts.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  
  // Geofence Definition
  name: String,  // "Home", "Hospital", "Community Center"
  description: String,
  
  // Coordinates
  center: {
    type: "Point",  // GeoJSON
    coordinates: [Number, Number]  // [lng, lat]
  },
  radiusMeters: Number,
  
  // Settings
  isActive: Boolean,
  isPrimary: Boolean,  // Primary home geofence
  alertOnExit: Boolean,
  alertOnEntry: Boolean,
  alertMethod: Enum ["telegram", "email", "sms"],
  
  // Time-based Restrictions (optional)
  timeBasedAlerts: {
    enabled: Boolean,
    safeHours: {
      startHour: Number (0-23),
      endHour: Number (0-23),
      daysOfWeek: [Number]  // 0-6, Monday=0
    }
  },
  
  // Caregiver Assignment
  assignedCaregivers: [ObjectId],  // Who gets notified
  
  // Audit
  createdAt: Date (auto),
  updatedAt: Date (auto),
  
  // Indexes
  // elderlyId
  // center (geospatial for proximity queries)
}
```

---

### 6. **Location History** (`locationHistory`)

Continuous GPS tracking for geofence system.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  
  // Location Data
  coordinates: {
    type: "Point",
    coordinates: [Number, Number]  // [lng, lat]
  },
  accuracy: Number (meters),
  
  // Geofence Status
  insideGeofences: [ObjectId],  // Which geofences contain this location
  breachedGeofences: [ObjectId],  // Which geofences were just exited
  
  // Device Info
  deviceId: String (optional),
  source: Enum ["gps", "wifi", "ip"],
  
  createdAt: Date (auto),
  
  // Indexes
  // elderlyId + createdAt DESC (quick location retrieval)
  // coordinates (geospatial, for proximity queries)
  // TTL: 30 days (auto-delete old records)
}
```

---

### 7. **Caregiver Relationships** (`caregiverRelationships`)

Defines and manages elderly-caregiver connections.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  caregiverId: ObjectId (ref: users, required),
  
  // Relationship Type
  relationshipType: Enum ["spouse", "adult_child", "friend", "professional"],
  role: Enum ["primary", "secondary", "family"],
  
  // Permissions
  permissions: {
    canViewConversations: Boolean,
    canViewMetrics: Boolean,
    canSetGeofences: Boolean,
    canManageAlerts: Boolean,
    canExportReports: Boolean,
    canInviteOtherCaregivers: Boolean,
    canRemoveRelationship: Boolean
  },
  
  // Status
  status: Enum ["active", "pending", "suspended", "archived"],
  invitationToken: String (optional, for pending),
  invitationExpires: Date (optional),
  
  // Activity Tracking
  lastAccessedAt: Date,
  acknowledgedAlertsCount: Number,
  
  // Notes
  notes: String,  // Caregiver-specific notes about the elderly person
  
  createdAt: Date (auto),
  updatedAt: Date (auto),
  
  // Indexes
  // elderlyId + role
  // caregiverId (for "my patients" view)
  // status
}
```

---

### 8. **Alerts & Notifications** (`alerts`)

Stores all generated alerts and notification logs.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  caregiverId: ObjectId (ref: users, required),
  riskEventId: ObjectId (ref: riskEvents, optional),
  
  // Alert Details
  type: String,  // "cognitive_drift", "geofence_breach", etc.
  title: String,
  message: String,
  severity: Number (1-5),
  
  // Telegram Integration
  telegramDelivered: Boolean,
  telegramMessageId: Number (optional),
  telegramError: String (optional),
  
  // Email Integration
  emailDelivered: Boolean,
  emailError: String (optional),
  
  // SMS Integration
  smsDelivered: Boolean,
  smsError: String (optional),
  
  // User Interaction
  readAt: Date (optional),
  acknowledgedAt: Date (optional),
  actionTakenAt: Date (optional),
  actionType: String (optional),  // "called_elderly", "visited", "informed_doctor"
  
  // Tracking
  deliveryAttempts: Number,
  lastAttemptAt: Date,
  
  // Deduplication (prevent alert spam)
  isDuplicate: Boolean,
  parentAlertId: ObjectId (optional),
  
  expiresAt: Date (auto-delete after 30 days),
  createdAt: Date (auto),
  
  // Indexes
  // caregiverId + createdAt DESC (for notification inbox)
  // elderlyId + type + createdAt (for alert history)
  // expiresAt (for TTL index)
}
```

---

### 9. **Memory & RAG Context** (`memories`)

Stores structured memories for RAG retrieval.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  sourceType: Enum ["conversation", "manual_entry", "caregiver_upload"],
  sourceId: ObjectId (optional),  // conversationId or fileId
  
  // Content
  title: String,
  content: String,
  summary: String,  // 2-3 sentence summary
  keywords: [String],  // "alice", "grandson", "hospital"
  
  // Category
  category: Enum ["family", "health", "history", "preferences", "current_events"],
  importance: Number (0-10),
  
  // Embedding for RAG
  embedding: [Number],  // 1536-dim OpenAI embedding
  
  // Metadata
  mentionedPeople: [String],  // Names of people mentioned
  mentionedPlaces: [String],  // Locations mentioned
  relatedMemories: [ObjectId],  // Cross-references to other memories
  
  // Status
  isVerified: Boolean,  // Caregiver confirmed?
  verifiedBy: ObjectId (optional),
  verifiedAt: Date (optional),
  notes: String,  // Caregiver notes
  
  createdAt: Date (auto),
  updatedAt: Date (auto),
  
  // Indexes
  // elderlyId + category
  // keywords (text search)
  // createdAt DESC
}
```

---

### 10. **Doctor Reports** (`doctorReports`)

Stores generated reports for doctors.

```javascript
{
  _id: ObjectId,
  
  // Relationship
  elderlyId: ObjectId (ref: users, required),
  doctorId: ObjectId (ref: users, required),
  caregiverId: ObjectId (ref: users, optional),  // Who requested
  
  // Report Details
  title: String,
  reportType: Enum ["summary", "detailed", "weekly", "monthly", "custom"],
  
  // Date Range
  periodStart: Date,
  periodEnd: Date,
  
  // Content Sections
  cognitiveAnalysis: {
    averageDriftScore: Number,
    driftTrend: String,  // "improving", "stable", "declining"
    significantEvents: [Object],  // High-risk events summary
    recommendations: [String]
  },
  
  medicationInteractions: [String],
  activityPatterns: String,  // Summary of daily patterns
  socialEngagement: String,  // Frequency & quality of conversations
  emergencyEvents: [Object],
  
  // Statistics
  totalConversations: Number,
  averageSessionDuration: Number (minutes),
  activityFrequency: Number (interactions/day),
  
  // Attachments
  attachments: [{
    filename: String,
    fileType: String,  // "pdf", "csv"
    fileUrl: String,
    uploadedAt: Date
  }],
  
  // Access Control
  accessLevel: Enum ["doctor_only", "patient_caregiver", "full_medical_team"],
  
  // Status
  generatedAt: Date,
  expiresAt: Date,  // Auto-delete after ~90 days
  
  createdAt: Date (auto),
  
  // Indexes
  // elderlyId + doctorId
  // doctorId (for doctor's patient reports)
}
```

---

### 11. **Audit Logs** (`auditLogs`)

Records all significant actions for compliance.

```javascript
{
  _id: ObjectId,
  
  // Action Details
  action: String,  // "user_login", "metrics_viewed", "report_exported"
  resourceType: String,  // "user", "conversation", "report"
  resourceId: ObjectId (optional),
  
  // Actor
  actorId: ObjectId (optional),  // Who performed the action
  actorRole: String,
  
  // Changes
  oldValues: Object (optional),
  newValues: Object (optional),
  
  // Context
  ipAddress: String,
  userAgent: String,
  status: Enum ["success", "failure"],
  errorMessage: String (optional),
  
  createdAt: Date (auto),
  
  // Indexes
  // actorId + createdAt
  // resourceId + resourceType
  // createdAt (for log rotation)
  // TTL: 2 years
}
```

---

## Indexing Strategy

### High Priority (Frequently Queried)
```javascript
// users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });

// conversations
db.conversations.createIndex({ elderlyId: 1, createdAt: -1 });

// cognitiveMetrics
db.cognitiveMetrics.createIndex({ elderlyId: 1, recordedAt: -1 });
db.cognitiveMetrics.createIndex({ driftScore: -1 });

// riskEvents
db.riskEvents.createIndex({ elderlyId: 1, createdAt: -1 });
db.riskEvents.createIndex({ status: 1 });

// geofences
db.geofences.createIndex({ elderlyId: 1 });
db.geofences.createIndex({ "center": "2dsphere" });  // Geospatial

// locationHistory
db.locationHistory.createIndex({ elderlyId: 1, createdAt: -1 });
db.locationHistory.createIndex({ "coordinates": "2dsphere" });

// alerts
db.alerts.createIndex({ caregiverId: 1, createdAt: -1 });
db.alerts.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });  // TTL

// memories
db.memories.createIndex({ elderlyId: 1, category: 1 });
db.memories.createIndex({ keywords: "text" });
```

---

## Data Relationships (ERD Summary)

```
Users (1) ─── (many) Conversations
           ┗─────────── (many) CognitiveMetrics
           ┗─────────── (many) RiskEvents
           ┗─────────── (many) Geofences
           ┗─────────── (many) LocationHistory
           ┗─────────── (many) Memories

CaregiverRelationships:
  Elderly (1) ─── (many) Caregivers

Conversations (1) ─── (many) CognitiveMetrics (via conversationId)
RiskEvents (1) ─── (many) Alerts
```

---

## Data Retention & Archival

```javascript
// Short-term (auto-delete)
locationHistory: 30 days
alerts: 30 days

// Medium-term
conversations: 2 years
cognitiveMetrics: 3 years

// Long-term
riskEvents: Indefinite
doctorReports: 7 years (medical compliance)
auditLogs: 2 years
```

---

**Last Updated**: February 28, 2026
