import React, { useState } from 'react'
import Sidebar from '../layout/sidebar'
import Dashboard from '../auth/Dashboard'

function AddProduct() {
  const [errors,setErrors]=useState({});
  const [formField,setFormField]=useState({
    title:'',
    description:"",
    tags:'',
    file:null
  });
    const handleFields=()=>{
      let fieldValue=e.target.value;
      if(e.target.name=="file"){
        fieldValue=e.target.files[0];
      }
      setFormField({
        ...formField,
        [e.target.name]:fieldValue
      })
    }
    const handleSubmitProduct = () => {
        const newErrors={};
        if(!formField.title.trim()){
          newErrors.title="Title field is required!"
        }
        if(!formField.description.trim()){
          newErrors.description="Description field is required!"
        }
        setErrors(newErrors)
      };
    
      return (
        <div className='p-4 m-5 border rounded '>
          <h2>Add Product</h2>
          <form >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Product Title</label>
              <input type="text" className={`form-control border ${errors.title?' border-danger':""}`} id="title" onChange={handleFields} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Product Description</label>
              <textarea className={`form-control border ${errors.description?' border-danger':""}`} id="description"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Product Tags</label>
              <input type="text" className="form-control border " id="tags" />
            </div>
            <div className="mb-3">
              <label htmlFor="files" className="form-label">Product File</label>
              <input type="file" className="form-control border " id="file" />
            </div>
            <button type='button' onClick={handleSubmitProduct} className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
}

export default AddProduct