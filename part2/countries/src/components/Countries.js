import React from 'react'

const CountryDetails = ({ name, capital, population, languages, flag}) => {
  const languageRows = () => languages.map(language => <li key={language.name}>{language.name}</li>)
  
  return (
    <div>
      <h2>{name}</h2>
      <div>Capital: {capital}</div>
      <div>Population: {population}</div>
      <h3>Languages</h3>
      <ul>
        {languageRows()}
      </ul>
      <p>
        <img src={flag} alt="Country flag" width="10%" />
      </p>
    </div>
  )
}

const Country = ({ country, show, setShow }) => {
  const onClick = () => {
    console.log("Clicked")
    let showCopy = {...show}
    showCopy[country.name] = country.name in show ? !show[country.name] : true
    setShow(showCopy)
  }

  if (country.name in show && show[country.name]) {
    return (
      <li>
        {country.name} <button onClick={onClick}>Show</button>
        <CountryDetails 
          name={country.name} 
          capital={country.capital} 
          population={country.population} 
          languages={country.languages} 
          flag={country.flag}/>  
      </li>
    )
  }
  return (<li>{country.name} <button onClick={onClick}>Show</button></li>)
}

const Countries = ({ countries, show, setShow }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length > 1) {
    const rows = () => countries.map(country => <Country key={country.name} country={country} show={show} setShow={setShow} />)
    return (
      <ul>{rows()}</ul>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <CountryDetails 
          name={country.name} 
          capital={country.capital} 
          population={country.population} 
          languages={country.languages} 
          flag={country.flag}/>
      </div>
    )

  } else {
    return <div>No countries matching the filter, specify another filter</div>
  }
}

export default Countries