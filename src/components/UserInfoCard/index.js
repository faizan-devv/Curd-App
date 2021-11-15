import React from "react";
import img from "../../assets/images/anon.png";
import styles from "./UserInfoCard.module.css";

const UserInfoCard = (props) => {
  //   let user = JSON.parse(localStorage.getItem("LoggedIn"));
  return (
    <div className=" my-5 ">
      <div className="card mx-auto bg-info" style={{ width: "25rem" }}>
        <div className={styles.imageWrap}>
          {props.user.photoSrc?.length > 0 ? (
            <img
              className="card-img-top "
              src={props.user.photoSrc[1]}
              alt="Card image cap"
            />
          ) : (
            <img className="card-img-top" src={img} alt="Card image cap" />
          )}
        </div>
        <div className="card-body">
          <p className="card-text">
            {props.user?.firstName} {props.user?.lastName}
          </p>
          <p className="card-text">{props.user?.email}</p>
          <p className="card-text">{props.user?.rollNum}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
