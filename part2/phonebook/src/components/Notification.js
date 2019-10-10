import React from 'react'

const Notification = ({ message, success }) => {
  if (message === null) { return null }

  const baseStyle = {
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notificationStyle = {
    ...baseStyle,
    color: 'green'
  }

  const errorStyle = {
    ...baseStyle,
    color: 'red'
  }

  return (
    <div style={success ? notificationStyle : errorStyle}>
      {message}  
    </div>
  )
}

export default Notification
