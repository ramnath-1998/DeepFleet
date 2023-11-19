import React from 'react'

function Container(props){
  return (
    <div className="flex w-full justify-center items-start">
      
     {props.Navbar}
     {props.Menubar}
     {props.Section}
    </div>
  )
}

export default Container