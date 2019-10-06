import React, { useState, useEffect } from 'react';
import axios from 'axios'

import SearchField from "./components/SearchField"
import Countries from "./components/Countries"

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchField, setSearchField ] = useState('')
  const [ show, setShow ] = useState({})

  useEffect(() => {
    console.log("Effect: fetching country data")

    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        console.log("Promise fulfilled", response.data)
        setCountries(response.data)
      })
  }, [])
  console.log("Data from", countries.length, " countries fetched")

  const handleSearchFieldChange = (event) => {
    console.log("Search field change", event.target.value)
    setSearchField(event.target.value)
    setShow({})
  }

  const containsInsensitive = (word, target) => (
    word.toLowerCase().indexOf(target.toLowerCase()) !== -1 
  )
  const filteredCountries = countries.filter(country => containsInsensitive(country.name, searchField))

  return (
    <div>
      <h1>Country Information</h1>
      <SearchField value={searchField} onChange={handleSearchFieldChange} />
      <Countries countries={filteredCountries} show={show} setShow={setShow} />
    </div>
  )

}

export default App;
