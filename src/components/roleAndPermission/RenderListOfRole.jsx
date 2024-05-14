import React, { useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
function RenderListOfRole({index,role,deleteRole}) {

    const [newrole, setNewRole] = useState(role.name);
    const [errors, setErrors] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);
    const handleDeleteRole=()=>{
        if (window.confirm("Are you sure you want to delete this role?")) {
            deleteRole(role.id);
        }
    }
  return (
    <tr>
    <td>{index + 1}</td>
    <td>{role.name}</td>
    <td>
        <Button variant="primary"  className="mx-1">
             Permission
        </Button>
    </td>
    <td>
      <Button variant="primary" onClick={handleOpenModal} className="mx-1">
        Edit
      </Button>
      <Button variant="danger" onClick={handleDeleteRole}>
        Delete
      </Button>
    </td>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={role.name}
              onChange={(e)=>setNewRole(e.target.value)}
              className={`${
                errors.title ? "border-danger" : ""
              } border rounded`}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary"  >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  </tr>
    )
}

export default RenderListOfRole