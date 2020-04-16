import React, { useState } from 'react';
import wind from '../assets/wind.png';
import humidity from '../assets/humidity.png';
import temp from '../assets/temp.png';
import { usePosition } from '../consts/usePosition';
import { dateBuilder } from '../consts/dateBuilder';

export const Forecast = () => {

  const { latitude, longitude, error } = usePosition();

    // API Info
  const api = {
    key: '12713ce52420589c2732fa06b705ae93',
    base: 'https://api.openweathermap.org/data/2.5/'
  }
    
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [outUnit, setOutUnit] = useState('')
  const [windUnit, setWindUnit] = useState('')

    // Location finder
  const findUser = () => {

    fetch(`https://hendrik-cors-proxy.herokuapp.com/api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setOutUnit(unit === 'metric' ? '°C' : '°F');
        setWindUnit(unit === 'metric' ? 'M/S' : 'M/H' );

      });
    if(error != null) {
      alert('Enable geolocation');
    }
  }

    // Search function
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}forecast?q=${query}&units=${unit}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          setOutUnit(unit === "metric" ? '°C' : '°F');
          setWindUnit(unit === 'metric' ? 'M/S' : 'M/H');
        });
    }
      
  } 
  
  console.log(weather); // <--- Behövs denna?

  return (
    <div className="home">
      <main>
          {/* Search bar */}
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {/* Radio Buttons for C/F */}
        <div className="radioButtons">
          <input
            id="metricButton"
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
          <label htmlFor="metricButton">°C</label>
          <input
            id="imperialButton"
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
          <label htmlFor="imperialButton">°F</label>
        </div>
        {/* Button "Find current position" */}
        <button className="button" onClick={findUser}>Find Me</button>
        {(typeof weather.list != 'undefined') ? (

          <>
            <div className="location-box">
              <div className="location">{weather.city.name} {weather.city.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weatherWrapper">
              {weather.list.map(interval =>
                <div key={interval.dt_txt} className="card">
                  <p className="forecastItem">{interval.dt_txt.split(' ')[0].split(':')}</p>
                  <p className="forecastItem">{interval.dt_txt.split(' ')[1].split('-')}</p>
                  <img src={`http://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`} alt="weather-icon"></img>
                  <p className="forecastItem"><img src={temp} alt="temperature-icon" /> {Math.round(interval.main.temp)} {outUnit}</p>
                  <p className="forecastItem"><img src={humidity} alt="humidity-icon" /> {interval.main.humidity}%</p>
                  <p className="forecastItem"><img src={wind} alt="wind-icon" /> {interval.wind.speed} {windUnit}</p>
                </div>
              )}
            </div>
          </>

        ) : ('')}
      </main>
    </div>
  );
}
export default Forecast;
