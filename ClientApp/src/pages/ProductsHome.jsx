import React from 'react'
import Container from '../layout/Container'
import AdminHomeSideMenu from '../components/AdminHomeSideMenu'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

const ProductsHome = () => {
  return (
    <Container 
    Menubar={<AdminHomeSideMenu></AdminHomeSideMenu>} 
    Navbar = {<Navbar page="Products"></Navbar>}
    Section = {<Table page="Products"></Table>}
    />
  )
}

export default ProductsHome