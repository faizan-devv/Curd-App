import React from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import styles from "./UserInfoForm.module.css";

const UserInfoTable = (props) => {
  return (
    <div className={styles.Container}>
      {props.editing ? (
        <h2>Edit Here</h2>
      ) : (
        <h2 className="my-5">
          Please Enter the credentials to register a new user
        </h2>
      )}
      <Form className="my-5">
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name </Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Enter First Name "
            onChange={props.change}
            value={props.user.firstName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            name="lastName"
            type="text"
            placeholder="Enter Last Name "
            onChange={props.change}
            value={props.user.lastName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRollNumber">
          <Form.Label>Roll Number </Form.Label>
          <Form.Control
            name="rollNum"
            type="text"
            placeholder="Enter Roll Number "
            onChange={props.change}
            value={props.user?.rollNum}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={props.change}
            value={props.user.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={props.change}
            value={props.user.password}
          />
        </Form.Group>
        {props.editing ? (
          <>
            <Button variant="primary" onClick={props.save}>
              Save
            </Button>
            <Button
              variant="primary"
              onClick={props.cancel}
              className="ms-2 btn-danger"
            >
              Cancel
            </Button>
          </>
        ) : (
          [
            props.user.email &&
            props.user.password &&
            props.user.firstName &&
            props.user.rollNum ? (
              <Button variant="primary" onClick={props.add}>
                Create New User
              </Button>
            ) : (
              <Button variant="primary" onClick={props.add} disabled>
                Create New User
              </Button>
            ),
          ]
        )}
      </Form>
    </div>
  );
};

export default UserInfoTable;
