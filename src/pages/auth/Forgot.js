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

const Forgot = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Forgot Password</h1>
                                        <p className="text-medium-emphasis">Enter email to get OTP</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <span role="button" onClick={() => alert('hello')}>
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                            </CInputGroupText>
                                            <CFormInput placeholder="Email" autoComplete="username" />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4">
                                                    OTP
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <Link className='px-0' to={'/auth/login'}>Back to login</Link>
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

export default Forgot
