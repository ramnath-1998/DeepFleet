import React from 'react'

function Container(props){
  return (
    <div className="flex w-full justify-center items-center">
      
     {props.Navbar}
     {props.Menubar}
     {props.Table}

    </div>
  )
}

export default Container