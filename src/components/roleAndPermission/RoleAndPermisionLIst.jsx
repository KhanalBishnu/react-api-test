import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import AuthUser from "../../AuthUser";
import RenderListOfRole from "./RenderListOfRole";
import Spinner from "../Spinner";

function RoleAndPermisionLIst() {
  const RoleUrl = "/dashboard/role-and-permission";
  const [roleName, setRoleName] = useState("");


  const [SpinnerContent, setSpinnerContent] = useState("Role Listing");
  const [error, setError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const { http } = AuthUser();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllRoleList();
  }, []);
  const getAllRoleList = () => {
    http.get(RoleUrl).then((res) => {
      setRoles(res.data.data);
      setLoading(false)
    });
  };
 

  const renderListOfRoles = (roles) => {
    return roles?.map((role, index) => (
      <RenderListOfRole
        key={role.id}
        index={index}
        role={role}
        deleteRole={deleteRole}
        RoleUrl={RoleUrl}
        loadingFunction={loadingFunction}
        /*    onUpdate={handleUpdate}
        onDelete={handleDeleteProduct} */
      />
    ));
  };
  // delete role
  const deleteRole = (roleId) => {
    http.get(`${RoleUrl}/delete/${roleId}`).then((res)=>{
      let data=res.data.data;
      setRoles(roles.filter((role) =>role.id!==roleId));
    })
  };
  const loadingFunction=(loadingData,spinnerContentData)=>{
    setSpinnerContent(spinnerContentData);
    setLoading(loadingData);
    
  }


  // get all permission 
  const [allPermission,setAllPermission]=useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);


  const addRolePermission= async ()=>{
    try {
        const res=await http.get(`${RoleUrl}/allPermissionList`);
        const data=res.data.data;
        setAllPermission(data)
        setShowModal(true);

    } catch (error) {
        console.error('Failed to fetch permissions:', error);
    }
  }
  // handle check value 
  const handleCheckboxChange = (event, permissionId) => {
    const { checked } = event.target;

    if (checked) {
        setSelectedPermissions(prevState => [...prevState, permissionId]);
    } else {
        setSelectedPermissions(prevState => prevState.filter(id => id!== permissionId));
    }
    
  };
  const handleStoreRole = () => {
    debugger;
    if (roleName == "" || roleName == null || roleName == undefined) {
      setError(true);
    } else {
      setError(false);
      handleCloseModal();
      http.post(`${RoleUrl}/store`, { name: roleName,permissionIds: selectedPermissions}).then((res) => {
        let newRoleData = res.data.data;
        const updatedData = [...roles, newRoleData];
        setRoles(updatedData);
      });
    }
  };
  
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
              onClick={addRolePermission}
              className="btn btn-primary btn-sm float-end my-2"
            >
              Add Role
            </Link>
          </div>
          <table className="table table-bordered table-striped">
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
          <Modal show={showModal} onHide={handleCloseModal} size="lg">  
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
                    onChange={(e) => setRoleName(e.target.value)}
                    className={`${error ? "border-danger" : ""} border rounded`}
                  />
                </Form.Group>

                <Form.Group controlId="formTitle" className='mt-3'>
                  <Form.Label>Add Permission</Form.Label>
                  {
                      allPermission.length>0 && allPermission.map((module,index)=>(
                      <div className="row">
                          <label className='text-center mb-2 bg-secondary'>{module.title}</label>
                          <div className="col-md-12 d-flex justify-content-center align-items-center gap-4 p-2" >
                              {
                                  module.permissions.length>0 && module.permissions.map((per,i)=>(
                                      <div className="permissionCheck mx-3">
                                          <input type="checkbox" className='mx-2' 
                                          name="permissionids" id={`permission-${i}`} 
                                          value={per.id} 
                                          onChange={(event) => handleCheckboxChange(event, per.id)}/>
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
      )}
    </div>
  );
}

export default RoleAndPermisionLIst;
