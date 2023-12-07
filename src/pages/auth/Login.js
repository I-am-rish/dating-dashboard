import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CAlert } from "@coreui/react";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import PageTitle from "../common/PageTitle";
import { useFormik } from "formik";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("sdfsdf");
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      login(values);
      //   setShowAlert(true);
      //   setAlertMessage("Hello world");
    },
  });

  const login = async (userInfo) => {
    axios
      .post("http://localhost:4000/api/login", userInfo)
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          navigate("/web/dashboard");
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
        setApiError(error.response.data.msg)
      });
  };

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <PageTitle title={"Login"} />
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    {showAlert && (
                      <CAlert
                        color="warning"
                        dismissible
                        onClose={() => setShowAlert(false)}
                      >
                        {alertMessage}
                      </CAlert>
                    )}
                    {/* <button onClick={handleClick}>Open simple snackbar</button> */}
                    <Snackbar
                      open={true}
                      autoHideDuration={60}
                      message={apiError}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      action={
                        <React.Fragment>
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={() => console.log("close snackbar")}
                          >
                            <CloseIcon />
                          </IconButton>
                        </React.Fragment>
                      }
                    />
                    <CForm onSubmit={loginForm.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <span>
                            <i className="bi bi-envelope"></i>
                          </span>
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          name="email"
                          id="email"
                          onChange={loginForm.handleChange}
                          value={loginForm.values.email}
                        />
                        {loginForm.errors.email && loginForm.touched.email && (
                          <div className="invalid-feedback">
                            {loginForm.errors.email}
                          </div>
                        )}
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <span role="button" onClick={handleShowPassword}>
                            <i
                              className={
                                showPassword ? "bi bi-eye" : "bi bi-eye-slash"
                              }
                            ></i>
                          </span>
                        </CInputGroupText>
                        <CFormInput
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          id="password"
                          onChange={loginForm.handleChange}
                          value={loginForm.values.password}
                        />
                        {loginForm.errors.password &&
                          loginForm.touched.password && (
                            <div className="invalid-feedback">
                              {loginForm.errors.password}
                            </div>
                          )}
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            type="submit"
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <Link className="px-0" to={"/auth/forgot"}>
                            Forgot Password?
                          </Link>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
