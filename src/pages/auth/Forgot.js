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
import { useFormik } from "formik";
import axios from "axios";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Forgot = () => {
  const [alertMessage, setAlertMessage] = useState();
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [openSnakeBar, setOpenSnakeBar] = useState(false);

  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });

  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      //   alert("hello");
      window.localStorage.setItem("email", JSON.stringify(values));
      sendOTP(values);
      // setAlertMessage("Hello world");
    },
  });

  const sendOTP = (email) => {
    axios
      .post("http://localhost:4000/api/password/forgot", email)
      .then((res) => {
        if (res.data.success) {
          setAlertMessage("Email sent to Your Email");
          setApiSuccess("Email sent to Your Email");
          setOpenSnakeBar(true);
          navigate("/auth/reset");
        }
      })
      .catch((error) => {
        setApiError(error.response.data.message);
        setAlertMessage(error.response.data.message);
        setOpenSnakeBar(true);
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Snackbar
                    open={openSnakeBar}
                    autoHideDuration={1000}
                    message={alertMessage}
                    color="red"
                    ContentProps={{
                      sx: apiSuccess
                        ? { color: "green", backgroundColor: "gray" }
                        : { color: "red", backgroundColor: "gray" },
                    }}
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
                          onClick={() => setOpenSnakeBar(false)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </React.Fragment>
                    }
                  />
                  <CForm onSubmit={loginForm.handleSubmit}>
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">
                      Enter email to get OTP
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <span>
                          <i className="bi bi-envelope"></i>
                        </span>
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        // autoComplete="username"
                        onChange={loginForm.handleChange}
                        onClick={() => setOpenSnakeBar(false)}
                        value={loginForm.values.email}
                      />
                      {loginForm.errors.email && loginForm.touched.email && (
                        <div className="invalid-feedback">
                          {loginForm.errors.email}
                        </div>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          OTP
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link className="px-0" to={"/auth/login"}>
                          Back to login
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
  );
};

export default Forgot;
