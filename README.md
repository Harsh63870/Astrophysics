# Planetary Position Prediction System

A modern web application for predicting and visualizing planetary positions in the solar system.

## Features

- Accurate planetary position calculations using VSOP87 model
- Interactive 3D visualization of the solar system
- Time-based simulation of planetary movements
- Multiple coordinate system views (RA/DEC, Alt/Az, Ecliptic)
- Real-time position updates and historical data
- Export functionality for research purposes

## Tech Stack

- Frontend: React.js with Three.js for 3D visualization
- Backend: Python FastAPI with Astropy for astronomical calculations
- Database: SQLite for caching planetary data
- APIs: NASA JPL Horizons integration

## Project Structure

```
planetary-system/
├── frontend/           # React frontend application
├── backend/           # FastAPI backend server
├── database/          # SQLite database files
└── docs/             # Documentation
```

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
5. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

## API Documentation

The API documentation will be available at `http://localhost:8000/docs` when the backend server is running.

## License

MIT License 