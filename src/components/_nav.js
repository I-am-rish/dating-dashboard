import React from "react";
import { CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Admin",
    to: "/web/dashboard",
    icon: <i className="bi bi-speedometer"></i>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/web/user/profile",
    icon: <i className="bi bi-person"></i>,
  },
  {
    component: CNavItem,
    name: "Users Management",
    to: "/web/users",
    icon: <i className="bi bi-person"></i>,
  },
  {
    component: CNavItem,
    name: "Content Pages",
    to: "/web/content",
    icon: <i className="bi bi-file-text"></i>,
  },
];

export default _nav;
