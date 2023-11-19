import React from 'react'
import { Link } from 'react-router-dom'
const HomeComponent = () => {
  return (
    <div className="flex w-full justify-center items-center">
    <div className="flex w-[50%] mt-[10%]">
      <Link to="admin" className='grid h-20 flex-grow card bg-base-200 text-black rounded-box place-items-center'>Admin</Link>
      <div className="divider divider-horizontal">OR</div>
      <Link to="user" className='grid h-20 flex-grow card bg-base-200 text-black rounded-box place-items-center'>User</Link>
    </div>
  </div>
  )
}

export default HomeComponent