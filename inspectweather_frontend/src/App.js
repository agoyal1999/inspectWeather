import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
//import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import ForecastWeather from './components/forecast-weather/forecast-weather';
import Login from './components/login/login'
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Token from './components/token/token'

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const { token, setToken } = Token();

  const hanleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(`${lat} ${lon}`)

    const currentWeatherFetch = fetch(
      `http://localhost:3001/getCurrentWeather?lat=${lat}&lon=${lon}`
    );
    const forecastWeatherFetch = fetch(
      `http://localhost:3001/getForecastWeather?lat=${lat}&lon=${lon}`
    );

    console.log(currentWeatherFetch);
    console.log(forecastWeatherFetch);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  console.log(currentWeather);
  console.log(forecastWeather);

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(
            <>
              <Search onSearchChange={hanleOnSearchChange} />
              {currentWeather && <CurrentWeather data={currentWeather} />}
              {forecastWeather && <ForecastWeather data={forecastWeather} />}
            </>
          )}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;