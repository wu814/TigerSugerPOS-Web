import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<string | null>(null);
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
      }
    };

    fetchWeather();
  }, [apiKey, city]);

  return (
    <div className="weather-widget">
      {temperature !== null && weatherIcon ? (
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
            alt="Weather Icon"
          />
          <p className="temperature">{temperature}°F</p>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;