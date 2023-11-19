import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponentCategories = () => {



  const url = "/api/categories";
  const [item, setItem] = useState({ categoryIdentifier: '', categoryName: '', categoryTax: 0 })
  const [data, setData] = useState([]);

  const fetchCategories = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategories = () => {

    console.log(item)
    return axios.delete(url, { data: item }).then(response => {
      console.log('Deleted successfully', response);
      setItem(prevItem => ({ ...prevItem, categoryName: '', categoryTax: 0 }));
      document.getElementById('confirm_category_delete_modal').close();
      fetchCategories();
    })
      .catch(error => {
        console.error('Error deleting:', error);
      });

  };

  const handleSubmitEdit = (event) => {
    console.log(item, "item")
    event.preventDefault();
    return axios.put(url, {
      categoryIdentifier: item.categoryIdentifier,
      categoryName: item.categoryName,
      categoryTax: parseInt(item.categoryTax)
    }).then(response => {
      console.log('Deleted successfully', response);
      setItem(prevItem => ({ ...prevItem, categoryName: '', categoryTax: 0 }));
      document.getElementById('edit_category_modal').close();
      fetchCategories();
    });
  }

  const setItemAndDisplayPopup = (event) => {
    const popupName = event.currentTarget.getAttribute('popup-name')

    if (popupName === "edit") {
      document.getElementById('edit_category_modal').showModal();
      const item = event.currentTarget.getAttribute('data-item')
      const itemJson = JSON.parse(item);
      setItem(prevItem =>({...prevItem,categoryIdentifier: item.categoryIdentifier }))
      setItem(itemJson)
    }
    else if (popupName === "delete") {
      document.getElementById('confirm_category_delete_modal').showModal();
      const item = event.currentTarget.getAttribute('data-item')
      setItem(prevItem =>({...prevItem,categoryIdentifier: item.categoryIdentifier }))
      setItem(item)
    }

    event.preventDefault();
  };

  const rows = data && data.map((item, index) => (

    <tr key={index} className='hover'>
      <td>{index + 1}</td>
      <td>{item.categoryName}</td>
      <td>{item.categoryTax}</td>
      <td className="w-0 flex flex-row gap-2">
        <button className="btn btn-xs btn-active" onClick={setItemAndDisplayPopup} data-item={JSON.stringify(item)} popup-name="edit">Edit</button>
        <button className="btn btn-xs btn-active" onClick={setItemAndDisplayPopup} data-item={JSON.stringify(item)} popup-name="delete">Delete</button>
      </td>
      <td className="w-0"></td>

    </tr>

  ));

  if (!item) return "Item now found!";


  return (
    <div className="overflow-x-auto w-full">
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
          {rows}
        </tbody>
      </table>
      <dialog id="edit_category_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit the details of category</h3>
          <form>
            {item && data && (

              <input type="text" placeholder="Category Name" value={item?.categoryName || ''} onChange={e => setItem(prevItem => ({ ...prevItem, categoryName: e.target.value }))} className="input w-full max-w-xs mt-5" />

            )}

            {item && data && (
              <input type="number" placeholder="Category Tax Percentage" value={item.categoryTax} onChange={e => setItem(prevItem => ({ ...prevItem, categoryTax: e.target.value }))} className="input w-full max-w-xs mt-5" />

            )}


            {item && data && (
              <input type="hidden" placeholder="Category Tax Percentage" value={item.categoryIdentifier} onChange={e => setItem(prevItem => ({ ...prevItem, categoryIdentifier: categoryIdentifier }))} className="input w-full max-w-xs mt-5" />

            )}

            <div className="modal-action">
              <button type='submit' onClick={handleSubmitEdit} className="btn">Save</button>
              <button className="btn" onClick={() => document.getElementById('edit_category_modal').close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="confirm_category_delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Do you want to Confirm Delete?</h3>
          <p className="py-4">If yes click Yes.</p>
          <div className="modal-action">
            <button className="btn" onClick={handleDeleteCategories}>Yes</button>
            <button className="btn" onClick={() => document.getElementById('confirm_category_delete_modal').close()}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default TableComponentCategories