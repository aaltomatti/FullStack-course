import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UserInput = (props) => {
  return(
    <div>
      find countries <input value= {props.country}
      onChange = {props.handleCountryChange}/>
    </div>
  )
}

const ShowCountryInfo = ({country}) => {
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
const FilterCountries = ({countries, country, setCountry}) => {
  const possibleCountries = countries.filter(subject => subject.name.includes(country))
  if (possibleCountries.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(possibleCountries.length<11 && possibleCountries.length>1) {
    return(possibleCountries.map(countryName =>
      <div key={countryName.numericCode}>{countryName.name}
      <button onClick={() => setCountry(countryName.name)}>show</button>
      </div>)
    )
  }
  else if (possibleCountries.length === 1){
    const desiredCountry = possibleCountries[0]
    return(
      <ShowCountryInfo country={desiredCountry}/>
    )
  }
  else{
    return(
      <div>
      </div>
      )
  }
}

function App() {
  const [ country, setCountry ] = useState('')
  const [ countries, setCountries] = useState([])

  useEffect(()=> {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }
  return (
    <div>
      <UserInput country={country} handleCountryChange = {handleCountryChange}/>
      <FilterCountries countries = {countries} country = {country} setCountry = {setCountry}/>
    </div>
  );
}

export default App;
