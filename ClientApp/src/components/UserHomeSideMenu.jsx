import React from 'react'
import UserHomeSideMenuComponent from './UserHomeSideMenuComponent'
import DashboardInnerContainer from '../layout/DashboardInnerContainer'
import Navbar from './Navbar'
import UserHomeAddProductComponent from './UserHomeAddProductComponent'

const UserHomeSideMenu = () => {
  return (
        <DashboardInnerContainer 
    
    SideMenu = {<UserHomeSideMenuComponent/>}
    Navbar = {<Navbar page="User"></Navbar>}

    />
  )
}

export default UserHomeSideMenu