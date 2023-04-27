import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "./Login.css";

const Login = () => {
  const { signInUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <div className="box-shad">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <input className="btn-submit" type="submit" value="Login" />
        </form>
        <p className="small-msg">
          <small>
            New to Ema-john?{" "}
            <Link className="text-orange" to="/sign-up">
              Create New Account
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Login;
