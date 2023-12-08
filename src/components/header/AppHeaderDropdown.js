import React from "react";
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
// import {
//   cilBell,
//   cilCreditCard,
//   cilCommentSquare,
//   cilEnvelopeOpen,
//   cilFile,
//   cilLockLocked,
//   cilSettings,
//   cilTask,
//   cilUser,
// } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'

import avatar8 from "./../../assets/images/avatars/8.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    axios
      .get("http://localhost:4000/api/logout")
      .then((res) => {
        if(res.data.success){
          console.log(res);
          navigate("/auth/login")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        <Link className="dropdown-item" to={"/web/profile"}>
          {" "}
          <i className="bi bi-person-square"></i>&nbsp;Profile
        </Link>
        <Link className="dropdown-item" to={"/web/settings"}>
          {" "}
          <i className="bi bi-gear-fill"></i>&nbsp;Settings
        </Link>

        <CDropdownDivider />
        <Link className="dropdown-item" onClick={handleLogOut}>
          {" "}
          <i className="bi bi-box-arrow-right text-danger"></i>&nbsp;Log out
        </Link>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
