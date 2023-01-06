import React, { useState } from "react";
import "./SignUp.scss";

const SignUp = () => {
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

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    let userInput = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      password: passInput.current.value,
      reEnter: reEnterInput.current.value,
    };
    console.log(userInput);
    let status = inputValidator(userInput);
    console.log({ status });
    updateErrors(status.error);
    if (status.pass) {
      setSuccessMessage("Successfully Registered!")
    }
    else{
      setSuccessMessage(null)
    }
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
    console.log(emailRegex.test(data.email));
    if (!emailRegex.test(data.email)) {
      error.email = "Invalid EMail";
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
        <input type="password" placeholder="Pasword" ref={passInput} />
        <input
          type={passVisibility ? "password" : "text"}
          placeholder="Re-enter password"
          ref={reEnterInput}
        />
        <div onClick={() => changePassVisibility((prev) => !prev)} className="btn">
          {passVisibility ? "Show" : "Hide"}
        </div>
        <p className="error">{errors.password}</p>
        <button type="submit">Sign Up</button>
        <p className="success">{successMessage}</p>
      </form>
    </div>
  );
};

export default SignUp;
