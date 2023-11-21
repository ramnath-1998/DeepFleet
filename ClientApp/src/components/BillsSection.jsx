import React from 'react'

import { useState, useEffect } from 'react';
import axios from 'axios';


function BillsSection(props) {






    const url = "/api/bills";
    const [data, setData] = useState([]);



    useEffect(() => {


        const fetchBills = async () => {
            const res = await axios.get(url);
            return setData(res.data);
        };

        fetchBills();

    },[]);



    const calculateTotalRevenue = (data, periodOfRevenue) => {
        if (!Array.isArray(data)) {

            return 0;
        }

        return data.reduce((total, bill) => {
            if (periodOfRevenue === "Total") {
                return total + bill.totalPrice;
            }
            else if (periodOfRevenue === "Today") {
                return calculateTotalRevenueToday(data)
            } else if (periodOfRevenue === "This Month") {
                return calculateTotalRevenueThisMonth(data)
            } else if (periodOfRevenue === "This Year") {
                return calculateTotalRevenueThisYear(data)
            }

        }, 0);
    };

    const calculateTotalTax = (data, periodOfRevenue) => {
        if (!Array.isArray(data)) {

            return 0;
        }

        return data.reduce((total, bill) => {
            if (periodOfRevenue === "Total") {
                return total + bill.taxAmount;
            }
            else if (periodOfRevenue === "Today") {
                return calculateTotalTaxToday(data)
            } else if (periodOfRevenue === "This Month") {
                return calculateTotalTaxThisMonth(data)
            } else if (periodOfRevenue === "This Year") {
                return calculateTotalTaxThisYear(data)
            }


        }, 0);
    };

    const calculateTotalRate = (data, periodOfRevenue) => {
        if (!Array.isArray(data)) {

            return 0;
        }

        return data.reduce((total, bill) => {
            if (periodOfRevenue === "Total") {
                return total + bill.priceAmount;
            }
            else if (periodOfRevenue === "Today") {
                return calculateTotalRateToday(data)
            } else if (periodOfRevenue === "This Month") {
                return calculateTotalRateThisMonth(data)
            } else if (periodOfRevenue === "This Year") {
                return calculateTotalRateThisYear(data)
            }


        }, 0);
    };




    const calculateTotalRevenueToday = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getDate() === billCreatedOn.getDate() && today.getMonth() === billCreatedOn.getMonth() && today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.totalPrice;
            }

            return total;

        }, 0);
    };

    const calculateTotalTaxToday = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getDate() === billCreatedOn.getDate() && today.getMonth() === billCreatedOn.getMonth() && today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.taxAmount;
            }

            return total;

        }, 0);
    };

    const calculateTotalRateToday = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getDate() === billCreatedOn.getDate() && today.getMonth() === billCreatedOn.getMonth() && today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.priceAmount;
            }

            return total;

        }, 0);
    };



    const calculateTotalRevenueThisMonth = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)

            if (today.getMonth() === billCreatedOn.getMonth() && today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.totalPrice;
            }
            return total;

        }, 0);
    };

    const calculateTotalTaxThisMonth = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getMonth() === billCreatedOn.getMonth() && today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.taxAmount;
            }

            return total;

        }, 0);
    };

    const calculateTotalRateThisMonth = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getMonth() === billCreatedOn.getMonth() && today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.priceAmount;
            }

            return total;

        }, 0);
    };





    const calculateTotalRevenueThisYear = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.totalPrice;
            }
            return total;

        }, 0);
    };


    const calculateTotalTaxThisYear = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.taxAmount;
            }

            return total;

        }, 0);
    };

    const calculateTotalRateThisYear = (data) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((total, bill) => {

            const today = new Date()
            const billCreatedOn = new Date(bill.billCreatedOn)
            if (today.getFullYear() === billCreatedOn.getFullYear()) {
                total = total + bill.priceAmount;
            }

            return total;

        }, 0);
    };





    const [periodOfRevenue, setPeriodOfRevenue] = useState("Total")

    const [radioButtonControl, setRadioButtonControl] = useState("bills")

    const handleSelectPeriodOfRevenue = (value) => {
        setPeriodOfRevenue(value);
    };
    const handleOptionChange = (event) => {
        setRadioButtonControl(event.target.value)
    }


    return (
        <div className="flex w-[70%] justify-center items-center mt-[10%]">
            <div role="tablist" className="tabs tabs-lifted w-full">
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Bills" value="bills" checked={radioButtonControl === "bills"} onChange={handleOptionChange} />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-10">
                    {props.table}
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Revenue" value="revenue" checked={radioButtonControl === "revenue"} onChange={handleOptionChange} />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-10">

                    <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                        <li onClick={() => handleSelectPeriodOfRevenue('Total')}><a>Total</a></li>
                        <li onClick={() => handleSelectPeriodOfRevenue('Today')}><a>Today</a></li>
                        <li onClick={() => handleSelectPeriodOfRevenue('This Month')}><a>This Month</a></li>
                        <li onClick={() => handleSelectPeriodOfRevenue('This Year')}><a>This Year</a></li>
                    </ul>



                    <div className="flex stats shadow mt-10">
                        <div className="stat">
                            <div className="stat-title">Total Revenue</div>
                            <div className="stat-value">{calculateTotalRevenue(data, periodOfRevenue)} Rs</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Total Rate</div>
                            <div className="stat-value">{calculateTotalRate(data, periodOfRevenue)} Rs</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Total Tax</div>
                            <div className="stat-value">{calculateTotalTax(data, periodOfRevenue)} Rs</div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default BillsSection