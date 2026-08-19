# Activity Logger — User Story

## 1. User Story

**As a marathon trainee,**

I want to record the distance and total time of each running activity,

so that I can track my training activities over a multi-year marathon training plan and understand the intensity category of each run.

---

## 2. Business Value

The Activity Logger provides a simple way for a marathon trainee to maintain a history of running activities.

For each activity, the system will:

- Record the distance in kilometers.
- Record the total time in minutes.
- Calculate the average pace.
- Categorize the activity as `Zone 2`, `Threshold`, or `Sprint`.
- Persist the activity.
- Display previously recorded activities.

This removes the need for the user to manually calculate pace and determine the training category for every activity.

### MVP Goal

The MVP focuses on:

**Record → Calculate → Categorize → Save → Display**

The application will not include features outside this scope.

---

## 3. Acceptance Criteria

### AC1 — Submit a valid activity

**Given** the user provides a valid distance and total time,

**When** the user submits the activity,

**Then** the system must:

1. Validate the submitted data.
2. Calculate the average pace.
3. Determine the activity category.
4. Save the activity.
5. Return the saved activity.
6. Display the activity in the activity history.

---

### AC2 — Calculate average pace

The system must calculate average pace using:

`average pace = total time in minutes / distance in kilometers`

For example:

- Distance: `10 km`
- Total time: `60 minutes`
- Average pace: `6 minutes/km`

The calculated pace must be performed by the backend.

---

### AC3 — Categorize the activity

The backend must categorize each valid activity as exactly one of:

- `Zone 2`
- `Threshold`
- `Sprint`

The category must be calculated by the backend using the following static pace thresholds:

| Average Pace | Category |
|---|---|
| `>= 6.5 min/km` | Zone 2 |
| `>= 5.0 and < 6.5 min/km` | Threshold |
| `< 5.0 min/km` | Sprint |

These thresholds are application-defined MVP rules. They provide a simple and consistent categorization mechanism for this application and are not intended to represent official or personalized physiological training zones.

---

### AC4 — Persist the activity

After a successful submission, the activity must be persisted so that it remains available after the application is restarted.

---

### AC5 — Display previous activities

The frontend must provide a list of previously logged activities.

Each activity should display at minimum:

- Distance
- Total time
- Average pace
- Category

---

### AC6 — Reject invalid distance

The system must reject a distance when:

- It is missing.
- It is not numeric.
- It is zero.
- It is negative.

The user must receive a meaningful validation error.

---

### AC7 — Reject invalid total time

The system must reject total time when:

- It is missing.
- It is not numeric.
- It is zero.
- It is negative.

The user must receive a meaningful validation error.

---

### AC8 — Prevent division by zero

The system must validate the distance before calculating pace.

A distance of zero must never reach the pace calculation logic.

---

### AC9 — Backend owns business logic

The frontend must send the raw activity information:

- Distance
- Total time

The backend is responsible for:

- Validation
- Pace calculation
- Category calculation
- Persistence

The frontend must not independently calculate or determine the activity category.

---

## 4. Bad Data / Validation Rules

| Input | Invalid condition | Expected behavior |
|---|---|---|
| Distance | Missing | Reject request |
| Distance | Non-numeric | Reject request |
| Distance | `0` | Reject request |
| Distance | Negative | Reject request |
| Total time | Missing | Reject request |
| Total time | Non-numeric | Reject request |
| Total time | `0` | Reject request |
| Total time | Negative | Reject request |

Invalid data must not be persisted.

Validation errors should be returned in a form that the frontend can display to the user.

---

## 5. Business Rules

### Pace Calculation

Average pace is calculated using:

`average pace = total time in minutes / distance in kilometers`

The calculation is performed by the backend.

### Pace Classification

The application uses the following static pace thresholds:

| Average Pace | Category |
|---|---|
| `>= 6.5 min/km` | Zone 2 |
| `>= 5.0 and < 6.5 min/km` | Threshold |
| `< 5.0 min/km` | Sprint |

The backend configuration contains these threshold values so that the categorization rules are centralized in one location.

The frontend does not contain these business rules.

These thresholds are simplified application-defined MVP rules and are not intended to represent official or personalized marathon training zones.

---

## 6. Assumptions

### Static Threshold Configuration

The requirement specifies that activity classification should use static pace thresholds but does not provide numerical values.

For this MVP, the product owner has defined the following application rules:

- `>= 6.5 min/km` → `Zone 2`
- `>= 5.0 and < 6.5 min/km` → `Threshold`
- `< 5.0 min/km` → `Sprint`

The thresholds are centralized in the backend application configuration so that developers can change them in one place without modifying the categorization algorithm or frontend.

Database-backed runtime configuration is not required for this MVP.

### Persistence

The application requires persistent storage for logged activities.

SQLite is used for the MVP because this is a lightweight application and the project has a short implementation timeframe.

---

## 7. Out of Scope

The following are not part of the MVP:

- User authentication
- Multiple user accounts
- Training-plan management
- Marathon race planning
- Charts and analytics
- GPS tracking
- Automatic activity tracking
- Heart-rate monitoring
- Wearable integrations
- Notifications
- Social features
- Cloud deployment
- Mobile application
- Editing activities
- Deleting activities