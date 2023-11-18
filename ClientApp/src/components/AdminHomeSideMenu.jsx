import React from 'react'
import DashboardInnerContainer from '../layout/DashboardInnerContainer'
import AdminHomeSideMenuComponent from './AdminHomeSideMenuComponent'
import Navbar from './Navbar'

const AdminHomeSideMenu = () => {
  return (

    <DashboardInnerContainer 
    
    SideMenu = {<AdminHomeSideMenuComponent></AdminHomeSideMenuComponent>}
    Navbar = {<Navbar></Navbar>}
    
    />

  )
}

export default AdminHomeSideMenu