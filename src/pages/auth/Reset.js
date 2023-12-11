import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  CAlert,
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
import "bootstrap-icons/font/bootstrap-icons.css";
import PageTitle from "../common/PageTitle";
import { useFormik } from "formik";
import axios from "axios";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, SetLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [closeSnakeBar, setCloseSnakeBar] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    resetOTP: "",
    new_password: "",
  };
  const validationSchema = Yup.object().shape({
    resetOTP: Yup.string().required("OTP is required"),
    new_password: Yup.string().required("New Password is required"),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      resetPassword(values);
    },
  });

  const resetPassword = (values) => {
    console.log("reset password");
    axios
      .put("http://localhost:4000/api/password/reset", values)
      .then((res) => {
        if (res.data.success) {
          setAlertMessage("Password Reset Successfully");
          setApiSuccess("Email sent to Your Email");
          setCloseSnakeBar(true);
          window.localStorage.clear();
          navigate("/auth/login");
        }
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        setApiError(error.response.data.message);
        setCloseSnakeBar(true);
      });
  };

  const sendOTP = () => {
    const email = JSON.parse(window.localStorage.getItem("email"));
    axios
      .post("http://localhost:4000/api/password/forget", email)
      .then((res) => {
        if (res.data.success) {
          setAlertMessage("OPT sent to Your Email");
          setApiSuccess("OTP sent to Your Email");
          setCloseSnakeBar(true);
        }
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        setApiError(error.response.data.message);
        setCloseSnakeBar(true);
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <PageTitle title={"Reset Password"} />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Snackbar
                    open={closeSnakeBar}
                    autoHideDuration={1000}
                    message={alertMessage}
                    color="red"
                    ContentProps={{
                      sx: apiSuccess
                        ? { color: "green" }
                        : { color: "red", backgroundColor: "gray" },
                    }}
                    // sx={{ color: "red" }}

                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                    action={
                      <React.Fragment>
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          sx={{ p: 0.5 }}
                          onClick={() => setCloseSnakeBar(false)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </React.Fragment>
                    }
                  />
                  <CForm onSubmit={loginForm.handleSubmit}>
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">
                      Enter details to reset your password
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <span>
                          <i className="bi bi-envelope"></i>
                        </span>
                      </CInputGroupText>
                      <CFormInput
                        // type="Number"
                        name="resetOTP"
                        id="resetOTP"
                        placeholder="OTP"
                        onChange={loginForm.handleChange}
                        value={loginForm.values.resetOTP}
                        onClick={() => setCloseSnakeBar(false)}
                      />
                      {loginForm.errors.resetOTP &&
                        loginForm.touched.resetOTP && (
                          <div className="invalid-feedback">
                            {loginForm.errors.resetOTP}
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
                        name="new_password"
                        id="new_password"
                        placeholder="New Password"
                        onChange={loginForm.handleChange}
                        value={loginForm.values.new_password}
                        onClick={() => setCloseSnakeBar(false)}
                      />
                      {loginForm.errors.new_password &&
                        loginForm.touched.new_password && (
                          <div className="invalid-feedback">
                            {loginForm.errors.new_password}
                          </div>
                        )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Reset
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" onClick={sendOTP}>
                          Resend OTP
                        </CButton>
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
  );
};

export default Reset;
