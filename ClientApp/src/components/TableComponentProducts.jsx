import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MainTable from './MainTable';

const TableComponentProducts = () => {

  const url = "/api/products";
  const categoryUrl = "/api/categories";


  const [data, setData] = useState([]);
  const [item, setItem] = useState({ productIdentifier: "", productName: "", rate: 0, categoryIdentifier: "", categoryName: "", categoryTax: 0 })

  const fetchProducts = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    return axios.get(categoryUrl).then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  const handleSelectProductCategory = (event) => {

    const categoryInput = event.currentTarget.getAttribute('category-data');
    const categoryInputJson = JSON.parse(categoryInput)
    setItem(prevItem => ({ ...prevItem, categoryName: categoryInputJson.categoryName, categoryTax: categoryInputJson.categoryTax, categoryIdentifier: categoryInputJson.categoryIdentifier }))
    console.log(item)
  };


  console.log(categories);
  const dropdown = categories && categories.map((category, index) => (
    <li key={index} onClick={handleSelectProductCategory} category-data={JSON.stringify(category)}><a>{category.categoryName}</a></li>
  ));

  const handleSubmitEditProduct = () => {

    console.log(item, "item")
    event.preventDefault();
    return axios.put(url, {
      productIdentifier: item.productIdentifier,
      productName: item.productName,
      rate: parseInt(item.rate),
      categoryIdentifier: item.categoryIdentifier,
      categoryName: item.categoryName,
      categoryTax: parseInt(item.categoryTax)
    }).then(response => {
      console.log('Edited successfully', response);
      setItem(prevItem => ({
        ...prevItem,
        categoryName: '',
        categoryTax: 0
      }));
      document.getElementById('edit_product_modal').close();
      fetchProducts();
    });
  };




  const handleDeleteProducts = () => {

    console.log(item)
    return axios.delete(url, { data: item }).then(response => {
      console.log('Deleted successfully', response);
      setItem(prevItem => ({ ...prevItem, categoryName: '', categoryTax: 0 }));
      fetchProducts();
      document.getElementById('confirm_product_delete_modal').close();

    })
      .catch(error => {
        console.error('Error deleting:', error);
      });

  };


  useEffect(() => {
    fetchProducts();
  }, []);
  const setItemAndDisplayPopup = (event) => {

    const popupName = event.currentTarget.getAttribute('popup-name')

    if (popupName === "edit") {
      document.getElementById('edit_product_modal').showModal();
      const item = event.currentTarget.getAttribute('data-item')
      const itemJson = JSON.parse(item);
      setItem(prevItem => ({ ...prevItem, categoryIdentifier: item.categoryIdentifier }))
      setItem(prevItem => ({ ...prevItem, productIdentifier: item.productIdentifier }))
      setItem(itemJson)
      console.log(item)
    }
    else if (popupName === "delete") {
      document.getElementById('confirm_product_delete_modal').showModal();
      const item = event.currentTarget.getAttribute('data-item')
      setItem(prevItem => ({ ...prevItem, categoryIdentifier: item.categoryIdentifier }))
      setItem(prevItem => ({ ...prevItem, productIdentifier: item.productIdentifier }))
      setItem(item)
    }

    event.preventDefault();

  };
  const rows = data.map((item, index) => (

    <tr key={index} className='hover'>
      <td>{index + 1}</td>
      <td>{item.productName}</td>
      <td>{item.rate}</td>
      <td>{item.tax}</td>
      <td>{item.price}</td>
      <td>{item.categoryName}</td>
      <td>{item.categoryTax}</td>
      <td className="w-0 flex flex-row gap-2">
        <button className="btn btn-xs btn-active" onClick={setItemAndDisplayPopup} data-item={JSON.stringify(item)} popup-name="edit">Edit</button>
        <button className="btn btn-xs btn-active" onClick={setItemAndDisplayPopup} data-item={JSON.stringify(item)} popup-name="delete">Delete</button></td>
      <td className="w-0"></td>
    </tr>

  ));
  return (

    <div className="overflow-x-auto w-full">

      <MainTable page="Products" rows={rows}></MainTable>

      <dialog id="edit_product_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit the details of Product</h3>
          <form>
            {item && data && categories && (

              <input type="text" placeholder="Product Name" value={item?.productName || ''} onChange={e => setItem(prevItem => ({ ...prevItem, productName: e.target.value }))} className="input w-full max-w-xs mt-5" />

            )}

            {item && data && categories && (
              <input type="number" placeholder="Product Rate" value={item?.rate || ''} onChange={e => setItem(prevItem => ({ ...prevItem, rate: e.target.value }))} className="input w-full max-w-xs mt-5" />

            )}


            {item && data && categories && (

              <details className="flex dropdown">
                <summary className="m-1 btn mt-[10%]">Select the category</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">

                  {dropdown}

                </ul>
              </details>


            )}

            <div className="modal-action">
              <button type='submit' onClick={handleSubmitEditProduct} className="btn">Save</button>
              <button className="btn" onClick={() => document.getElementById('edit_product_modal').close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>


      <dialog id="confirm_product_delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Do you want to Confirm Delete?</h3>
          <p className="py-4">If yes click Yes.</p>
          <div className="modal-action">
            <button className="btn" onClick={handleDeleteProducts}>Yes</button>
            <button className="btn" onClick={() => document.getElementById('confirm_product_delete_modal').close()}>Close</button>
          </div>
        </div>
      </dialog>

    </div>

  )
}

export default TableComponentProducts