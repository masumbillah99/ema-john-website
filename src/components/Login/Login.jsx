import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="form-container">
      <div className="box-shad">
        <h2 className="form-title">Login</h2>
        <form>
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
        <p>
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
