\# Activity Logger



\## Overview



Activity Logger is a lightweight full-stack application for recording running activities as part of a multi-year marathon training plan.



The user enters:



\* Distance in kilometers

\* Total running time in minutes



The backend validates the input, calculates the average pace, categorizes the activity, and persists the activity. The React frontend displays the activity history.



\### Core Flow



```text

Record → Calculate → Categorize → Save → Display

```



\## MVP Features



\* Record running distance in kilometers.

\* Record total running time in minutes.

\* Validate activity input.

\* Calculate average pace in minutes per kilometer.

\* Categorize each activity as:



&#x20; \* Zone 2

&#x20; \* Threshold

&#x20; \* Sprint

\* Persist activities in SQLite.

\* Display previously recorded activities.

\* Handle API and validation errors.

\* Provide automated backend tests.



\## Architecture



```text

React Frontend

&#x20;     |

&#x20;     | HTTP

&#x20;     v

Node.js / Express API

&#x20;     |

&#x20;     v

Activity Service

&#x20; |       |       |

&#x20; |       |       +--> Category calculation

&#x20; |       +----------> Pace calculation

&#x20; +------------------> Validation

&#x20;     |

&#x20;     v

Activity Repository

&#x20;     |

&#x20;     v

SQLite

```



\### Responsibilities



\* \*\*React frontend\*\* — collects user input and displays activity data.

\* \*\*Express API\*\* — handles HTTP requests and responses.

\* \*\*Activity Service\*\* — validates input and coordinates business logic.

\* \*\*Pace Calculator\*\* — calculates average pace and determines the activity category.

\* \*\*Activity Repository\*\* — handles persistence.

\* \*\*SQLite\*\* — stores activity history.



\## Technology Stack



\### Frontend



\* React

\* Vite

\* JavaScript

\* CSS



\### Backend



\* Node.js

\* Express

\* CORS

\* CommonJS modules



\### Persistence



\* SQLite

\* better-sqlite3



\### Testing



\* Jest

\* Supertest



\## Project Structure



```text

activity-logger/

├── backend/

│   ├── server.js

│   ├── src/

│   │   ├── activityRepository.js

│   │   ├── activityService.js

│   │   ├── app.js

│   │   ├── config.js

│   │   ├── database.js

│   │   └── paceCalculator.js

│   └── tests/

│       ├── activityApi.test.js

│       ├── activityService.test.js

│       └── paceCalculator.test.js

├── frontend/

│   ├── src/

│   ├── public/

│   ├── package.json

│   └── vite.config.js

├── docs/

│   ├── ADR-001-activity-logger-architecture.md

│   └── USER-STORY.md

├── README.md

└── setup.md

```



\## API



\### POST `/api/activities`



Creates and saves a new activity.



Request:



```json

{

&#x20; "distanceKm": 10,

&#x20; "totalTimeMinutes": 60

}

```



Successful response:



```json

{

&#x20; "id": 1,

&#x20; "distanceKm": 10,

&#x20; "totalTimeMinutes": 60,

&#x20; "averagePace": 6,

&#x20; "category": "Threshold",

&#x20; "createdAt": "2026-08-18T15:57:19.616Z"

}

```



\### GET `/api/activities`



Returns previously saved activities.



Example response:



```json

\[

&#x20; {

&#x20;   "id": 1,

&#x20;   "distanceKm": 10,

&#x20;   "totalTimeMinutes": 60,

&#x20;   "averagePace": 6,

&#x20;   "category": "Threshold",

&#x20;   "createdAt": "2026-08-18T15:57:19.616Z"

&#x20; }

]

```



\## Validation



The backend rejects:



\* Missing distance

\* Non-numeric distance

\* Zero distance

\* Negative distance

\* Missing total time

\* Non-numeric total time

\* Zero total time

\* Negative total time



The backend is the source of truth for validation and calculations.



\## Pace Calculation



Average pace is calculated using:



```text

average pace = total time in minutes / distance in kilometers

```



Example:



```text

10 km in 60 minutes



60 / 10 = 6 minutes per kilometer

```



\## Activity Categories



The application supports:



\* Zone 2

\* Threshold

\* Sprint



The category is determined by static pace thresholds in the backend.



The exact business threshold values are currently \*\*TBD (To Be Determined)\*\* because they were not specified in the original requirements. They should not be changed or treated as final business rules until confirmed.



\## Running the Application



Detailed setup and execution instructions are available in \[setup.md](setup.md).



The backend runs on:



```text

http://localhost:3000

```



The frontend runs on:



```text

http://localhost:5173

```



\## Testing



\### Backend Tests



From the backend directory:



```cmd

cd backend

npm test

```



The current test suite contains:



\* API tests

\* Activity service tests

\* Pace calculator tests



\### Frontend Production Build



From the frontend directory:



```cmd

cd frontend

npm run build

```



\## Persistence



Activity data is stored locally using SQLite.



The local database file is ignored by Git and is not committed to the repository.



\## Scope



This project intentionally focuses on the Activity Logger MVP.



Out-of-scope functionality includes:



\* User authentication

\* GPS tracking

\* Maps

\* Wearable integrations

\* Social features

\* Cloud deployment

\* Advanced dashboards

\* Editing or deleting activities



These can be considered future enhancements but are not required for the current MVP.



