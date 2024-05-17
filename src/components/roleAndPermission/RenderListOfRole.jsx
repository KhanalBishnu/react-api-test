import React, { useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import AuthUser from '../../AuthUser';

function RenderListOfRole({ index, role, deleteRole, RoleUrl, permissionList }) {
    const { http } = AuthUser();
    const [newRole, setNewRole] = useState(role.name);
    const [errors, setErrors] = useState(false);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [modalContent, setModalContent] = useState(''); // 'edit' or 'permissions'

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const handleDeleteRole = () => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            deleteRole(role.id);
        }
    };

    const handlePermissionListView = async (roleId) => {
      try {
          const res = await http.get(`${RoleUrl}/getRolePermission/${roleId}`);
          const data = res.data.data;
          setRolePermissions(data);
          handleOpenModal('permissions');
      } catch (error) {
          console.error('Failed to fetch permissions:', error);
      }
  };

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{role.name}</td>
            <td>
                <Button variant="primary" className="mx-1" onClick={handlePermissionListView(role.id)}>
                    Permission
                </Button>
            </td>
            <td>
                <Button variant="primary" onClick={() => handleOpenModal('edit')} className="mx-1">
                    Edit
                </Button>
                {role.name !== "Admin" &&
                    <Button variant="danger" onClick={handleDeleteRole}>
                        Delete
                    </Button>
                }
            </td>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent === 'edit' ? 'Role Edit' : "Role Permission List"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent === 'edit' ? (
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    disabled={role.name === "Admin"}
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className={`${errors ? "border-danger" : ""} border rounded`}
                                />
                            </Form.Group>
                        </Form>
                    ) : (
                        <ul>
                            {rolePermissions.map((perm, idx) => (
                                <li key={idx}>{perm}</li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    {modalContent === 'edit' && (
                        <Button variant="primary">
                            Update
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </tr>
    );
}

export default RenderListOfRole;
