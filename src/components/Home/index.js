import React, { useState, useEffect } from "react";
import UserInfoForm from "../UserInfoForm";
import UserTable from "../UserTable";
import { Container } from "react-bootstrap";
import MyVerticallyCenteredModal from "../Modal";
import UserInfoCard from "../UserInfoCard";
import WebcamComponent from "../Webcam";

const Home = () => {
  //States

  const [userInfo, setuserInfo] = useState([]);
  const [edit, setEdit] = useState({
    isEditing: false,
    editIndex: 0,
  });
  const [rerenderFlag, setRerenderFlag] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    rollNum: "",
    email: "",
    password: "",
  });
  const [modalShow, setModalShow] = useState(false);

  //Methods
  const RerenderHome = () => {
    setRerenderFlag(!rerenderFlag);
  };
  const emptyUserData = () => {
    setUser({
      firstName: "",
      lastName: "",
      rollNum: "",
      email: "",
      password: "",
    });
  };
  const onChangeHandler = (e) => {
    const temp = { ...user };
    temp[e.target.name] = e.target.value;
    setUser(temp);
  };
  const handleAddUser = () => {
    const temp = [...userInfo];
    const userData = { ...user };
    let local = JSON.parse(localStorage.getItem("creds"));
    local.users.push(userData);
    localStorage.setItem("creds", JSON.stringify(local));
    temp.push(userData);
    setuserInfo(temp);
    emptyUserData();
  };
  const handleDelete = () => {
    const temp = [...userInfo];
    let local = JSON.parse(localStorage.getItem("creds"));
    local.users.splice(edit.editIndex, 1);
    localStorage.setItem("creds", JSON.stringify(local));
    temp.splice(edit.editIndex, 1);
    setuserInfo(temp);
    setModalShow(false);
  };
  const handleEdit = (index) => {
    const temp = { ...edit };
    temp.isEditing = true;
    temp.editIndex = index;
    temp.editData = userInfo[index];
    const temp1 = userInfo[index];
    setUser(temp1);
    setEdit(temp);
  };
  const handleSaveEdit = () => {
    const temp = [...userInfo];
    let local = JSON.parse(localStorage.getItem("creds"));
    local.users[edit.editIndex] = { ...user };
    localStorage.setItem("creds", JSON.stringify(local));
    temp[edit.editIndex] = { ...user };
    setuserInfo(temp);
    const temp1 = { ...edit };
    temp1.isEditing = false;
    setEdit(temp1);
    emptyUserData();
  };
  const handleCancelEdit = () => {
    const temp = { ...edit };
    temp.isEditing = false;
    setEdit(temp);
  };

  const showDeleteModal = (index) => {
    setEdit({ ...edit, editIndex: index });
    setModalShow(true);
  };

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("LoggedIn"));
    let data = JSON.parse(localStorage.getItem("creds"));
    let index = data.users.findIndex((x) => {
      return x.email === temp.email;
    });
    setUser(data.users[index]);
  }, [rerenderFlag]);

  return (
    <Container>
      <UserInfoCard user={user} />
      <button
        onClick={() => {
          setModalShow(true);
        }}
      >
        Update Profile Picture
      </button>

      {/* <UserInfoForm
        change={onChangeHandler}
        add={handleAddUser}
        editing={edit.isEditing}
        user={user}
        save={handleSaveEdit}
        cancel={handleCancelEdit}
      />
      <UserTable users={userInfo} edit={handleEdit} delete={showDeleteModal} />*/}
      <MyVerticallyCenteredModal
        delete={handleDelete}
        show={modalShow}
        email={user.email}
        rerender={RerenderHome}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
};

export default Home;
