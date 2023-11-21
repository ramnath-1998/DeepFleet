import React from 'react'
import Container from '../layout/Container'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import UserHomeSideMenu from '../components/UserHomeSideMenu'
const UserBillHome = () => {
  return (
    <Container 
    Menubar={<UserHomeSideMenu></UserHomeSideMenu>} 
    Navbar = {<Navbar page="User"></Navbar>}
    Section = {<Table page="UserBill"></Table>}
    />
  )
}

export default UserBillHome