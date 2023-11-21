import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import MainTable from './MainTable';

const TableComponentUserBills = () => {


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

    console.log(data)

    const handleSelectProduct = (event) => {

        const productSelect = event.currentTarget.getAttribute('product-data');
        const productSelectJson = productSelect ? JSON.parse(productSelect) : null;
        setItem(prevItem => ({
            ...prevItem,
            productName: productSelectJson.productName,
            productIdentifier: productSelectJson.productIdentifier,
            rate: productSelectJson.rate,
            categoryName: productSelectJson.categoryName,
            categoryTax: productSelectJson.categoryTax,
            categoryIdentifier: productSelectJson.categoryIdentifier
        }))
        console.log(item)
    };



    const dropdown = data && data.map((product, index) => (
        <li key={index} onClick={handleSelectProduct} product-data={JSON.stringify(product)}><a>{product.productName}</a></li>
    ));


    return (
        <div className="overflow-x-auto w-full">

            <MainTable></MainTable>
        </div >
    )
}

export default TableComponentUserBills