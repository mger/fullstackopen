import React from 'react'

const SearchField = ({ value, onChange }) => (
  <div>
    Find countries:
    <input value={value} onChange={onChange} />
  </div>
)

export default SearchField