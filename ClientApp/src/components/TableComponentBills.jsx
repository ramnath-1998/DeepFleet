import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import MainTable from './MainTable';

const TableComponentBills = () => {




    const url = "/api/bills";
    const [data, setData] = useState([]);

    const fetchBills = () => {
        return axios.get(url).then((res) => setData(res.data));
    };

    useEffect(() => {
        fetchBills();
    }, []);


    const [item, setItem] = useState({ billIdentifier: '', personName: '', totalPrice: '', taxAmount: '', productList: [], priceAmount: 0, billCreatedOn: "" })

    const setItemAndDisplayPopup = (event) => {

        const popupName = event.currentTarget.getAttribute('popup-name')

        if (popupName === "edit") {
            document.getElementById('edit_bill_modal').showModal();
            const item = event.currentTarget.getAttribute('data-item')
            const itemJson = JSON.parse(item);

            setItem(prevItem => ({
                ...prevItem,

                billIdentifier: itemJson.billIdentifier,
                personName: itemJson.personName,
                priceAmount: parseInt(itemJson.priceAmount),
                productList: itemJson.productList,
                taxAmount: itemJson.taxAmount,
                totalPrice: parseInt(itemJson.totalPrice)
            }))
        }
        else if (popupName === "delete") {
            document.getElementById('confirm_bill_delete_modal').showModal();
            const item = event.currentTarget.getAttribute('data-item')
            const itemJson = JSON.parse(item);
            console.log(itemJson) 
            setItem(prevItem => ({
                ...prevItem,
                billIdentifier: itemJson.billIdentifier,
                personName: itemJson.personName,
                priceAmount: parseInt(itemJson.priceAmount),
                productList: itemJson.productList,
                taxAmount: itemJson.taxAmount,
                totalPrice: parseInt(itemJson.totalPrice)
            }))

            console.log(item.billIdentifier)
        }

        event.preventDefault();

    };


    const rows = data.map((item, index) => (

        <tr key={index} className='hover'>
            <td>{index + 1}</td>
            <td>{item.personName}</td>
            <td>{item.totalPrice}</td>
            <td>{item.billCreatedOn}</td>
            <td className="w-0 flex flex-row gap-2">
                <button className="btn btn-xs btn-active" onClick={setItemAndDisplayPopup} data-item={JSON.stringify(item)} popup-name="edit">view</button>
            </td>
            <td className="w-0"></td>
        </tr>

    ));

    const productListRows = item.productList.map((item, index) => (

        <tr key={index} className='hover'>
            <td>{index + 1}</td>
            <td>{item.productName}</td>
            <td>{item.rate}</td>
            <td>{item.tax}</td>
            <td>{item.price}</td>
            <td>{item.categoryName}</td>
            <td>{item.categoryTax}</td>
        </tr>

    ));



    console.log(data);



    return (


        <div className="overflow-x-auto w-full">
            <table className="table">
                <thead>
                    <tr>
                        <th className='w-[3%]'>Sl.No</th>
                        <th className='w-[20%]'>Person Name</th>
                        <th className='w-[8%]'>Bill Amount</th>
                        <th className='w-[8%]'>Bill Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>


            <dialog id="edit_bill_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Bill Details</h3>

                    <h4 className='mt-[3%] mb-[3%]'>
                        Bill for Person : {item.personName}
                    </h4>

                    <hr />

                    <h4 className='mt-[3%] mb-[3%]'>
                        Bill Amount : {item.totalPrice}
                    </h4>



                    <div className="overflow-x-auto w-full">
                        <MainTable page="Bill" rows={productListRows}></MainTable>

                        <form>
                            <div className="modal-action">
                                <button className="btn" onClick={() => document.getElementById('edit_bill_modal').close()}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>


    )
}

export default TableComponentBills