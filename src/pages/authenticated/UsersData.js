import React, { useEffect, useState } from "react";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";
import { CContainer } from "@coreui/react";
import PageTitle from "../common/PageTitle";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const UserData = () => {
  const [user, setUser] = useState([]);
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
      .get("http://localhost:4000/api/admin/users")
      .then((res) => {
        // console.log(res.data.data.users);
        let rows = res.data.data.users.map((user, index) => {
          console.log(user);
          return {
            id: index + 1,
            col1: index + 1,
            col2: user.name,
            col3: user.email,
            col4: user.mobile,
            col5: user.createdAt,
            col6: <DeleteIcon />,
          };
        });
        // console.log(rows);
        setUser(() => rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  var rows = user;
  console.log(rows);

  return (
    <>
      <AppSidebar />
      <div className="wrapper bg-light min-vh-100">
        <AppHeader />
        <h4>Users</h4>
        <CContainer>
          <PageTitle title="user management" />
          <DataGrid className="" rows={rows} columns={columns} />
        </CContainer>
      </div>
    </>
  );
};

export default React.memo(UserData);
