import React, { useEffect, useState } from "react";
// import Loader from "../../components/loader/Loader";
import httpClient from "../../util/HttpClient";
import axios from "axios";

const Profile = () => {
  const [file, setFile] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // if (!file || !(file instanceof File)) return;
    console.log(file);
    let formData = new FormData();
    formData.append("avatar", file);

    httpClient
      .post("/user/profile/avatar", formData, {
        // headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // console.log("Profile image uploaded successfully!");
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="file"
          name="avatar"
          filename={file}
          onChange={(e) => setFile(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default Profile;
