import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import UserListRowData from './UserListRowData';
import AuthUser from '../../AuthUser';
import { Button, Form, Modal } from 'react-bootstrap';

function UserList() {
  const [loading, setLoading] = useState(true);
  const [SpinnerContent, setSpinnerContent] = useState('User List Loding...');
  const { http } = AuthUser();
  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  const userURL = '/dashboard/user-management';

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const [btnSpinner,setBtnSpinner]=useState(false);


  useEffect(() => {
    getUsersData();
  }, [])
  const getUsersData = () => {
    http.get(userURL).then((res) => {
      setUsers(res.data.data.users);
      setAllRoles(res.data.data.roles);
      setLoading(false)
    })
  }

  const renderUserListRow = (users) => {
    return users?.map((user, i) => (
      <UserListRowData key={i} user={user}
        index={i}

      />
    ))
  }

  // add user 
  const addNewUser = () => {
    setShowModal(true);

  }

  const [formData,setFormData]=useState({
    name:'',
    email:'',    
  });
  const [errors,setErrors]=useState({});
  
  const handleField=(e)=>{
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
      setFormData({
        ...formData,
        [e.target.name]:fieldValue
      })
  }
  const validationEmail=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
  
    setErrors(newError);
  
    if(Object.keys(newError).length===0){
      console.log(formData);
      setBtnSpinner(true)
      http.post(`${userURL}/store`,formData).then((res)=>{
        getUsersData();
      }).catch((error=>{
        console.log(error);
      }))
      setBtnSpinner(false)
  
    }
   
  }
  return (
    <div
      className="p-4 bg-gradient"
      style={{ height: "92vh", overflow: "auto" }}
    >
      {loading ? (
        <Spinner content={SpinnerContent} />
      ) : (
        <div>
          <div className="add-role">
            <Link
              className="btn btn-primary btn-sm float-end my-2" onClick={addNewUser}
            >
              Add User
            </Link>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>SN</th>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            {
              <tbody>{renderUserListRow(users)}</tbody>
            }
            {/* <tbody>{renderListOfRoles(roles)}</tbody> */}
          </table>
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form >
                <div className="illustration">
                  <i className="icon ion-ios-navigate"></i>
                </div>
                <div className="form-group my-2 py-1">
                  <label htmlFor="name">Name<sup className="text-danger">*</sup></label>
                  <input
                    className={`form-control rounded ${errors.name ? 'border border-danger' : ''}`}
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleField}
                  />
                </div>
                <div className="form-group my-2 py-1">
                  <label htmlFor="email">Email<sup className="text-danger">*</sup></label>
                  <input
                    className={`form-control rounded ${errors.email ? 'border border-danger' : ''}`}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleField}
                    value={formData.email}
                  />
                  {errors.email1 && <span className='text-danger'>{errors.email1}</span>}
                </div>
               
                <div className="form-group my-2 py-1">
                  <label htmlFor="confirm_password">Photo</label>
                  <input
                    className={`form-control rounded ${errors.file ? 'border border-danger' : ''}`}
                    type="file"
                    name="file"
                    onChange={handleField}
                  />
                  {errors.file && <span className='text-danger'>{errors.file}</span>}
                </div>
                <div className="form-group my-2 py-1">
                  <label htmlFor="">Select Role</label>
                  <select name="roleId" className='form-control' id="" onChange={handleField} >
                    <option value="">Choose Role</option>
                    {
                      allRoles?.map((role)=>(
                        <option  key={role.id} value={role.id}>{role.name}</option>
                      ))
                    }
                  </select>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" className={`btn px-2 ${btnSpinner ? 'btn-success' : 'btn-primary'}`}  onClick={handleSignupForm}>
              {btnSpinner ? 'Submiting...' : 'Submit'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  )
}

export default UserList