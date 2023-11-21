import React from 'react'

function MainTable(props) {

    if (props.page === "Bill") {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th className='w-[3%]'>Sl.No</th>
                        <th className='w-[20%]'>Product Name</th>
                        <th className='w-[8%]'>Rate</th>
                        <th className='w-[8%]'>Tax</th>
                        <th className='w-[8%]'>Price</th>
                        <th className='w-[20%]'>Category Name</th>
                        <th className='w-[8%]'>Category Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
        )
    }
    else if (props.page === "Categories") {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Category Name</th>
                        <th>Tax Rate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
        )
    } else{
        
        return (
            <table className="flex table">
                <thead>
                    <tr>
                        <th className='w-[3%]'>Sl.No</th>
                        <th className='w-[20%]'>Product Name</th>
                        <th className='w-[8%]'>Rate</th>
                        <th className='w-[8%]'>Tax</th>
                        <th className='w-[8%]'>Price</th>
                        <th className='w-[20%]'>Category Name</th>
                        <th className='w-[8%]'>Category Tax</th>
                        <th className='w-[10%]'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
        )
    }
}

export default MainTable