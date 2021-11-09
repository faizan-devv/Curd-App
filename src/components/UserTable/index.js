import React from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const UserTable = (props) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll Number</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.users?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.rollNum}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      props.edit(index);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    className="ms-2 btn-danger"
                    onClick={(e) => {
                      props.delete(index);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
