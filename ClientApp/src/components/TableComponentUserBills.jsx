import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import MainTable from './MainTable';
import UserHomeAddProductComponent from './UserHomeAddProductComponent';

const TableComponentUserBills = (props) => {


    const url = "/api/products";
    const [data, setData] = useState([]);
    const [item, setItem] = useState({ productIdentifier: "", productName: "", rate: 0, categoryIdentifier: "", categoryName: "", categoryTax: 0 })

    const [productList, setProductList] = useState([])

    const fetchProducts = async () => {
        const res = await axios.get(url);
        return setData(res.data);
    };



    useEffect(() => {

        fetchProducts();

    }, []);



    console.log(productList)

    const handleProductList = (data) => {

        setProductList(data);
    };

    const rows = productList && productList.map((product, index) => (
        <tr key={index} className='hover'>
            <td>{index + 1}</td>
            <td>{product.productName}</td>
            <td>{product.rate}</td>
            <td>{product.tax}</td>
            <td>{product.categoryTax}%</td>
            <td>{product.price}</td>
        </tr>

    ));





    return (
        <div className="h-full w-full">

            <MainTable rows={rows}></MainTable>

            <UserHomeAddProductComponent productListChild={handleProductList}></UserHomeAddProductComponent>
        </div >
    )
}

export default TableComponentUserBills