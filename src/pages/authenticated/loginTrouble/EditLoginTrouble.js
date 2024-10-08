import React, { useEffect, useRef, useState } from "react";

import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ClipLoader from "react-spinners/ClipLoader";
import swal from "sweetalert2";
import httpClient from "../../../util/HttpClient";
import AppSidebar from "../../../components/AppSidebar";
import AppHeader from "../../../components/AppHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

const EditLoginTrouble = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const params = useParams();
  const [question, setQuestion] = useState("");
  const editor = useRef(null);

  const navigate = useNavigate();

  const newLoginTroubleInfo = {
    question,
    answer,
  };

  const AddLoginTrouble = (e) => {
    setLoading(true);
    httpClient
      .patch(`/admin/update-login-trouble/${params.id}`, newLoginTroubleInfo)
      .then((res) => {
        setLoading(false);
        swal.fire({
          text: "Updated Successfully!",
          icon: "info",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate(-1);
      })
      .catch((err) => {
        setLoading(false);
        console.log("res ==> ", err);
        let msg = err?.response?.data?.message;
        swal.fire({
          text: { msg },
          icon: "info",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  const handleCloseButton = () => {
    navigate("/content");
  };

  useEffect(() => {
    httpClient.get(`/admin/login-trouble/${params.id}`).then((res) => {
      console.log("update login trouble ==> ", res);
      setQuestion(res?.data?.result.question)
      setAnswer(res?.data?.result.answer)
    });
  }, []);

  return (
    <>
      <AppSidebar />
      <div className="wrapper bg-light min-vh-100 d-flex-column align-items-center">
        <AppHeader />
        <Container>
          <div className="main p-5 ">
            <div className="d-flex flex-column mb-4 w-5 ">
              <Button
                variant="contained"
                // color="secondary"
                sx={{
                  mt: 0,
                  ml: 0,
                  mb: 4,
                  width: "90px",
                  backgroundColor: "orange",
                }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBackIcon />
                back
              </Button>
              <span className="w-5">Question: </span>
              <input
                className=""
                value={question}
                placeholder="write question here..."
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                  outline: "none",
                  padding: "2px"
                }}
              />
            </div>
            Answer:
            <textarea
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              value={answer}
              rows={8}
            ></textarea>
            <button onClick={AddLoginTrouble} className="Submit">
              Update Login Trouble
            </button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EditLoginTrouble;

const Container = styled.div`
  /* width: 100%; */
  /* min-height: 80vh; */
  /* height: fit-content; */
  display: flex;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin: 0;
  /* padding: 10px 5px; */
  /* box-sizing: border-box; */

  /* .header {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0;
    padding-left: 20px;
    color: gray;
  } */

  .main {
    width: 100%;
    margin-bottom: 0;
    display: flex;
    justify-self: right;
    align-self: center;
    flex-direction: column;

    .textarea {
      outline: "none";
      padding: "4px 2px";
    }
  }

  .Submit {
    background-color: orange;
    color: white;
    padding: 10px 20px;
    margin: 10px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }
`;
