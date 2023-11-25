import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
function UserHomeAddProductComponent(props) {



    const categoryUrl = "/api/products";

    const [data, setData] = useState([]);

    const [item, setItem] = useState({ productIdentifier: "", productName: "", rate: 0, tax: 0, price: 0, categoryIdentifier: "", categoryName: "", categoryTax: 0 })


    const [personName, setPersonName] = useState(null)

    const [submitBill, setSubmitBill] = useState(false);
    const [productList, setProductList] = useState([])

    useEffect(() => {
    }, [productList]);

    const fetchProducts = async () => {
        const res = await axios.get(categoryUrl);
        return setData(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleSelectProduct = (event) => {
        const productInput = event.currentTarget.getAttribute('product-data');
        const productInputJson = JSON.parse(productInput);


        console.log(productInputJson)

        setItem(prevItem => ({
            ...prevItem,
            productName: productInputJson.productName,
            productIdentifier: productInputJson.productIdentifier,
            rate: productInputJson.rate,
            tax: productInputJson.tax,
            price: productInputJson.price,
            categoryName: productInputJson.categoryName,
            categoryTax: productInputJson.categoryTax,
            categoryIdentifier: productInputJson.categoryIdentifier
        }));


    };

    const handleInputPersonsName = (event) => {
        setPersonName(prevName => (prevName, event.target.value));
    };



    const addSelectProduct = () => {

        setProductList(prevList => [...prevList, item]);
        setBillTotalPrice(prevItem => (prevItem + item.price))
        setbillTotalRate(prevItem => (prevItem + item.rate))
        setBillTotalTax(prevItem => (prevItem + item.tax))

    };


    useEffect(() => {
        props.productListChild(productList);
    }, [productList, props.productListChild]);





    const dropdown = data.map((product, index) => (
        <li key={index} onClick={handleSelectProduct} product-data={JSON.stringify(product)}><a>{product.productName}</a></li>
    ));


    const [billTotalPrice, setBillTotalPrice] = useState(0)
    const [billTotalTax, setBillTotalTax] = useState(0)
    const [billTotalRate, setbillTotalRate] = useState(0)



    const billUrl = "/api/bills"
    const handleSubmitBill = async () => {
        setSubmitBill(true);
        console.log(submitBill);
        const response = await axios.post(billUrl, {
            personName: personName,
            productList: productList,
            taxAmount: parseInt(billTotalTax),
            priceAmount: parseInt(billTotalRate),
            totalPrice: parseInt(billTotalPrice)

        });
        console.log('Bill Submitted successfully', response);
        setProductList([]);

    };

    useEffect(() => {
        console.log(submitBill)
    }, [submitBill]);




    return (

        <div className='flex row  mt-[20%] w-full items-center justify-center'>

            <div className='grid grid-cols-12 gap-24'>

                <div className="col-span-12 items-center justify-center">

                    <input value={item.personName} onChange={handleInputPersonsName} type="text" placeholder="Persons Name" className="input input-bordered w-full max-w-xs" />
                    <details className="flex dropdown w-[100%] mt-5">
                        <summary className="m-1 btn">{item.productName === "" ? "Select the Product" : item.productName}</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">

                            {dropdown}

                        </ul>
                    </details>
                    <br />
                    <button onClick={addSelectProduct} className="w-full btn btn-s btn-active flex">Add the Product</button>
                    <button onClick={handleSubmitBill} className="w-full btn btn-s btn-active flex mt-5">Submit Bill</button>
                </div>



                <div className="col-span-12">


                    <div className="flex stats shadow">
                        <div className="stat">
                            <div className="stat-title">Total Price</div>
                            <div className="stat-value">{billTotalPrice} Rs</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Total Rate</div>
                            <div className="stat-value">{billTotalRate} Rs</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Total Tax</div>
                            <div className="stat-value">{billTotalTax} Rs</div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default UserHomeAddProductComponent