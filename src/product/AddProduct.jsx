import React from 'react'
import Sidebar from '../layout/sidebar'
import Dashboard from '../auth/Dashboard'

function AddProduct() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission here
      };
    
      return (
        <div>
          <h2>Add Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input type="text" className="form-control" id="productName" />
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">Product Description</label>
              <textarea className="form-control" id="productDescription"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Product Price</label>
              <input type="text" className="form-control" id="productPrice" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
}

export default AddProduct