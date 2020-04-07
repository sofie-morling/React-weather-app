import React, { useState, useEffect } from 'react';

export const Home = () => {
    
    const api = {
        key: '12713ce52420589c2732fa06b705ae93',
        base: 'https://api.openweathermap.org/data/2.5/'
      }
      

        const [query, setQuery] = useState('')
        const [weather, setWeather] = useState({})
        const [position, setPosition] = useState({})
        const [unit, setUnit] = useState('metric')
        const [outUnit, setOutUnit] = useState("")
      
        const findUser = evt => {
      
          if (evt) {
            navigator.geolocation.getCurrentPosition((position, error) => {
      
              setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
      
              if (error) {
                alert('Please accept geolocation to fetch your position');
              }
            })
          }
        }
      
        useEffect(() => {
          fetch(`https://hendrik-cors-proxy.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&units=${unit}&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
              setWeather(result)
              setOutUnit(unit === "metric" ? "°C" : "°F");
            });
        }, [position])
      
        // Weather search (location)
        const search = evt => {
          if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)
              .then(res => res.json())
              .then(result => {
                setWeather(result)
                setQuery('')
                setOutUnit(unit === "metric" ? "°C" : "°F");
              });
          }
        }
      
        // Date builder
        const dateBuilder = d => {
          let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
          let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ]
      
          let day = days[d.getDay()]
          let date = d.getDate()
          let month = months[d.getMonth()]
          let year = d.getFullYear()
      
          return `${day} ${date} ${month} ${year}`
        }

        const convertUnixToTime = (unix_time) => {
          let date = new Date(unix_time * 1000);
          let hours = date.getHours();
          let minutes = "0" + date.getMinutes();
          return hours + ':' + minutes.substr(-2);
        }
    
    
    return (
    
          <div className={
            // If search is undefined show "app" if search location is more then 16 degrees show "app warm" else show "app"
            (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main>
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
              <button onClick={e => findUser(position)}>Find Me</button>
              <div className="radioButtons">
                <label htmlFor="metricButton">°C</label>
                <input
                id="metricButton"
                type="radio"
                name="units"
                checked={unit === "metric"}
                value="metric"
                onChange={(e) => setUnit(e.target.value)}
                />
                <label htmlFor="imperialButton">°F</label>
                <input
                id="imperialButton"
                type="radio"
                name="units"
                checked={unit === "imperial"}
                value="imperial"
                onChange={(e) => setUnit(e.target.value)}
                />
                </div>
    
              {(typeof weather.main != 'undefined') ? (
                <div>
                  <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                  </div>
    
                  <div className="weather-box">
                    <div className="temp">
                      {Math.round(weather.main.temp)} {outUnit}

              </div>
    
                    <div className="weather">{weather.weather[0].main}</div>
    
                    <div className="wind-force">Wind Force:
                {Math.round(weather.wind.speed)} M/S
                </div>
    
                    <div className="humidity">Humidity:
                {Math.round(weather.main.humidity)}%
                </div>
    
                    <div className="sunrise">Sunrise:
                      {convertUnixToTime(weather.sys.sunrise)}
                    </div>
    
                    <div className="sunset">Sunset:
                      {convertUnixToTime(weather.sys.sunset)}
                    </div>
    
    
    
                  </div>
                </div>
              ) : ('')}
    
              
            </main>
          </div>
        
    );
}

export default Home;