import React from 'react'
import TableComponentCategories from './TableComponentCategories'
import TableComponentProducts from './TableComponentProducts'

function Table(props) {
  const item = props.page
  if(item  === "Categories") {
    return (<div className="flex w-[70%] mt-[10%] items-center">
      <TableComponentCategories />
    </div>)
  }
  return (<div className="flex w-[70%] mt-[10%] items-center"><TableComponentProducts></TableComponentProducts></div>)
}

export default Table