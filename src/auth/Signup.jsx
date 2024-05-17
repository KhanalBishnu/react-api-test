import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthUser from '../AuthUser';
import { toast } from 'react-toastify';
import Header from './Header';
function Signup() {
  // for btn spinner 
const [btnSpinner,setBtnSpinner]=useState(false);
const navigate=useNavigate();
const {http,setAuthToken}=AuthUser();
const [formData,setFormData]=useState({
  name:'',
  email:'',
  password:'',
  confirm_password:'',
  file:'',
});
const [errors,setErrors]=useState({});

const handleField=(e)=>{
  let fieldvalue = e.target.value;
  if (e.target.name === "file") {
    fieldvalue = e.target.files[0];
  }
  setFormData({
    ...formData,
    [e.target.name]:fieldvalue
  })
}
const handleSignupForm=()=>{
  const newError={};
  if(!formData.name.trim()){
    newError.name="Name Field is Required!"
  }
  if(!formData.email.trim()){
   newError.email="Email Field is Required!"
  }else if(!validationEmail(formData.email)){
    newError.email1="Email not Valid!"
  }
  if(!formData.password.trim()){
    newError.password="Password Field is Required!"
  }
  if(!formData.confirm_password.trim()){
    newError.confirm_password="Confirm Password is Required "
  }else if(formData.password!==formData.confirm_password  && formData.password.trim() ){
    newError.confirm_password1="Confirm Password Does not Match!"
  }
  setErrors(newError);

  if(Object.keys(newError).length===0){
    setBtnSpinner(true)
    http.post('/register',formData).then((res)=>{
      let data=res.data;
      if(data.response){
        toast.success(data.message);
        navigate('/login')
        // setAuthToken(data.user,data.token)
      }
    }).catch((error=>{
      console.log(error);
    }))
    setBtnSpinner(false)

  }
 
}
const validationEmail=(email)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
const { token } = AuthUser();
useEffect(() => {
  if (token) {
    navigate("/dashboard");
  }
});
  return (
    <>
    <Header />
    <div className="login-clean-signup">
    <form >
      <h2 className="sr-only text-center ">Signup  Form</h2>
      <div className="illustration">
        <i className="icon ion-ios-navigate"></i>
      </div>
      <div className="form-group my-2 py-1">
      <label htmlFor="name">Name</label>
        <input
          className={`form-control rounded ${errors.name?'border border-danger':''}`}
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleField}
        />
      </div>
      <div className="form-group my-2 py-1">
        <label htmlFor="email">Email</label>
        <input
          className={`form-control rounded ${errors.email?'border border-danger':''}`}
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleField}
          value={formData.email}
        />
        {errors.email1 && <span className='text-danger'>{errors.email1}</span>}
      </div>
      <div className="form-group my-2 py-1">
      <label htmlFor="password">Password</label>
        <input
          className={`form-control rounded ${errors.password?'border border-danger':''}`}
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleField}
          value={formData.password}
        />
      </div>
      <div className="form-group my-2 py-1">
      <label htmlFor="confirm_password">Confirm Password</label>
        <input
          className={`form-control rounded ${errors.confirm_password?'border border-danger':''}`}
          type="password"
          name="confirm_password"
          placeholder="Enter Confirm Password"
          onChange={handleField}
          value={formData.confirm_password}
        />
        {errors.confirm_password1 &&  <span className='text-danger'>{errors.confirm_password1}</span>}
      </div>
      <div className="form-group my-2 py-1">
      <label htmlFor="confirm_password">Photo</label>
        <input
          className={`form-control rounded ${errors.file?'border border-danger':''}`}
          type="file"
          name="file"
          onChange={handleField}
        />
        {errors.file &&  <span className='text-danger'>{errors.file}</span>}
      </div>
      <div className="form-group">
        <button className={`btn  w-100 mt-3 ${btnSpinner?'btn-success':'btn-primary'}`} type="button" onClick={handleSignupForm}>
         {btnSpinner?'Signing...':' Sign Up'}
        </button>
      </div>
      <div className="form-group w-100 text-center">
       <small className=' fw-bold'>Already Have a account? <Link to="/login"> Login</Link> </small>
      </div>
      
    </form>
  </div>
  </>

  )
}

export default Signup