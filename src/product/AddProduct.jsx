import React, { useState } from 'react'
import Sidebar from '../layout/sidebar'
import Dashboard from '../auth/Dashboard'
import AuthUser from '../AuthUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [errors,setErrors]=useState({});
  const [preview,setPreview]=useState(null);
  const [btnSpinner,setBtnSpinner]=useState(false);
  // for axios 
  const navigator=useNavigate()
  const {http}=AuthUser();
  const [formField,setFormField]=useState({
    title:'',
    description:"",
    tags:'',
    file:null
  });
    const handleFields=(e)=>{
      let fieldValue;
      if(e.target.name=="file"){
         fieldValue=e.target.files[0];
        if (fieldValue && !['image/jpeg', 'image/png'].includes(fieldValue.type)) {
          fieldValue = null;
          setErrors({ ...errors, file: 'File must be a JPG or PNG image.' });
          setPreview(null);
        }else{
          setErrors({ ...errors, file:null });
          setPreview(URL.createObjectURL(fieldValue));
        }
      }else{
        fieldValue=e.target.value;
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
        if(errors.file){
          newErrors.file=errors.file;
        }
        setErrors(newErrors)
        if(Object.keys(newErrors).length===0){
          setBtnSpinner(true);
          http.post('/dashboard/products',formField).then((res)=>{
            let data=res.data;
            if(data.response){
              toast.success(data.message);
              navigator('/dashboard/products')
            }
          })
          setBtnSpinner(false);
        }
      };
      return (
        <div className='p-4 m-5 border rounded '>
          <h2>Add Product</h2>
          <form >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Product Title</label>
              <input name='title' type="text" className={`form-control border ${errors.title?' border-danger':""}`} id="title" onChange={handleFields} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Product Description</label>
              <textarea name='description' className={`form-control border ${errors.description?' border-danger':""}`} id="description" onChange={handleFields}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Product Tags</label>
              <input type="text" className="form-control border " id="tags" name='tags' onChange={handleFields} />
            </div>
            <div className="mb-3">
              <label htmlFor="files" className="form-label">Product File</label>
              <input name='file' type="file" className="form-control border " id="file" onChange={handleFields} />
              {
                errors.file && <small className='text-danger'>{errors.file}</small>
              }
              {preview && <img height="100px" width="100px" className='my-2 p-2' src={preview} alt="Preview" />}

            </div>
            <button type='button' onClick={handleSubmitProduct} className={`${btnSpinner?'btn btn-success':'btn btn-primary'}`}>{btnSpinner?'Submiting...':'Submit'}</button>
          </form>
        </div>
      );
}

export default AddProduct