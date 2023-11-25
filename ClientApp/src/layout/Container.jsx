import React from 'react'

function Container(props){
  return (
    <div className="flex w-full justify-center items-start h-[300px]">
      
     {props.Navbar}
     {props.Menubar}
     {props.Section}
    </div>
  )
}

export default Container