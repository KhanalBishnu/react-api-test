import React from 'react'
import { Link } from 'react-router-dom'

function RoleAndPermisionLIst() {
  const addRoleUrl='/dashboard/role-and-permission/create';
  return (
    <div>
      <div className="add-role">
        <Link to={addRoleUrl} className='btn btn-primary btn-sm float-end my-2'>Add Role</Link>
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
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RoleAndPermisionLIst