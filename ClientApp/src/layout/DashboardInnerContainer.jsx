import React from 'react'

function DashboardInnerContainer(props){
  return (
    <div className="inline w-[20%] mt-[10%]">
    
  
    {props.SideMenu}
    {props.AddProduct}

    
    </div>
  )
}

export default DashboardInnerContainer