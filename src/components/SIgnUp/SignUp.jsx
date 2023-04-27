import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "./SignUp.css";

const SignUp = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPass = form.confirmPassword.value;

    setError('');
    if (password !== confirmPass) {
      setError("Your password did not match");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 characters longer");
    }

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" required />
        </div>

        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p className="small-msg">
        <small>
          Already have an Account{" "}
          <Link className="text-orange" to="/login">
            Login
          </Link>
        </small>
      </p>
      { error ?
        <p className="text-error">{error}</p> : ''
      }
    </div>
  );
};

export default SignUp;
