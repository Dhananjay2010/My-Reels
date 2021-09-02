import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "./authProvider";
import "../css/signup.css"

let SignUp = () => {
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [email, setEmail] = useState("");
  let user=useContext(AuthContext);
  return (
    <div className="ss_container">
      <div className="sup_container">
        {user?<Redirect to="/home"></Redirect> : ""}
        <h1>SignUp</h1>
      <div className="patani_div">
        {/* <label>Email Address</label> */}
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className="patani_div">
        {/* <label>Password</label> */}
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div className="patani_div">
        {/* <label>Confirm Password</label> */}
        <input
        type="password"
        placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
      </div>
      <button
      className="sup_btn"
        onClick={() => {
          if (password == confirmPassword) {
            auth.createUserWithEmailAndPassword(email, password);
          } else {
            alert("Password and Confirm Password are not same");
          }
        }}
      >
        SignUp
      </button>
    </div>
    </div>
    
  );
};

export default SignUp;
