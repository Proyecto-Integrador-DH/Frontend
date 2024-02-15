import React from 'react'
import './button.module.css'
const button = ({children, className}) => {
  return (
    <button className={className}>
        {children}
    </button>
  )
}

export default button