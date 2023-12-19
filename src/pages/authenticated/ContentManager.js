import React, { useEffect, useState } from "react";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import PageTitle from "../common/PageTitle";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import httpClient from "../../util/HttpClient";
import swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import EditContent from "./EditContent";

const ContentManager = () => {
  const [alertMessage, setAlertMessage] = useState();
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [closeSnakeBar, setCloseSnakeBar] = useState(false);
  const [contentCount, setContentCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(false);
  const [editContent, setEditContent] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "col1", headerName: "#", width: 150 },
    { field: "col2", headerName: "Title", width: 350 },
    { field: "col5", headerName: "Created Date", width: 350 },
    {
      field: "col6",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <EditIcon
            cursor={"pointer"}
            style={{ color: "green" }}
            onClick={(e) => confirmBeforeEdit(e, params.row)}
          />
        );
      },
    },
  ];

  //handle get confirmation before delete user
  const confirmBeforeEdit = (e, params) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, edit it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          //collar func
          setEditContent({
            id: params.id,
            title: params.col2,
            content: params.col3,
          });
          setEditor(true);
        }
      });
  };

  //fetching information
  useEffect(() => {
    httpClient
      .get(`/admin/content?pageNumber=${paginationModel.page}&resultPerPage=${paginationModel.pageSize}`)
      .then((res) => {
        setContentCount(res.data.contentCount);
        setLoading(false);
        setRows(
          res.data.contentData.map((content, index) => {
            return {
              id: content._id,
              col1: index + 1,
              col2: content.title,
              col3: content.content,
              // col5: content.createdAt.substring(0, 10),
            };
          })
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.data) console.log(error.response.data.message);
      });
  }, [paginationModel, alertMessage]);

  const handleRecordPerPage = (e) => {
    setLoading(true);
    paginationModel.pageSize = e.target.value;
    setPaginationModel({ ...paginationModel });
  };

  const handleSearch = (e) => {
    setLoading(true);
    let searchValue = e.target.value.trim();
    //if search keyword length is less than 1, reset the user info
    if (searchValue.length <= 0) {
      setPaginationModel({ page: 0, pageSize: 10 });
    }

    if (searchValue || searchValue === " ") {
      searchValue = searchValue.trim();
      setSearch(searchValue);
      httpClient
        .get(`/admin/content?keyword=${searchValue}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(searchValue)
            console.log(res.data.contentData);
            setLoading(false);
            setRows(
              res.data.contentData.map((user, index) => {
                return {
                  id: user._id,
                  col1: index + 1,
                  col2: user.name,
                  col3: user.email,
                  col4: user.mobile,
                  col5: user.createdAt,
                };
              })
            );
          }
        })
        .catch((err) => {
          console.log("content manager", err);
        });
    }

    return;
  };
  return (
    <>
      <AppSidebar />
      <div className="wrapper bg-light min-vh-100 m-2 d-flex-column align-items-center">
        <AppHeader />
        <PageTitle title="user management" />

        {!editor ? (
          <CContainer className="">
            <h4 className="">Pages</h4>
            <CRow className="justify-content-center">
              <CCol md={12}>
                <CCardGroup>
                  <CCard className="">
                    <CCardBody>
                      <CRow
                        className="d-flex pb-2"
                        sx={{ backgroundColor: "red" }}
                      >
                        <CCol xs={6}>
                          Show &nbsp;
                          <input
                            type="number"
                            id="number"
                            name="number"
                            placeholder="10"
                            defaultValue={"10"}
                            style={{
                              width: "45px",
                              outline: "none",
                            }}
                            onChange={handleRecordPerPage}
                          />
                          &nbsp; Records per page
                        </CCol>
                        <CCol xs={6}>
                          Search:&nbsp;&nbsp;
                          <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search..."
                            style={{ outline: "none" }}
                            onChange={handleSearch}
                          />
                        </CCol>
                      </CRow>
                      {/* <div style={{width:"100%",}}> */}
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        // pageSizeOptions={[5, 10, 15]}
                        rowCount={contentCount}
                        disableRowSelectionOnClick
                        pagination
                        paginationMode="server"
                        paginationModel={paginationModel}
                        disableColumnMenu
                        onPaginationModelChange={setPaginationModel}
                        loading={loading}
                      />
                      {/* </div> */}
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        ) : (
          <EditContent editContent={editContent} callback={setEditor} />
        )}
      </div>
    </>
  );
};

export default React.memo(ContentManager);
