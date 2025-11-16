# Eurojackpot UI

## Description

Frontend application for managing Eurojackpot draws.

## Technologies Used

- ReactJS 18
- Material-UI (MUI) v7
- Vite

## Getting Started

### Prerequisites

- Node.js (LTS Recomended)
- npm

### Local setup

1. In the root project directory, you can run:

```bash
  npm ci
```

Installs the required dependencies for the application based on the `package-lock.json` file.

2. Start the development server:
   ```bash
   npm run dev
   ```
   Runs the app in the development mode.
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
   By default the application will be integrated with the backend running on port 8080.

### Tests

Runs unit tests written with Vitest.
```bash
 npm run test
```

Runs component-level tests in UI mode.
```bash
 npm run test:ui
```


### Docker setup (development mode)
Build a Docker image:
```bash
    docker build -t eurojackpot-ui .
```
Run the container:
```bash
    docker run -it --rm -p 5173:5173 eurojackpot-ui
```

This runs the Vite development server inside Docker (npm run dev).
It is intended for local development, not for production deployment.
Application will be available at  [http://localhost:5173](http://localhost:5173)
Backend is expected to be running on port 8080.

## Architectural Decisions

### Client-side sorting

Sorting is made on the frontend using MUI’s built-in utilities.
For the scope and dataset size in this assignment, this approach is simple, efficient, and keeps the UI responsive.

In a prod application, sorting and pagination would typically be implemented on the backend to support larger datasets and reduce client-side load.

## React Query (TanStack)

React Query is used for simplifying state management and avoiding unnecessary reloads.

## Separation of concerns

The UI only handles presentation, local interactions, and sorting.
Filtering by date is delegated to the backend to ensure data correctness and consistent results.