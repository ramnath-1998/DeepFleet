import React from 'react'

const Navbar = () => {
  return (
      <div className="fixed w-[80%] justify-center items-center top-5">
        <div className="flex w-[80%]  navbar bg-base-100">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl">Admin Dashboard</a>
          </div>
          <div className="navbar-end">
            <a className="btn">Switch to User Account</a>
          </div>
        </div>
      </div>
  )
}

export default Navbar