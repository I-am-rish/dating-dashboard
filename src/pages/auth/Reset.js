import React from 'react'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PageTitle from '../common/PageTitle'

const Login = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <PageTitle title={'Reset Password'} />
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Reset Password</h1>
                                        <p className="text-medium-emphasis">Enter details to reset your password</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <span>
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                            </CInputGroupText>
                                            <CFormInput placeholder="OTP" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <span role="button" onClick={() => alert('hello')}>
                                                    <i className="bi bi-eye-slash"></i>
                                                </span>
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="New Password"
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4">
                                                    Reset
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" >Resend OTP</CButton>
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
    )
}

export default Login
