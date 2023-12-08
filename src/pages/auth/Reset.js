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

const Login = () => {
  const [alertMessage, setAlertMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    otp: "",
    new_password: "",
  };
  const validationSchema = Yup.object().shape({
    otp: Yup.number().required("OTP is required"),
    new_password: Yup.string().required("New Password is required"),
  });

  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  const resetPassword = (values) => {
    axios
      .put("http://localhost:4000/api/password/reset", values)
      .then((res) => {
        if (res.data.success) {
          setAlertMessage("Password Reset Successfully");
          setShowAlert(true);
          navigate("/auth/login");
        }
      })
      .catch((error) => {
        setAlertMessage(error.response.data.msg);
        setShowAlert(true);
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
                  {showAlert && (
                    <CAlert
                      color="warning"
                      dismissible
                      onClose={() => setShowAlert(false)}
                    >
                      {alertMessage}
                    </CAlert>
                  )}
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
                        type="number"
                        name="otp"
                        id="otp"
                        placeholder="OTP"
                        onChange={loginForm.handleChange}
                        value={loginForm.values.otp}
                      />
                      {loginForm.errors.otp && loginForm.touched.otp && (
                        <div className="invalid-feedback">
                          {loginForm.errors.otp}
                        </div>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <span role="button" onClick={() => alert("hello")}>
                          <i className="bi bi-eye-slash"></i>
                        </span>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="new_password"
                        id="new_password"
                        placeholder="New Password"
                        onChange={loginForm.handleChange}
                        value={loginForm.values.password}
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
                        <CButton color="link">Resend OTP</CButton>
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

export default Login;
