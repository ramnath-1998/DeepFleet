import React from 'react'
import TableComponentCategories from './TableComponentCategories'
import TableComponentProducts from './TableComponentProducts'
import TableComponentBills from './TableComponentBills'

function Table(props) {
  const item = props.page
  if (item === "Categories") {
    return (<div className="flex w-[70%] mt-[10%] items-center">
      <TableComponentCategories />
    </div>)
  }
  else if (item === "Products") {
    return (
      <div className="flex w-[70%] mt-[10%] items-center">
        <TableComponentProducts></TableComponentProducts>
      </div>
    )
  }

  else if (item === "Bills") {
    return (
      <div className="flex w-[90%] items-center">
        <TableComponentBills></TableComponentBills>
      </div>
    )
  }

  else {
    return (
      <div className="flex w-[70%] mt-[10%] items-center">
        <TableComponentCategories />
      </div>
    )
  }
}

export default Table