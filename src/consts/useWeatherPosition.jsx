import { useState, useEffect } from 'react'

export function useWeatherPosition(latitude, longitude, unit, key, error) {
    const [weather, setWeather] = useState({})
    const [outUnit, setOutUnit] = useState('')
   

    useEffect(() => {
    if(weather === {}) {
    fetch(`https://hendrik-cors-proxy.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result)
            setOutUnit(unit === "metric" ? "°C" : "°F");
          });
        if(error != null) {
          alert('Enable geolocation');
        }
    }
    }, [weather, latitude, longitude, unit, key, error])

    

    return {weather, outUnit}

}

