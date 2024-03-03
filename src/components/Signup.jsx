import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
export default function Signup() {
  let navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  async function register(userData) {
    console.log(userData);
    let { data } = await axios.post(
      "https://ahmed-samy-node-project-iti.onrender.com/signup",
      userData
    );
    console.log(data);
    if (data.message) {
      if (data.message === "User created successfully") {
        navigate("/auth/login");
      } else {
        // Handle messages like 'user email already registered'
        setServerMessage(data.message);
      }
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };
  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(20, "Name is Long")
      .min(3, "Name is Short")
      .required("Required Field"),
    email: Yup.string().email("Invalid Email").required("Required Field"),
    password: Yup.string().required("Password Required"),
    Cpassword: Yup.string()
      .required("Password Required")
      .oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password Should Match"
      ),
    phoneNumber: Yup.string().required("Required Field"),
    addresses: Yup.array().of(
      Yup.object().shape({
        street: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
      })
    ),
  });
  let registerForm = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      Cpassword: "",
      phoneNumber: "",
      addresses: [{ street: "", city: "", country: "" }],
    },
    validationSchema,
    onSubmit: register,
  });
  // Function to handle changes in address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedAddresses = registerForm.values.addresses.map(
      (address, index) => {
        if (index === 0) {
          // Assuming single address for simplicity
          return { ...address, [name]: value };
        }
        return address;
      }
    );

    registerForm.setFieldValue("addresses", updatedAddresses);
  };
  return (
    <Container>
      <form className="mx-auto my-3" onSubmit={registerForm.handleSubmit}>
        <Row>
          {/* First Column */}
          <Col md={6}>
            {/* User Name */}
            <div className="form-group mb-3">
              <label htmlFor="userName">User Name:</label>
              <input
                id="userName"
                name="userName"
                type="text"
                className="form-control"
                value={registerForm.values.userName}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />
              {registerForm.errors.userName &&
                registerForm.touched.userName && (
                  <div className="alert alert-danger">
                    {registerForm.errors.userName}
                  </div>
                )}
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={registerForm.values.email}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />
              {registerForm.errors.email && registerForm.touched.email && (
                <div className="alert alert-danger">
                  {registerForm.errors.email}
                </div>
              )}
            </div>
          </Col>

          {/* Second Column */}
          <Col md={6}>
            {/* Password */}
            <div className="form-group mb-3">
              <label htmlFor="password">Password:</label>
              <div className="input-group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {registerForm.errors.password &&
                registerForm.touched.password && (
                  <div className="alert alert-danger">
                    {registerForm.errors.password}
                  </div>
                )}
            </div>

            {/* Confirm Password */}
            <div className="form-group mb-3">
              <label htmlFor="Cpassword">Confirm Password:</label>
              <div className="input-group">
                <input
                  id="Cpassword"
                  name="Cpassword"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={registerForm.values.Cpassword}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {registerForm.errors.Cpassword &&
                registerForm.touched.Cpassword && (
                  <div className="alert alert-danger">
                    {registerForm.errors.Cpassword}
                  </div>
                )}
            </div>
          </Col>
        </Row>

        {/* Additional Fields */}
        <Row>
          <Col md={12}>
            {/* Phone Number */}
            <div className="form-group mb-3">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className="form-control"
                value={registerForm.values.phoneNumber}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
              />
              {registerForm.errors.phoneNumber &&
                registerForm.touched.phoneNumber && (
                  <div className="alert alert-danger">
                    {registerForm.errors.phoneNumber}
                  </div>
                )}
            </div>

            {/* Address Fields */}
            {registerForm.values.addresses.map((address, index) => (
              <div key={index}>
                <label>Address</label>
                <hr />
                {/* Street */}
                <div className="form-group mb-3">
                  <label htmlFor={`addresses[${index}].street`}>Street:</label>
                  <input
                    name={`addresses[${index}].street`}
                    type="text"
                    className="form-control"
                    value={address.street}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                  />
                  {registerForm.errors.addresses?.[index]?.street &&
                    registerForm.touched.addresses?.[index]?.street && (
                      <div className="alert alert-danger">
                        {registerForm.errors.addresses[index].street}
                      </div>
                    )}
                </div>

                {/* City */}
                <div className="form-group mb-3">
                  <label htmlFor={`addresses[${index}].city`}>City:</label>
                  <input
                    name={`addresses[${index}].city`}
                    type="text"
                    className="form-control"
                    value={address.city}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                  />
                  {registerForm.errors.addresses?.[index]?.city &&
                    registerForm.touched.addresses?.[index]?.city && (
                      <div className="alert alert-danger">
                        {registerForm.errors.addresses[index].city}
                      </div>
                    )}
                </div>

                {/* Country */}
                <div className="form-group mb-3">
                  <label htmlFor={`addresses[${index}].country`}>
                    Country:
                  </label>
                  <input
                    name={`addresses[${index}].country`}
                    type="text"
                    className="form-control"
                    value={address.country}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                  />
                  {registerForm.errors.addresses?.[index]?.country &&
                    registerForm.touched.addresses?.[index]?.country && (
                      <div className="alert alert-danger">
                        {registerForm.errors.addresses[index].country}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </Col>
        </Row>

        {serverMessage && (
          <div className="alert alert-danger">{serverMessage}</div>
        )}

        <button type="submit" className="btn btn-info mt-2 mb-5">
          Register
        </button>
      </form>
    </Container>
  );
}
