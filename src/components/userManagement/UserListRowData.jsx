import React from 'react'
import { Button } from 'react-bootstrap'

function UserListRowData({user,index}) {
  return (
    <tr>
    <td>{index + 1}</td>
    <td>{user.name}</td>
    <td>
        {
            user.role.length>0?user.role[0]:''
        }
    </td>
    <td>
        {
        user.name!='Admin'&& <>
        <Button variant="primary" className="mx-1">
            Edit
        </Button>
        <Button variant="danger" >
            Delete
        </Button>
        </>}

    </td>
</tr>
  )
}

export default UserListRowData