import React, { useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import AuthUser from '../../AuthUser';
import PermissionConstant from '../Constant/PermissionConstant';

function RenderListOfRole({ index, role, deleteRole, RoleUrl, loadingFunction }) {
    const { http } = AuthUser();
    const [newRole, setNewRole] = useState(role.name);
    const [errors, setErrors] = useState(false);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [allPermission,setAllPermission]=useState([]);
    const [modalContent, setModalContent] = useState(''); // 'edit' or 'permissions'
    const [selectedPermissions, setSelectedPermissions] = useState([]);


    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = (content) => {
        setModalContent(content);
        setShowModal(true);


    };
    const editRolePermission= async (content,roleId)=>{
        try {
            const res=await http.get(`${RoleUrl}/getPermissionList/${roleId}`);
            const data=res.data.data;
            setAllPermission(data.modules)
            setSelectedPermissions(data.permissionIds);
            handleOpenModal(content);

        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        }
    }

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

//   for edit permission 
    const handleCheckboxChange = (event, permissionId) => {
        const { checked } = event.target;
    
        if (checked) {
            setSelectedPermissions(prevState => [...prevState, permissionId]);
        } else {
            setSelectedPermissions(prevState => prevState.filter(id => id!== permissionId));
        }
        
    };

    const handleUpdateRolePermission=(roleId)=>{
        loadingFunction(true,'Updating Role...');
        try {
            http.post(`${RoleUrl}/update`,{name:newRole,permissionids:selectedPermissions,id:roleId}).then((res)=>{
                setShowModal(true);
                loadingFunction(false);
            })
        } catch (error) {
            console.error('Failed to fetch permissions:', error);

        }
    }
// permission 
const hasEditRolePermission=PermissionConstant('Update|Role And Permission')
const hasDeleteRolePermission=PermissionConstant('Delete|Role And Permission')

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{role.name}</td>
            <td>
                <Button variant="primary" className="mx-1" onClick={()=>handlePermissionListView(role.id)}>
                    Permission
                </Button>
            </td>
            <td>
                {
                    hasEditRolePermission &&
                <Button variant="primary" onClick={() => editRolePermission('edit',role.id)} className="mx-1">
                    Edit
                </Button>
                }
                {
                    hasDeleteRolePermission && role.name !== "Admin" &&
                    <Button variant="danger" onClick={handleDeleteRole}>
                        Delete
                    </Button>
                }
                
            </td>
            <Modal show={showModal} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent === 'edit' ? 'Role Edit' : "Permission List"}</Modal.Title>
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
                            <Form.Group controlId="formTitle" className='mt-3'>
                                <Form.Label>Edit Permission</Form.Label>
                                {
                                    allPermission.length>0 && allPermission.map((module,index)=>(
                                    <div className="row">
                                        <label className='text-center bg-secondary mx-auto my-3 p-2'>{module.title}</label>
                                        <div className="col-md-12 d-flex justify-content-center align-items-center gap-4 p-2" >
                                            {
                                                module.permissions.length>0 && module.permissions.map((per,i)=>(
                                                    <div className="permissionCheck mx-4">
                                                      <input type="checkbox" className='mx-2' 
                                                        name="permissionids" id={`permission-${i}`} 
                                                        value={per.id} 
                                                        onChange={(event) => handleCheckboxChange(event, per.id)}
                                                        checked={selectedPermissions.includes(per.id)}/>
                                                        <label for={`permission-${i}`}>{per.name.split('|')[0]}</label>
                                                    </div>
                                                ))
                                            }
                                            
                                        </div>
                                    </div>
                                    ))
                                }
                                
                            </Form.Group>
                        </Form>
                    ) : (
                        <div className='row'> 
                            {rolePermissions.length>0?rolePermissions.map((perm, idx) => (
                                <div key={idx} className="col-md-6 mt-1">
                                    <span key={idx}>{idx+1}. {perm}</span> 
                                </div>
                            ))
                        :<div><center>Permission Not Found</center></div>}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    {modalContent === 'edit' && (
                        <Button variant="primary" onClick={()=>handleUpdateRolePermission(role.id)}>
                            Update
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </tr>
    );
}

export default RenderListOfRole;
