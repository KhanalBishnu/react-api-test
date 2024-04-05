import React from 'react'

function Signup() {
  return (
    <div class="login-clean-signup">
    <form >
      <h2 class="sr-only text-center ">Signup  Form</h2>
      <div class="illustration">
        <i class="icon ion-ios-navigate"></i>
      </div>
      <div class="form-group my-2 py-1">
      <label htmlFor="name">Name</label>
        <input
          class="form-control rounded "
          type="text"
          name="name"
          placeholder="Enter Name"
        />
      </div>
      <div class="form-group my-2 py-1">
        <label htmlFor="email">Email</label>
        <input
          class="form-control rounded"
          type="email"
          name="email"
          placeholder="Enter Email"
        />
      </div>
      <div class="form-group my-2 py-1">
      <label htmlFor="password">Password</label>
        <input
          class="form-control rounded"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
      </div>
      <div class="form-group my-2 py-1">
      <label htmlFor="confirm_password">Confirm Password</label>
        <input
          class="form-control rounded"
          type="password"
          name="confirm_password"
          placeholder="Enter Confirm Password"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary w-100 mt-3" type="submit">
          Sign Up
        </button>
      </div>
      
    </form>
  </div>
  )
}

export default Signup