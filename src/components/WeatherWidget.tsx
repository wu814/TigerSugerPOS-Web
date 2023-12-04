import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, CircularProgress, Button } from '@mui/material';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    id: number;
    icon: string;
  }[];
}

const WeatherWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const apiKey = '393f27956be75ccc19965c699b656795'; // API key
  const city = 'College Station'; // City

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
        );
        setTemperature(response.data.main.temp);
        setWeatherIcon(response.data.weather[0].icon);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey, city]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>View Weather🌤️</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {temperature !== null && weatherIcon ? (
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
                    alt="Weather Icon"
                  />
                  <p className="temperature">{temperature}°F</p>
                </div>
              ) : (
                <p className="loading">Error loading weather data</p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeatherWidget;
