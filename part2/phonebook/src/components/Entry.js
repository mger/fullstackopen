import React from 'react'

const Entry = ({name, number, onClick}) => (
  <li>
    {name} {number}
    <button onClick={onClick}>delete</button>
  </li>
)

export default Entry