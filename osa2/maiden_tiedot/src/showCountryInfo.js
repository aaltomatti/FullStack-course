import axios from 'axios'
import React, {useEffect } from 'react'

const ShowCountryInfo = ({country,currentWeather,setCurrentWeather}) => {

    const api_key = process.env.REACT_APP_API_KEY
    console.log(country)
    var weather_icons = '';
    var weather_desc = [];
    var weather_temp = 0;
    var weather_wind_speed = 0;
    var weather_direction ='';

    useEffect(()=> {
      axios
        .get('http://api.weatherstack.com/current'.concat('?access_key=', api_key, '&query=', country.name))
        .then(response => {
          setCurrentWeather(response.data.current)
        })
    }, [])
    console.log(weather_desc[0])
    return(
      <div>
        <h1>{country.name}</h1>
        <div>
        capital {country.capital}
        </div>
        <div>
        population {country.population}
        </div>
        <h2>languages</h2>
        <div>
        {country.languages.map(language =>
          <li key={country.languages.indexOf(language)}>{language.name}</li>)}
        <img src={country.flag} alt="Country Flag" width="300" height="220"/>
        </div>
      </div>
    )
  }
  export default ShowCountryInfo;
