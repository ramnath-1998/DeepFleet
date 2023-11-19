import React from 'react'
import Container from '../layout/Container'
import AdminHomeSideMenu from '../components/AdminHomeSideMenu'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

const ProductsHome = () => {
  return (
    <Container 
    Menubar={<AdminHomeSideMenu></AdminHomeSideMenu>} 
    Navbar = {<Navbar page="Product"></Navbar>}
    Section = {<Table page="Product"></Table>}
    />
  )
}

export default ProductsHome