import React from 'react'

export default function Button({ children, className = "", ...props}) {
  return (
    <BsButton className={`my-btn ${className}`} {...props}>
      {children}
    </BsButton>
  )
}
