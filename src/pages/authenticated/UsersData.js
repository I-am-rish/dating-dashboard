import React, { useEffect, useState } from "react";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";
import { CContainer } from "@coreui/react";
import PageTitle from "../common/PageTitle";
import { DataGrid, GridDeleteForeverIcon } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const UserData = () => {
  const [userCount, setUserCount] = useState(0);
  const [rows, setRows] = React.useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 1,
    pageSize: 2,
  });
  // const rows = [
  //   { id: 1, col1: 1, col2: "", col3: "", col4: "", col5: "", col6: "" },
  // ];

  const columns = [
    { field: "col1", headerName: "#", width: 50 },
    { field: "col2", headerName: "Name", width: 150 },
    { field: "col3", headerName: "email", width: 250 },
    { field: "col4", headerName: "Phone Number", width: 150 },
    { field: "col5", headerName: "Created Date", width: 150 },
    { field: "col6", headerName: "Action", width: 200 },
  ];

  //fetching user information
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/admin/users?pageNumber=${paginationModel.page}&resultPerPage=${paginationModel.pageSize}`
      )
      .then((res) => {
        // console.log(res.data.users);
        // setUserCount(res.data.usersCount)
        // console.log(res.data.usersCount);
        setRows(
          res.data.users.map((user, index) => {
            console.log(user);
            return {
              id: index + 1,
              col1: index + 1,
              col2: user.name,
              col3: user.email,
              col4: user.mobile,
              col5: user.createdAt,
              col6: actionButton,
            };
          })
        );
        // console.log(rows);
        // setUser(() => rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paginationModel]);

  function actionButton() {
    return <p>del</p>
  }

  // var rows = user;
  console.log(rows);

  return (
    <>
      <AppSidebar />
      <div className="wrapper bg-light min-vh-100">
        <AppHeader />
        <h4>Users</h4>
        <CContainer>
          <PageTitle title="user management" />
          <DataGrid
            className=""
            rows={rows}
            columns={columns}
            // initialState={{
            //   pagination:{
            //     paginationModel: {
            //       pageSize: 2,
            //     },
            //   },
            // }}
            pageSizeOptions
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
          />
        </CContainer>
      </div>
    </>
  );
};

export default React.memo(UserData);
