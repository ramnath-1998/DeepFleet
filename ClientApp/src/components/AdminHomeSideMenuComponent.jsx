import React from 'react'

const AdminHomeSideMenuComponent = () => {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box">        
    <li><a href='/admin'>Categories</a></li>
    <li><a href='/admin/products'>Products</a></li>
    <li><a href='/admin/bills'>Bills</a></li>
    </ul>
  )
}

export default AdminHomeSideMenuComponent