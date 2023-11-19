import React from 'react'
import Container from '../layout/Container'
import AdminHomeSideMenu from '../components/AdminHomeSideMenu'
import Navbar from '../components/Navbar'
import BillsSection from '../components/BillsSection'

const BillsHome = () => {
  return (
    <Container 
        Menubar={<AdminHomeSideMenu></AdminHomeSideMenu>} 
        Navbar = {<Navbar page="Product"></Navbar>}
        Section = {<BillsSection/>}
    />
  )
}

export default BillsHome