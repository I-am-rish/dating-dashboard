import React from "react";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const Dashboard = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardHeader>Traffic {" & "} Sales</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} md={6} xl={6}>
                      <CRow>
                        <CCol sm={6}>
                          <div className="border-start border-start-4 border-start-info py-1 px-3">
                            <div className="text-medium-emphasis small">
                              New Clients
                            </div>
                            <div className="fs-5 fw-semibold">9,123</div>
                          </div>
                        </CCol>
                        <CCol sm={6}>
                          <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                            <div className="text-medium-emphasis small">
                              Recurring Clients
                            </div>
                            <div className="fs-5 fw-semibold">22,643</div>
                          </div>
                        </CCol>
                      </CRow>

                      <hr className="mt-0" />
                    </CCol>

                    <CCol xs={12} md={6} xl={6}>
                      <CRow>
                        <CCol sm={6}>
                          <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                            <div className="text-medium-emphasis small">
                              Pageviews
                            </div>
                            <div className="fs-5 fw-semibold">78,623</div>
                          </div>
                        </CCol>
                        <CCol sm={6}>
                          <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                            <div className="text-medium-emphasis small">
                              Organic
                            </div>
                            <div className="fs-5 fw-semibold">49,123</div>
                          </div>
                        </CCol>
                      </CRow>

                      <hr className="mt-0" />

                      {/* <div className="mb-5"></div> */}
                    </CCol>
                  </CRow>

                  <br />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Dashboard;
