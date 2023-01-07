import React, { useState } from "react";
import "./SignUp.scss";
import showIcon from '../assets/icons/show.png'
import hideIcon from "../assets/icons/hide.png";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignUp = (props) => {
  let nameInput = React.createRef();
  let emailInput = React.createRef();
  let passInput = React.createRef();
  let reEnterInput = React.createRef();

  let [errors, updateErrors] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });
  let [passVisibility, changePassVisibility] = useState(true);
  let [successMessage,setSuccessMessage]=useState(null)

  let {loginHandler}=props

  let [urlParams]=useSearchParams()
  let originURL=urlParams.get("origin")||"/"
  originURL=(originURL==="/signup"?"/":originURL)

  let navigate=useNavigate()

  let handleSubmit = (e) => {
    e.preventDefault();
    let userInput = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      password: passInput.current.value,
      reEnter: reEnterInput.current.value,
    };
    let status = inputValidator(userInput);
    updateErrors(status.error);
    if (!status.pass) {
      setSuccessMessage(null);
      return
    }
    setSuccessMessage("Successfully Registered! Redirecting...")
    loginHandler({
      loggedIn:true,
      name:userInput.name
    })
    setTimeout(() => navigate(originURL),1000);
  };

  let inputValidator = (data) => {
    let pass = true;
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let error = {
      name: undefined,
      email: undefined,
      password: undefined,
    };
    if (data.name.length < 3 || data.name.length > 30) {
      error.name = "Invalid Name";
      pass = false;
    }
    if (!emailRegex.test(data.email)) {
      error.email = "Invalid Email";
      pass = false;
    }
    if (data.password.length < 10) {
      error.password = "Invalid Password";
      pass = false;
    } else if (data.password !== data.reEnter) {
      error.password = "Passswords doesn't match!";
      pass = false;
    }

    return { pass, error };
  };

  return (
    <div className="SignUp">
      <div className="heading">Register Now!</div>
      <form onSubmit={handleSubmit}>

        <input type="text" placeholder="Name" ref={nameInput} />
        <p className="error">{errors.name}</p>

        <input type="text" placeholder="Email" ref={emailInput} />
        <p className="error">{errors.email}</p>

        <div className="pass-input">
          <input
            type={passVisibility ? "password" : "text"}
            placeholder="Pasword"
            ref={passInput}
          />
          <div
            onClick={() => changePassVisibility((prev) => !prev)}
            className="btn"
          >
            {passVisibility ? <img src={showIcon} alt="Show" /> : <img src={hideIcon} alt="Hide" /> }
          </div>
        </div>
        <input
          type="password"
          placeholder="Re-enter password"
          ref={reEnterInput}
        />
        <p className="error">{errors.password}</p>

        <button type="submit">Sign Up</button>
        <p className="success">{successMessage}</p>

      </form>
    </div>
  );
};

export default SignUp;
