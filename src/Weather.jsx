import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ latitude: 52.52, longitude: 13.41 });
  const [date, setDate] = useState("");

  const cities = [
    { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 }, 
    { name: "Berlin", latitude: 52.52, longitude: 13.41 },
    { name: "London", latitude: 51.51, longitude: -0.13 },
    { name: "Paris", latitude: 48.85, longitude: 2.35 },
    { name: "New York", latitude: 40.71, longitude: -74.01 },
    { name: "Tokyo", latitude: 35.68, longitude: 139.69 },
    { name: "Sydney", latitude: -33.87, longitude: 151.21 },
    { name: "Moscow", latitude: 55.75, longitude: 37.62 },
    { name: "Dubai", latitude: 25.28, longitude: 55.33 },
    { name: "Rio de Janeiro", latitude: -22.91, longitude: -43.18 },
    { name: "Ahmedabad", latitude: 23.0225, longitude: 72.5714 },
    { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
    { name: "Bhopal", latitude: 23.2599, longitude: 77.4126 },
    { name: "Chandigarh", latitude: 30.7333, longitude: 76.7794 },
    { name: "Chennai", latitude: 13.0827, longitude: 80.2707 },
    { name: "Coimbatore", latitude: 11.0168, longitude: 76.9558 },
    { name: "Delhi", latitude: 28.6139, longitude: 77.2090 },
    { name: "Goa", latitude: 15.2993, longitude: 74.1240 },
    { name: "Hyderabad", latitude: 17.3850, longitude: 78.4867 },
    { name: "Indore", latitude: 22.7196, longitude: 75.8577 },
    { name: "Jaipur", latitude: 26.9124, longitude: 75.7873 },
    { name: "Kochi", latitude: 9.9312, longitude: 76.2673 },
    { name: "Kolkata", latitude: 22.5726, longitude: 88.3639 },
    { name: "Lucknow", latitude: 26.8467, longitude: 80.9462 },
    { name: "Nagpur", latitude: 21.1458, longitude: 79.0882 },
    { name: "Pune", latitude: 18.5204, longitude: 73.8567 },
    { name: "Surat", latitude: 21.1702, longitude: 72.8311 },
    { name: "Thiruvananthapuram", latitude: 8.5241, longitude: 76.9366 },
    { name: "Visakhapatnam", latitude: 17.6868, longitude: 83.2185 }
  ];

  const getWeather = (event) => {
    event.preventDefault();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    axios.get(url)
      .then((res) => {
        setWeatherData(res.data);
        setDate(new Date().toLocaleDateString());  // Set the current date
      })
      .catch((err) => alert("Error fetching weather data: " + err));
  };

  const handleLocationChange = (event) => {
    const selectedCity = cities.find(city => city.name === event.target.value);
    setLocation({ latitude: selectedCity.latitude, longitude: selectedCity.longitude });
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <form onSubmit={getWeather}>
        <div className="form-group">
          <label htmlFor="city-select">Select City:</label>
          <select
            id="city-select"
            onChange={handleLocationChange}
          >
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Get Weather" />
        </div>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2>Current Weather</h2>
          <p>Date: {date}</p>
          <p>Temperature: {weatherData.current.temperature_2m}°C</p>
          <p>Wind Speed: {weatherData.current.wind_speed_10m} m/s</p>
          <h2>Hourly Forecast</h2>
          <div className="hourly-forecast">
            {weatherData.hourly.time.slice(0, 24).map((time, index) => (
              <div key={time} className="forecast-item">
                <p>Time: {new Date(time).toLocaleTimeString()}</p>
                <p>Temperature: {weatherData.hourly.temperature_2m[index]}°C</p>
                <p>Humidity: {weatherData.hourly.relative_humidity_2m[index]}%</p>
                <p>Wind Speed: {weatherData.hourly.wind_speed_10m[index]} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <footer>
        Created by <a href="https://github.com/ankithprojects" target="_blank" rel="noopener noreferrer">Ankith</a>
      </footer>
    </div>
  );
}
