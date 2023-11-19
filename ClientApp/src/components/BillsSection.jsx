import React from 'react'
const BillsSection = () => {
    return (
        <div className="flex w-[70%] justify-center items-center mt-[10%]">
            <div role="tablist" className="tabs tabs-lifted w-full">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Bills" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-10">Tab content 1</div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Revenue" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-10">Tab content 2</div>
            </div>
        </div>
    )
}

export default BillsSection