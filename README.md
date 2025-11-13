# Eurojackpot UI

## Description

Frontend application for managing Eurojackpot draws.

## Technologies Used

- ReactJS 18
- Material-UI (MUI) v7
- Vite

## Getting Started

### Prerequisites

- Node.js
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
Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
By default the application will be integrated with the backend running on port 8080.

### Docker setup (development mode)

```bash
    docker build -t --- .
```

```bash
    docker run -it --rm -p 5173:5173 ---
```
This runs the Vite development server inside Docker (npm run dev).
It is intended for local development, not for production deployment.
Backend is expected to be running on port 8080.