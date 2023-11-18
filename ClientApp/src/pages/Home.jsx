import { useState } from 'react'


function Home() {

  
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-[50%] mt-[10%]">
        <div className="grid h-20 flex-grow card bg-sky-500 text-white rounded-box place-items-center">Admin</div>
        <div className="divider divider-horizontal">OR</div>
        <div className="grid h-20 flex-grow card bg-sky-500 text-white rounded-box place-items-center">User</div>
      </div>
    </div>
    )
  }
  
  export default Home
  