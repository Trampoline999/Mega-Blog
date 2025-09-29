import React from 'react'

export const Button = ({children ,type= "Button",bgColor='bg-blue-600',textColor='text-white',className='',...props}) => {
  return (
    <button className={`px4 py-2 rounded-lg ${className} ${bgColor} ${type} ${textColor}`} {...props }>
        {children}
    </button>
  )
}
