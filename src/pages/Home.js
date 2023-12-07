import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "./common/PageTitle";

const Home = () => {
  return (
    <div>
      <PageTitle title={"Home"} />
      <h1>Home Page</h1>
      <Link to={"/about"}>About</Link>
      <br />
      <Link to={"/auth"}>Login</Link>
    </div>
  );
};

export default Home;
