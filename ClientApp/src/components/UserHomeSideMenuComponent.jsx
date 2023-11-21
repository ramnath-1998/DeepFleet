import React from 'react'

const UserHomeSideMenuComponent = () => {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box">        
    <li><a href='/user'>All Bills</a></li>
    <li><a href='/user/bill'>Create a New Bill</a></li>
    </ul>
  )
}

export default UserHomeSideMenuComponent