import React from 'react'
import Container from '../layout/Container'
import AdminHomeSideMenu from '../components/AdminHomeSideMenu'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

const AdminHome = () => {
  return (

    <Container 
    Menubar={<AdminHomeSideMenu></AdminHomeSideMenu>} 
    Navbar = {<Navbar></Navbar>}
    Table = {<Table></Table>}
    
    />
    )
  }
  
  export default AdminHome