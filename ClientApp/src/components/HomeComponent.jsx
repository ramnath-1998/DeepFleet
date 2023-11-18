import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const HomeComponent = () => {
  return (
    <div className="flex w-full justify-center items-center">
    <div className="flex w-[50%] mt-[10%]">
      <div className="grid h-20 flex-grow card bg-base-200 text-black rounded-box place-items-center"><Link to="admin">Admin</Link></div>
      <div className="divider divider-horizontal">OR</div>
      <div className="grid h-20 flex-grow card bg-base-200 text-black rounded-box place-items-center"><Link to="user">User</Link></div>
    </div>
  </div>
  )
}

export default HomeComponent