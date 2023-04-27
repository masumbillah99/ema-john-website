import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "./Login.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [show, setShow] = useState(false);

  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  let from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <div className="pass-flex">
            <input
              className="pass-input"
              type={show ? "text" : "password"}
              name="password"
              required
            />
            <p onClick={() => setShow(!show)}>
              <small>
                {show ? (
                  <span>
                    <EyeIcon className="hero-icon" />
                  </span>
                ) : (
                  <span>
                    <EyeSlashIcon className="hero-icon" />
                  </span>
                )}
              </small>
            </p>
          </div>
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
  );
};

export default Login;
