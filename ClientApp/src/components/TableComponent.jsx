import React from 'react'

const TableComponent = () => {
  return (
    <div className="overflow-x-auto w-full">
  <table className="table">
 
    <thead>
      <tr>
        <th></th>
        <th>Category Name</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>

   
      <tr className="hover">
        <th>1</th>
        <td>Electronics</td>
        <td>20%</td>
        <td className="w-0"><button className="btn btn-active">Edit</button></td>
        <td className="w-0"><button className="btn btn-active">Delete</button></td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default TableComponent