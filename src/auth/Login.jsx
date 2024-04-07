import React, { useState } from "react";
import AuthUser from "../AuthUser";

function login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {http,setAuthToken}=AuthUser();
  // for validation 
  const [passwordValidation,setPasswordValidation]=useState(false);
  const [emailValidation,setEmailValidation]=useState(false);
  const [formError,setFormError]=useState('');
  const [emailError ,setEmailError]=useState('');
  const [passwordError ,setPasswordError]=useState('');

  // for loader 
  const [btnSpinner,setBtnSpinner]=useState(false);


  const submitLoginForm=()=>{
    if(email=='' || email==null){
      setEmailValidation(true);
    }else{
      setEmailValidation(false);
    }
    if(password=='' || password==null){
      setPasswordValidation(true);
    }else{
      setPasswordValidation(false);
    }
    if(email!='' &&email!=null && password!='' && password!=null){
      setBtnSpinner(true)
      let url='/login'
      http.post(url,{email:email,password:password}).then((res)=>{
       console.log(res.data);
       // setAuthToken(res.data.)
       let data=res.data;
       setEmailError('')
       setPasswordError('')
       setFormError('')
       
       if(data.response){
         setAuthToken(data.user,data.token)
       }else if(data.message.email || data.message.password){
        setPasswordError(data.message.password || '')
        setEmailError(data.message.email || '')
       }else{
        setFormError(data.message || 'Something went wrong!')
       }
       setBtnSpinner(false)
      })
    }

  }
  return (
    <div className="login-clean">
      <form >
        <h2 className="sr-only text-center ">Login Form</h2>
        { formError && <h6 className="text-danger text-center">{formError}</h6>}
      
        <div className="illustration">
          <i className="icon ion-ios-navigate"></i>
        </div>
        <div className="form-group">
          <input
            className={`form-control rounded ${emailValidation ?'border border-danger':''}`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}

          />
          {emailError && <span className="text-danger">{emailError} </span>}
        </div>
        <div className="form-group">
          <input
            className={`form-control rounded  ${passwordValidation ?'border border-danger':''}`}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          {passwordError && <span className="text-danger">{passwordError} </span>}

        </div>
        <div className="form-group">
          <button onClick={submitLoginForm} className={`btn btn-primary btn-block ${btnSpinner?'bg-success':""}`} type="button">
            {btnSpinner?'Loging...':'Log In'}
          </button>
        </div>
        <a href="#" className="forgot">
          Forgot your email or password?
        </a>
      </form>
    </div>
  );
}

export default login;
