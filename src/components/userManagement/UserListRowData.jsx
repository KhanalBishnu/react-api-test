import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthUser from '../../AuthUser';
import PermissionConstant from '../Constant/PermissionConstant';

function UserListRowData({ user, index, allRoles,handleDelete,handleUserUpdate}) {
    const [errors, setErrors] = useState({});
    const { http } = AuthUser();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleEditUserManagement = () => {
        setShowModal(true)
    }

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        id: user.id,
    });
    const handleField = (e) => {
        let fieldValue;
        if (e.target.name == "file") {
            fieldValue = e.target.files[0];
            if (fieldValue && !['image/jpeg', 'image/png'].includes(fieldValue.type)) {
                fieldValue = null;
                setErrors({ ...errors, file: 'File must be a JPG or PNG image.' });
            } else {
                setErrors({ ...errors, file: null });
            }
        } else {
            fieldValue = e.target.value;
        }
        setFormData({
            ...formData,
            [e.target.name]: fieldValue
        })
    }

    const validationEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleUpdateUserManagement = () => {
        const newError = {};
        if (!formData.name.trim()) {
            newError.name = "Name Field is Required!"
        }
        if (!formData.email.trim()) {
            newError.email = "Email Field is Required!"
        } else if (!validationEmail(formData.email)) {
            newError.email1 = "Email not Valid!"
        }
        setErrors(newError);
        if (Object.keys(newError).length === 0) {
            handleUserUpdate(formData);
        }
    }

    const handleDeleteUserManagement=(userId)=>{
        if(window.confirm('Are you sure you want to delete this role?')){
            handleDelete(userId)
        }
    }
    // permission 
    const hasPermissionToEditUser=PermissionConstant('Update|User Management');
    const hasPermissionToDeleteUser=PermissionConstant('Delete|User Management');

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>
                {
                    user.media.length > 0 ? <img src={user.media.length > 0 ? user.media[0].original_url : ''} alt="user-image" srcset="" height="100px" width="100px" />:'-'                }
            </td>
            <td>
                {
                    user.role.length > 0 ? user.role[0] : ''
                }
            </td>
            <td>
                {
                    user.name != 'Admin' &&  <>
                    {hasPermissionToEditUser &&
                        <Button variant="primary" className="mx-1" onClick={handleEditUserManagement}>
                            Edit
                        </Button>
                    }
                        {
                        hasPermissionToDeleteUser &&
                        <Button variant="danger" onClick={()=>handleDeleteUserManagement(user.id)} >
                            Delete
                        </Button>
                        }
                    </>
                }
            </td>
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
                            {
                                user.media.length > 0 && <img src={user.media.length > 0 ? user.media[0].original_url : ''} alt="user-image" srcset="" height="200px" width="200px" />
                            }
                        </div>
                        <div className="form-group my-2 py-1">
                            <label htmlFor="">Select Role</label>
                            <select name="roleId" className='form-control' id="" onChange={handleField} >
                                <option value="">Choose Role</option>
                                {
                                    allRoles?.map((role) => (
                                        <option key={role.id} value={role.id}
                                            selected={user.role.length > 0 && user.role[0] == role.name ? true : false}
                                        >{role.name}</option>
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
                    <Button variant="primary" className="btn px-2 'btn-primary" onClick={handleUpdateUserManagement}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    )
}

export default UserListRowData