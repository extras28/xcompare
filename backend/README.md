# Backend for excel-diff-checker

Handles Excel file uploads and comparison via REST API.

## Folders

-   src/controllers/: Request handling and main logic
-   src/services/: Excel comparison logic
-   src/utils/: Excel reading and diff utilities
-   src/routes/: API route definitions
-   uploads/: Temporary storage for uploaded Excel files

## Setup

1. Install dependencies: `npm install`
2. Start server: `node src/app.js` (or use nodemon)

## Environment

-   Configure `.env` for environment variables.
