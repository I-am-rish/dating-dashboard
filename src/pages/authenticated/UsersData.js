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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Snackbar, createStyles, makeStyles } from "@mui/material";
// const  from "mui/styles"
import CloseIcon from "@mui/icons-material/Close";
import httpClient from "../../util/HttpClient";
import swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const UserData = () => {
  const [alertMessage, setAlertMessage] = useState();
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [closeSnakeBar, setCloseSnakeBar] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [rows, setRows] = useState([]);
  // const [search, setSearch] = useState();
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [filterMode, setFilterMode] = useState("name");

  const columns = [
    { field: "col1", headerName: "#", width: 80 },
    { field: "col2", headerName: "Name", width: 200 },
    { field: "col3", headerName: "email", width: 300 },
    { field: "col4", headerName: "Phone Number", width: 160 },
    { field: "col5", headerName: "Created Date", width: 170 },
    {
      field: "col6",
      headerName: "Action",
      width: 125,
      renderCell: (params) => {
        return (
          <DeleteIcon
            cursor={"pointer"}
            style={{ color: "red" }}
            onClick={(e) => confirmBeforeDelete(e, params.row)}
          />
        );
      },
    },
  ];

  //handle get confirmation before delete user
  const confirmBeforeDelete = (e, params) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteSingleUser(e, params);
        }
      });
  };

  const deleteSingleUser = (e, params) => {
    const userId = params.id;
    httpClient
      .delete(`/admin/users/user/delete?id=${userId}`)
      .then((res) => {
        setAlertMessage(res.data.message);
        setApiSuccess(true);
        setApiError(false);
        setCloseSnakeBar(true);
        setLoading(false);
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        setApiError(true);
        setApiSuccess(false);
        setCloseSnakeBar(true);
        // setLoading(false)
      });
  };

  //fetching user information
  useEffect(() => {
    httpClient
      .get(
        `/admin/users?pageNumber=${paginationModel.page}&resultPerPage=${paginationModel.pageSize}`
      )
      .then((res) => {
        setUserCount(res.data.usersCount);
        setLoading(false);
        setRows(
          res.data.users.map((user, index) => {
            return {
              id: user._id,
              col1: index + 1,
              col2: user.name,
              col3: user.email,
              col4: user.mobile,
              col5: user.createdAt.substring(0, 10),
            };
          })
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
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
      // setSearch(searchValue);
      httpClient
        .get(`/admin/users?keyword=${searchValue}&key=${filterMode}`)
        .then((res) => {
          setUserCount(res.data.users.length);
          if (res.status === 200) {
            setLoading(false);
            setRows(
              res.data.users.map((user, index) => {
                return {
                  id: user._id,
                  col1: index + 1,
                  col2: user.name,
                  col3: user.email,
                  col4: user.mobile,
                  col5: user.createdAt.substring(0, 10),
                };
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
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

        <CContainer>
          <h4 className="">Users</h4>
          <div
            style={{
              minHeight: "300px",
              border: "1px solid gray",
              padding: 15,
              borderRadius: 5,
            }}
          >
            <Snackbar
              open={closeSnakeBar}
              autoHideDuration={1000}
              message={alertMessage}
              ContentProps={{
                sx: apiSuccess
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" },
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
                    onClick={() => setCloseSnakeBar(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </React.Fragment>
              }
            />
            <div
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
              }}
            >
              <CCol xs={5} style={{}}>
                Show
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="10"
                  defaultValue={"10"}
                  outline="none"
                  title="Enter a Number"
                  cursor="pointer"
                  min={0}
                  style={{
                    width: "40px",
                    outline: "none",
                    borderRadius: 5,
                    border: "1px solid gray",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textAlign: "center",
                    height: 25,
                    
                  }}
                  onChange={handleRecordPerPage}
                />
                Records per page
              </CCol>
              <CCol
                xs={6}
                style={{
                  width: "30%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Search:&nbsp;
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  style={{
                    width: "100%",
                    outline: "none",
                    borderRadius: 5,
                    border: "1px solid gray",
                  }}
                  onChange={handleSearch}
                />
                {/* <select
                  onClick={(e) => setFilterMode(e.target.value)}
                  style={{ borderRadius: 5, outline: "none" }}
                >
                  <option disabled selected>select</option>
                  <option value={"name"}>name</option>
                  <option value="email">email</option>
                  <option value="mobile">mobile</option>
                </select> */}
              </CCol>
            </div>
            <DataGrid
              sx={{
                "& .MuiDataGrid-row:nth-of-type(2n)": {
                  backgroundColor: "#d5dbd6",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#d5dbd6",
                  // height: "40px !important",
                },
              }}
             
              rows={rows}
              columns={columns}
              // pageSizeOptions={[5, 10, 15]}
              rowCount={userCount}
              disableRowSelectionOnClick
              pagination
              paginationMode="server"
              paginationModel={paginationModel}
              disableColumnMenu
              onPaginationModelChange={setPaginationModel}
              loading={loading}
              autoHeight
            />
          </div>
        </CContainer>
      </div>
    </>
  );
};

export default React.memo(UserData);
