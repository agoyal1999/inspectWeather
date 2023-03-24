//const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "b7069f2996d1b5c6b0129718b699c844";

const express = require('express');
const https = require('https');
const port = 3001;
const app = express();
const cors = require('cors');

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
      token: 'token'
    });
  });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getCurrentWeather', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    let result;
    try {
        result = https.get(url, (response) => {
            response.on('data', (data) => {
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                res.send(weatherData);
            })
        })
    } catch (err) {
        console.error(`Connection failed; ${err.message}`);
    }
})

app.get('/getForecastWeather', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    let result;
    try {
        result = https.get(url, (response) => {
            response.on('data', (data) => {
                const forecastData = JSON.parse(data);
                console.log(forecastData);
                res.send(forecastData);
            })
        })
    } catch (err) {
        console.error(`Connection failed; ${err.message}`);
    }
    return result;
})

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})