import React from 'react'
import MenuH from '../MenuH/MenuH.jsx'

const GeneralLayout = ({ children }) => {

  return (
    <div>
      <MenuH />
      {children}

    </div>
  )
}

export default GeneralLayout