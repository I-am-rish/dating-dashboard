import React, { useEffect, useState } from "react";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";
import { CContainer } from "@coreui/react";
import PageTitle from "../common/PageTitle";
import { DataGrid, GridDeleteForeverIcon } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserData = () => {
  const [alertMessage, setAlertMessage] = useState();
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [closeSnakeBar, setCloseSnakeBar] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [rows, setRows] = React.useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "col1", headerName: "#", width: 70 },
    { field: "col2", headerName: "Name", width: 150 },
    { field: "col3", headerName: "email", width: 250 },
    { field: "col4", headerName: "Phone Number", width: 150 },
    { field: "col5", headerName: "Created Date", width: 170 },
    {
      field: "col6",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return (
          <DeleteIcon
            cursor={"pointer"}

            onClick={(e) => handleDeleteButton(e, params.row)}
          />
        );
      },
    },
  ];

  const handleDeleteButton = (e, params) => {
    const userId = params.id;
    axios
      .delete(`http://localhost:4000/api/admin/users/user/delete?id=${userId}`)
      .then((res) => {
        setAlertMessage(res.data.message);
        setApiSuccess(true);
        setApiError(false);
        setCloseSnakeBar(true);
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        setApiError(true);
        setApiSuccess(false);
        setCloseSnakeBar(true);
      });
  };

  //fetching user information
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/admin/users?pageNumber=${paginationModel.page}&resultPerPage=${paginationModel.pageSize}`
      )
      .then((res) => {
        setUserCount(res.data.usersCount);
        setRows(
          res.data.users.map((user, index) => {
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
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [paginationModel, alertMessage]);

  return (
    <>
      <AppSidebar />
      <div className="wrapper bg-light min-vh-100 m-2">
        <AppHeader />
        <h4 className="">Users</h4>
        <CContainer>
          <PageTitle title="user management" />
          <Snackbar
            open={closeSnakeBar}
            autoHideDuration={1000}
            message={alertMessage}
            ContentProps={{
              sx: apiSuccess
                ? { color: "green" }
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
                  onClick={() => setCloseSnakeBar(false)}
                >
                  <CloseIcon />
                </IconButton>
              </React.Fragment>
            }
          />
          <DataGrid
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
          />
        </CContainer>
      </div>
    </>
  );
};

export default React.memo(UserData);
