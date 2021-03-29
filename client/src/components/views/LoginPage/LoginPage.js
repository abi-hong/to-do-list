import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter, Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");

  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //refresh되는 것을 막아줌

    let body = {
      ID: ID,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        // localStorage에 userId & name 저장해두기.
        window.localStorage.setItem("userId", response.payload.userId);
        window.localStorage.setItem("userName", response.payload.userName); //이거 맞는지 확인.

        if (response.payload.userImage === undefined)
          window.localStorage.setItem("userImg", "uploads/default.jpeg");
        else window.localStorage.setItem("userImg", response.payload.userImage);

        props.history.push("/main");
      } else {
        alert("Error˝");
      }
    });
  };

  return (
    <div className="container">
      <div id="item1">TO-DO-LIST</div>
      <form className="item2" onSubmit={onSubmitHandler}>
        <label>ID</label>
        <input type="text" value={ID} onChange={onIDHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">Login</button>

        <br />
        <button type="button">
          <Link to="/register">회원가입</Link>
        </button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);