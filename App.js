import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box, Container, Paper, Typography, Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';

// Planet component
const Planet = ({ position, color, size }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Solar System component
const SolarSystem = ({ planetPositions }) => {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Sun */}
      <Planet position={[0, 0, 0]} color="#ffd700" size={1} />
      
      {/* Planets */}
      {planetPositions.map((planet, index) => (
        <Planet
          key={planet.name}
          position={[
            Math.cos(planet.ra * Math.PI / 180) * planet.distance * 5,
            Math.sin(planet.dec * Math.PI / 180) * planet.distance * 5,
            Math.sin(planet.ra * Math.PI / 180) * planet.distance * 5
          ]}
          color={getPlanetColor(planet.name)}
          size={getPlanetSize(planet.name)}
        />
      ))}
      
      <OrbitControls />
    </Canvas>
  );
};

// Helper functions
const getPlanetColor = (name) => {
  const colors = {
    mercury: '#b5b5b5',
    venus: '#e6b800',
    mars: '#ff4d4d',
    jupiter: '#ffad33',
    saturn: '#ffd700',
    uranus: '#99ccff',
    neptune: '#4d94ff',
    pluto: '#999999'
  };
  return colors[name] || '#ffffff';
};

const getPlanetSize = (name) => {
  const sizes = {
    mercury: 0.2,
    venus: 0.4,
    mars: 0.3,
    jupiter: 0.8,
    saturn: 0.7,
    uranus: 0.5,
    neptune: 0.5,
    pluto: 0.2
  };
  return sizes[name] || 0.3;
};

function App() {
  const [planets, setPlanets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [planetPositions, setPlanetPositions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await axios.get('http://localhost:8000/planets');
      setPlanets(response.data.planets);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const fetchPlanetPositions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/positions/${selectedDate}`);
      setPlanetPositions(response.data.positions);
    } catch (error) {
      console.error('Error fetching planet positions:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanetPositions();
  }, [selectedDate]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Planetary Position Prediction System
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              onClick={fetchPlanetPositions}
              disabled={loading}
            >
              Update Positions
            </Button>
          </Box>
          
          <Box sx={{ height: '600px', width: '100%' }}>
            <SolarSystem planetPositions={planetPositions} />
          </Box>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Planet Information
          </Typography>
          {planetPositions.map((planet) => (
            <Box key={planet.name} sx={{ mb: 1 }}>
              <Typography>
                {planet.name.charAt(0).toUpperCase() + planet.name.slice(1)}:
                RA: {planet.ra.toFixed(2)}°, DEC: {planet.dec.toFixed(2)}°,
                Distance: {planet.distance.toFixed(2)} AU,
                Magnitude: {planet.magnitude.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 