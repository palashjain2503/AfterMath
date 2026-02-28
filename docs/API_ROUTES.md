# MindBridge API Routes Documentation

## Base URL
```
http://localhost:5004/api/v1
https://api.mindbridge.io/api/v1 (production)
```

## Authentication
All routes (except Auth) require JWT token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 1. Auth Module (`/api/v1/auth`)

**Developers**: Backend Dev 1
**Models**: User
**Services**: AuthService

### 1.1 Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "elderly",  // or "caregiver", "doctor"
  "phone": "+1234567890"
}

Response: 201
{
  "success": true,
  "message": "Registration successful",
  "user": { ... },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### 1.2 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200
{
  "success": true,
  "user": { ... },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### 1.3 Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token"
}

Response: 200
{
  "accessToken": "new_jwt_token"
}
```

### 1.4 Logout
```http
POST /auth/logout
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "message": "Logout successful"
}
```

### 1.5 Verify Email
```http
POST /auth/verify-email
Content-Type: application/json

{
  "token": "verification_token"
}

Response: 200
{
  "success": true,
  "message": "Email verified"
}
```

### 1.6 Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response: 200
{
  "success": true,
  "message": "Reset link sent to email"
}
```

### 1.7 Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "resetToken": "token",
  "newPassword": "NewPass456!"
}

Response: 200
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## 2. Chatbot Module (`/api/v1/chatbot`)

**Developers**: Backend Dev 2
**Models**: Conversation, User
**Services**: ChatbotService, RAGService, AIService

### 2.1 Send Message
```http
POST /chatbot/messages
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "conversationId": "conv_123",  // optional, create new if not provided
  "message": "How are you today?",
  "messageType": "text"  // or "voice"
}

Response: 200
{
  "success": true,
  "conversation": {
    "_id": "conv_123",
    "messages": [
      {
        "_id": "msg_1",
        "sender": "user",
        "content": "How are you today?",
        "timestamp": "2026-02-28T10:00:00Z"
      },
      {
        "_id": "msg_2",
        "sender": "bot",
        "content": "I'm doing well, thank you for asking!",
        "timestamp": "2026-02-28T10:00:02Z"
      }
    ]
  },
  "cognitiveMetrics": {
    "driftScore": 0.25,
    "driftCategory": "normal"
  }
}
```

### 2.2 Get Conversations (Paginated)
```http
GET /chatbot/conversations?page=1&limit=10
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "conversations": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### 2.3 Get Conversation Details
```http
GET /chatbot/conversations/:conversationId
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "conversation": {
    "_id": "conv_123",
    "elderlyId": "user_123",
    "messages": [ ... ],
    "topic": "family",
    "sentiment": "positive",
    "createdAt": "2026-02-28T10:00:00Z"
  }
}
```

### 2.4 Process Voice Input
```http
POST /chatbot/voice-input
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

Form Data:
- voiceFile: audio_file.wav
- conversationId: conv_123 (optional)

Response: 200
{
  "success": true,
  "transcript": "How are you doing today?",
  "message": { ... },  // Bot response
  "metrics": { ... }
}
```

### 2.5 Delete Conversation
```http
DELETE /chatbot/conversations/:conversationId
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "message": "Conversation deleted"
}
```

---

## 3. Cognitive Engine Module (`/api/v1/cognitive-engine`)

**Developers**: Backend Dev 2
**Models**: CognitiveMetric, RiskEvent, Conversation
**Services**: CognitiveEngineService

### 3.1 Analyze Conversation
```http
POST /cognitive-engine/analyze
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "conversationId": "conv_123"
}

Response: 200
{
  "success": true,
  "analysis": {
    "driftScore": 0.45,
    "driftCategory": "mild",
    "speechMetrics": {
      "clarity": 0.82,
      "speechRate": 120,
      "pauseLength": 2.3,
      "repeatPhrases": 3
    },
    "textMetrics": {
      "coherence": 0.78,
      "memoryGaps": 1,
      "confusionRate": 0.05
    },
    "anomalies": ["memory_gap", "repetition"],
    "recommendations": ["Consider memory support exercises"]
  },
  "riskEvent": null  // or risk event object if triggered
}
```

### 3.2 Get User Metrics (Paginated)
```http
GET /cognitive-engine/metrics/:userId?period=7d&page=1
Authorization: Bearer <JWT_TOKEN>

Query Params:
- period: "7d", "30d", "90d" (default: "30d")
- page: number (default: 1)
- limit: number (default: 20)

Response: 200
{
  "success": true,
  "metrics": [ ... ],
  "trends": {
    "driftScoreTrend": "increasing",
    "averageDriftScore": 0.35,
    "highRiskDays": 3
  },
  "pagination": { ... }
}
```

### 3.3 Get Risk Events
```http
GET /cognitive-engine/risks/:userId?status=open
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "riskEvents": [
    {
      "_id": "risk_1",
      "eventType": "high_drift_detected",
      "severity": 4,
      "description": "Significant cognitive decline detected",
      "status": "open",
      "createdAt": "2026-02-28T10:00:00Z"
    }
  ]
}
```

### 3.4 Acknowledge Risk Event
```http
PATCH /cognitive-engine/risks/:riskEventId/acknowledge
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "acknowledgmentNotes": "Called patient, seems fine"
}

Response: 200
{
  "success": true,
  "riskEvent": { ... }
}
```

---

## 4. RAG Module (`/api/v1/rag`)

**Developers**: Backend Dev 1
**Models**: Memory
**Services**: RAGService, AIService

### 4.1 Search Memories
```http
POST /rag/search
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "query": "Tell me about Alice",
  "topK": 5,
  "threshold": 0.7
}

Response: 200
{
  "success": true,
  "memories": [
    {
      "_id": "mem_1",
      "title": "Granddaughter Alice",
      "content": "Alice is studying medicine in Boston...",
      "relevanceScore": 0.95,
      "category": "family"
    }
  ],
  "context": "Formatted context for LLM injection"
}
```

### 4.2 Add Memory
```http
POST /rag/memories
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Granddaughter Alice",
  "content": "Alice is my granddaughter. She's studying medicine...",
  "category": "family",
  "importance": 10,
  "mentionedPeople": ["Alice"],
  "mentionedPlaces": ["Boston"]
}

Response: 201
{
  "success": true,
  "memory": { ... }
}
```

### 4.3 Get All Memories
```http
GET /rag/memories?category=family&page=1
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "memories": [ ... ],
  "pagination": { ... }
}
```

### 4.4 Update Memory
```http
PATCH /rag/memories/:memoryId
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "content": "Updated content...",
  "importance": 9,
  "notes": "Updated by caregiver"
}

Response: 200
{
  "success": true,
  "memory": { ... }
}
```

### 4.5 Delete Memory
```http
DELETE /rag/memories/:memoryId
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "message": "Memory deleted"
}
```

### 4.6 Verify Memory
```http
PATCH /rag/memories/:memoryId/verify
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "verified": true,
  "notes": "Confirmed by caregiver"
}

Response: 200
{
  "success": true,
  "memory": { ... }
}
```

---

## 5. Geofence Module (`/api/v1/geofence`)

**Developers**: Backend Dev 3 (or distributed)
**Models**: Geofence, LocationHistory
**Services**: GeofenceService

### 5.1 Create Geofence
```http
POST /geofence/zones
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Home",
  "description": "Primary residence",
  "center": {
    "coordinates": [-73.9352, 40.7306]  // [lng, lat]
  },
  "radiusMeters": 500,
  "alertOnExit": true,
  "alertOnEntry": false,
  "isPrimary": true
}

Response: 201
{
  "success": true,
  "geofence": { ... }
}
```

### 5.2 Get Geofences
```http
GET /geofence/zones
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "geofences": [ ... ]
}
```

### 5.3 Update Geofence
```http
PATCH /geofence/zones/:geofenceId
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "radiusMeters": 600,
  "alertOnExit": false
}

Response: 200
{
  "success": true,
  "geofence": { ... }
}
```

### 5.4 Check Current Status
```http
POST /geofence/check-status
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "latitude": 40.7306,
  "longitude": -73.9352,
  "accuracy": 10
}

Response: 200
{
  "success": true,
  "status": {
    "insideGeofences": ["home", "hospital"],
    "breachedGeofences": [],
    "nearestGeofence": {
      "name": "home",
      "distance": 150,
      "inZone": true
    }
  }
}
```

### 5.5 Get Breach History
```http
GET /geofence/breach-history?days=30
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "breaches": [
    {
      "geofenceName": "home",
      "exitTime": "2026-02-27T18:30:00Z",
      "entryTime": "2026-02-27T19:45:00Z",
      "duration": "1h 15m"
    }
  ]
}
```

### 5.6 Delete Geofence
```http
DELETE /geofence/zones/:geofenceId
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "message": "Geofence deleted"
}
```

---

## 6. Alerts Module (`/api/v1/alerts`)

**Developers**: Backend Dev 2
**Models**: Alert, RiskEvent
**Services**: AlertService, TelegramService

### 6.1 Get Alerts
```http
GET /alerts?status=unread&page=1
Authorization: Bearer <JWT_TOKEN>

Query Params:
- status: "unread", "read", "all" (default: "all")
- severity: 1-5
- type: alert type
- page: number

Response: 200
{
  "success": true,
  "alerts": [
    {
      "_id": "alert_1",
      "type": "high_drift_detected",
      "title": "Cognitive Decline Alert",
      "message": "High cognitive drift detected for patient",
      "severity": 4,
      "elderlyName": "John Doe",
      "createdAt": "2026-02-28T10:00:00Z",
      "readAt": null,
      "acknowledgedAt": null
    }
  ],
  "unreadCount": 3
}
```

### 6.2 Acknowledge Alert
```http
PATCH /alerts/:alertId/acknowledge
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "actionTaken": "called_elderly",
  "notes": "Patient seems fine, memory issue resolved"
}

Response: 200
{
  "success": true,
  "alert": { ... }
}
```

### 6.3 Mark as Read
```http
PATCH /alerts/:alertId/read
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "alert": { ... }
}
```

### 6.4 Get Alert Preferences
```http
GET /alerts/preferences
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "preferences": {
    "alertLevel": "high",  // "all", "high", "critical"
    "methods": ["telegram", "email"],
    "quietHours": {
      "enabled": true,
      "startHour": 22,
      "endHour": 7
    },
    "telegramEnabled": true,
    "emailEnabled": true
  }
}
```

### 6.5 Update Alert Preferences
```http
PATCH /alerts/preferences
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "alertLevel": "medium",
  "methods": ["telegram"]
}

Response: 200
{
  "success": true,
  "preferences": { ... }
}
```

---

## 7. Dashboard Module (`/api/v1/dashboard`)

**Developers**: Frontend Dev (with Backend support)
**Models**: CognitiveMetric, RiskEvent, Conversation
**Services**: DashboardService

### 7.1 Get Dashboard Summary
```http
GET /dashboard/summary/:patientId?period=30d
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "summary": {
    "patientName": "John Doe",
    "riskLevel": "medium",
    "averageDriftScore": 0.35,
    "trendDirection": "stable",
    "activAlerts": 2,
    "recentEvents": [ ... ],
    "activityFrequency": {
      "conversationsPerDay": 2.5,
      "trend": "increasing"
    }
  }
}
```

### 7.2 Get Detailed Metrics
```http
GET /dashboard/metrics/:patientId?period=7d
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "metrics": [
    {
      "date": "2026-02-28",
      "driftScore": 0.40,
      "conversationCount": 3,
      "emotionalState": "neutral",
      "anomalyDetected": false
    }
  ],
  "trends": {
    "driftTrend": "stable",
    "activityTrend": "increasing"
  }
}
```

### 7.3 Get Risk Summary
```http
GET /dashboard/risk-summary/:patientId
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "riskSummary": {
    "currentRiskScore": 0.45,
    "riskTrend": "increasing",
    "openIncidents": 2,
    "recentBreaches": 1,
    "highRiskDays": ["2026-02-27", "2026-02-28"],
    "recommendations": []
  }
}
```

### 7.4 Get Trend Analysis
```http
GET /dashboard/trends/:patientId?period=90d
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "trends": {
    "cognitive": { ... },
    "activity": { ... },
    "socialEngagement": { ... }
  }
}
```

---

## 8. Doctor Reports Module (`/api/v1/doctor-reports`)

**Developers**: Frontend Dev (with Backend support)
**Models**: DoctorReport
**Services**: ReportService

### 8.1 Generate Report
```http
POST /doctor-reports/generate
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "patientId": "elderly_123",
  "reportType": "summary",  // or "detailed", "weekly"
  "periodStart": "2026-01-28T00:00:00Z",
  "periodEnd": "2026-02-28T23:59:59Z",
  "includeConversations": false,
  "format": "pdf"  // or "json"
}

Response: 200
{
  "success": true,
  "report": {
    "_id": "report_1",
    "title": "Patient Summary - Feb 2026",
    "generatedAt": "2026-02-28T10:00:00Z",
    "downloadUrl": "/reports/report_1.pdf"
  }
}
```

### 8.2 Get Report History
```http
GET /doctor-reports?patientId=elderly_123&page=1
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "reports": [ ... ],
  "pagination": { ... }
}
```

### 8.3 Download Report
```http
GET /doctor-reports/:reportId/download
Authorization: Bearer <JWT_TOKEN>

Response: 200 (File - PDF or JSON)
```

### 8.4 Delete Report
```http
DELETE /doctor-reports/:reportId
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "message": "Report deleted"
}
```

---

## 9. User Management (`/api/v1/users`)

**Developers**: Backend Dev 1 or 2
**Models**: User, CaregiverRelationship
**Services**: UserService

### 9.1 Get Current User Profile
```http
GET /users/profile
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "user": { ... }
}
```

### 9.2 Update Profile
```http
PATCH /users/profile
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}

Response: 200
{
  "success": true,
  "user": { ... }
}
```

### 9.3 Change Password
```http
POST /users/change-password
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}

Response: 200
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 9.4 Get Caregiver Relationships (Elderly)
```http
GET /users/caregivers
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "caregivers": [ ... ]
}
```

### 9.5 Get Elderly Patients (Caregiver)
```http
GET /users/patients
Authorization: Bearer <JWT_TOKEN>

Response: 200
{
  "success": true,
  "patients": [
    {
      "_id": "elderly_1",
      "firstName": "Alice",
      "lastName": "Smith",
      "riskLevel": "high",
      "lastActivityAt": "2026-02-28T10:00:00Z"
    }
  ]
}
```

### 9.6 Invite Caregiver (Elderly)
```http
POST /users/invite-caregiver
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "email": "caregiver@example.com",
  "relationshipType": "adult_child"
}

Response: 201
{
  "success": true,
  "message": "Invitation sent",
  "relationship": { ... }
}
```

### 9.7 Accept Caregiver Invitation
```http
POST /users/accept-invitation/:invitationToken
Content-Type: application/json

Response: 200
{
  "success": true,
  "message": "Invitation accepted"
}
```

---

## Error Responses

All endpoints follow standard error format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "value": null
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `CONFLICT` (409)
- `INTERNAL_SERVER_ERROR` (500)

---

## Rate Limiting

```
Default: 100 requests per 15 minutes
Burst: 1000 requests per minute for premium accounts

Headers:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1614432000
```

---

## Pagination

Standard pagination for list endpoints:

```
?page=1&limit=20

Response includes:
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

**Last Updated**: February 28, 2026
