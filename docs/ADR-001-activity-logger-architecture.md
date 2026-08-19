# ADR-001: Activity Logger Architecture

## Status

Accepted

## Date

2026-08-18

---

## 1. Context

We need to build a lightweight Activity Logger for tracking running activities
as part of a multi-year marathon training plan.

The application must allow a user to:

- Enter distance in kilometers.
- Enter total time in minutes.
- Calculate average pace.
- Categorize the activity as Zone 2, Threshold, or Sprint.
- Persist the activity.
- View previously logged activities.

The project must be completed within a two-day implementation window.

The application consists of:

- A React frontend.
- A Node.js backend.
- Persistent storage.

---

## 2. Decision

We will use the following architecture:

React → Node.js/Express API → SQLite

### Frontend

React will be responsible for:

- Rendering the activity form.
- Collecting distance and total time.
- Sending requests to the backend.
- Displaying validation errors.
- Displaying previously logged activities.
- Displaying the calculated pace and category returned by the backend.

The frontend will not contain the business rules for pace calculation
or activity categorization.

### Backend

Node.js with Express will provide the REST API.

The backend will be responsible for:

- Validating incoming activity data.
- Calculating average pace.
- Determining the activity category.
- Persisting activities.
- Returning activity data to the frontend.

### Persistence

SQLite will be used as the database for the MVP.

SQLite was selected because:

- The application is lightweight.
- The application requires persistence.
- No separate database server is required.
- Local setup is simple.
- It is appropriate for the two-day implementation window.

---

## Pace Threshold Assumption

The original requirement specifies that activities must be categorized using static pace thresholds, but it does not provide the actual threshold values.

For the MVP, the following values are assumed:

| Average Pace | Category |
|---|---|
| >= 6.5 min/km | Zone 2 |
| >= 5.0 and < 6.5 min/km | Threshold |
| < 5.0 min/km | Sprint |

These values are MVP assumptions and are not intended to represent official marathon training zones.

The thresholds will be centralized in the backend application configuration. This allows developers to change the values in one location without changing the categorization algorithm or frontend.

Runtime/database-managed threshold configuration is intentionally out of scope for the MVP because the current requirement only specifies static thresholds.

## 3. High-Level Architecture

```text
┌─────────────────────┐
│                     │
│   React Frontend    │
│                     │
│  Activity Form      │
│  Activity List      │
│                     │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│                     │
│ Node.js + Express   │
│                     │
│ Routes              │
│ Controllers         │
│ Services            │
│ Repository          │
│                     │
└──────────┬──────────┘
           │
           │ SQL
           ▼
┌─────────────────────┐
│                     │
│       SQLite        │
│                     │
│     activities      │
│                     │
└─────────────────────┘


## 4. Consequences

### Positive

- The frontend remains focused on presentation.
- Business rules are centralized in the backend.
- Activities remain persisted after application restart.
- SQLite keeps local setup simple.
- Pace thresholds can be changed in one backend configuration file.

### Trade-offs

- The application requires both the frontend and backend to be running during development.
- SQLite is suitable for this MVP but may need to be replaced with a server-based database if the application later requires multiple users or higher-scale deployment.
- The pace thresholds are simplified MVP rules and are not personalized training zones.