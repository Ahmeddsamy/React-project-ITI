import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../context/tokenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function setCookie(name, value, expirationHours) {
  const d = new Date();
  d.setTime(d.getTime() + expirationHours * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/;Secure;SameSite=Strict`;
}

export default function Login() {
  let { setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  async function login(userData) {
    console.log(userData);
    try {
      let { data } = await axios.post(
        "https://ahmed-samy-node-project-iti.onrender.com/signin",
        userData
      );
      console.log(data);
      if (data.message == "Welcome Home") {
        setCookie("token", data.token, 1);
        setToken(data.token);
        navigate("/");
      }
    } catch (error) {
      // Step 2: Catching server errors
      if (error.response && error.response.data) {
        setServerError(error.response.data); // Updating the state with the error message
      } else {
        setServerError("An unexpected error occurred");
      }
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required Field"),
    password: Yup.string().required("Password Required"),
  });
  let loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <form className="w-50 mx-auto my-5" onSubmit={loginForm.handleSubmit}>
      <div>
        <label htmlFor="">Email:</label>
        <input
          name="email"
          className="form-control mb-3"
          type="email"
          value={loginForm.values.email}
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
        />
        {loginForm.errors.email && loginForm.touched.email ? (
          <div className="alert alert-danger">{loginForm.errors.email}</div>
        ) : null}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password">Password:</label>
        <div className="input-group">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
          />
          <span className="input-group-text" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        {loginForm.errors.password && loginForm.touched.password && (
          <div className="alert alert-danger">{loginForm.errors.password}</div>
        )}
      </div>
      {serverError && (
        <div className="alert alert-danger">{serverError}</div> // Step 3: Displaying the server error
      )}
      <button className="btn btn-info my-2 ms-auto d-block">Login</button>
    </form>
  );
}
