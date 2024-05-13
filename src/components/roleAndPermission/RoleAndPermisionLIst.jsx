import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, Form } from "react-bootstrap";
import AuthUser from '../../AuthUser';
import RenderListOfRole from './RenderListOfRole';


function RoleAndPermisionLIst() {
  debugger
  const RoleUrl='/dashboard/role-and-permission';
  const [roleName, setRoleName] = useState('');
  const [error, setError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const {http}=AuthUser();

  useEffect(()=>{
    debugger
    getAllRoleList();
  },[]);
  const getAllRoleList=()=>{
    http.get(RoleUrl).then((res)=>{
      setRoles(res.data.data);
      console.log(res);
    })
  }
  const handleStoreRole=()=>{
    if(roleName=="" || roleName==null ||roleName==undefined){
        setError(true);    
    }else{
      setError(false);
      handleCloseModal()
      http.post(`${RoleUrl}/create`,{name:roleName}).then((res)=>{
        console.log(res);
      });
    }
  }

  const renderListOfRoles = (roles) => {
    return roles?.map((role, index) => (
      <RenderListOfRole
        key={role.id}
        index={index}
        role={role}
     /*    onUpdate={handleUpdate}
        onDelete={handleDeleteProduct} */
      />
    ));
  };
  return (
    <div>
      <div className="add-role">
        <Link onClick={handleOpenModal} className='btn btn-primary btn-sm float-end my-2'>Add Role</Link>
      </div>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>SN</th>
            <th>Role</th>
            <th>Permission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderListOfRoles(roles)}</tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e)=>setRoleName(setRoleName)}
                className={`${
                  error? "border-danger" : ""
                } border rounded`}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleStoreRole}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RoleAndPermisionLIst