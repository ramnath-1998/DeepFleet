import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from './Table';

function Navbar(props) {
  const url = "/api/categories";
  const productUrl = "/api/products";
  const [categories, setCategories] = useState([]);
  const [itemCategory, setItemCategory] = useState({ categoryName: '', categoryTax: "" })
  const [itemProduct, setItemProduct] = useState({ productName: '', rate: 0, categoryIdentifier: "", categoryName: "", categoryTax: 0 })



  const fetchCategories = async () => {
    const res = await axios.get(url);
    return setCategories(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(productUrl);
    return setCategories(res.data);
  };


  useEffect(() => {

    fetchCategories();
    fetchProducts();
  },[]);


  const handleSelectProductCategory = (event) => {

    const categoryInput = event.currentTarget.getAttribute('category-data');
    const categoryInputJson = JSON.parse(categoryInput)
    setItemProduct(prevItem => ({ ...prevItem, categoryName: categoryInputJson.categoryName, categoryTax: categoryInputJson.categoryTax, categoryIdentifier: categoryInputJson.categoryIdentifier }))


  };

  const dropdown = categories && categories.map((category, index) => (
    <li key={index} onClick={handleSelectProductCategory} category-data={JSON.stringify(category)}><a>{category.categoryName}</a></li>
  ));


  const displayPopup = (event) => {

    const popupName = props.page
    console.log(popupName)
    if (popupName === "Categories") {
      document.getElementById('add_category_model').showModal();
    }
    else if (popupName === "Products") {
      document.getElementById('add_product_model').showModal();
    }
  };

  const handleSubmitCategories = (event) => {

    console.log(itemCategory, "item")
    event.preventDefault();
    return axios.post(url, {
      categoryName: itemCategory.categoryName,
      categoryTax: parseInt(itemCategory.categoryTax)
    }).then(response => {
      console.log('Submitted successfully', response);
      setItemCategory(prevItem => ({ ...prevItem, categoryName: '', categoryTax: 0 }));
      document.getElementById('add_category_model').close();
      window.location.reload();
    });


  };



  const handleSubmitProduct = async () => {
    const response = await axios.post(productUrl,
      { productName: itemProduct.productName, rate: parseInt(itemProduct.rate), categoryIdentifier: itemProduct.categoryIdentifier, categoryName: itemProduct.categoryName, categoryTax: parseInt(itemProduct.categoryTax) }
    );
    console.log('Submitted successfully', response);
    setItemCategory(prevItem => ({ ...prevItem, categoryName: '', categoryTax: 0 }));
    document.getElementById('add_product_model').close();
  };

  const displayAddButton = () => {

    if (props.page === "Categories" || props.page === "Products") {
      return (
        <div className="navbar-end">
          <button onClick={displayPopup} className="btn">Add {props.page}</button>
        </div>
      )
    }
  };



  return (
    <>
      <div className="fixed w-[90%] items-center top-5">
        <div className="flex w-full justify-between  navbar bg-base-100">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl">Admin Dashboard</a>
          </div>

          {displayAddButton()}

          <div className="navbar-end">
            <a href="/user" className="btn">Switch to User Account</a>
          </div>
        </div>
      </div>
      <dialog id="add_category_model" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new Category</h3>
          {itemCategory && (
            <input
              type="text"
              placeholder="Category Name"
              value={itemCategory.categoryName}
              onChange={(e) => setItemCategory(prevItem => ({ ...prevItem, categoryName: e.target.value }))}
              className="input w-full max-w-xs mt-5"
            />

          )}
          {itemCategory && (
            <input type="text" placeholder="Category Tax Percentage"
              value={itemCategory.categoryTax}
              onChange={e => setItemCategory(prevItem => ({ ...prevItem, categoryTax: e.target.value }))}
              className="input w-full max-w-xs mt-5" />

          )}
          <div className="modal-action">
            <input type='submit' onClick={handleSubmitCategories} className="btn" placeholder="Save" />
            <button className="btn" onClick={() => document.getElementById('add_category_model').close()}>Close</button>
          </div>

        </div>
      </dialog>
      <dialog id="add_product_model" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new product</h3>
          <form>
            <input
              type="text"
              placeholder="Product Name"
              value={itemProduct.productName}
              onChange={(e) => setItemProduct(prevItem => ({ ...prevItem, productName: e.target.value }))}
              className="input w-full max-w-xs mt-5"
            />
            <input
              type="text"
              placeholder="Rate"
              value={itemProduct.rate}
              onChange={(e) => setItemProduct(prevItem => ({ ...prevItem, rate: e.target.value }))}
              className="input w-full max-w-xs mt-5"
            />

            <details className="flex dropdown">
              <summary className="m-1 btn mt-[10%]">{itemProduct.categoryName === "" ? "Select the Category" : itemProduct.categoryName }</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">

                {dropdown}

              </ul>
            </details>

            <div className="modal-action">
              <input type='submit' onClick={handleSubmitProduct} className="btn" placeholder="Save" />
              <button className="btn" onClick={() => document.getElementById('add_category_model').close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default Navbar