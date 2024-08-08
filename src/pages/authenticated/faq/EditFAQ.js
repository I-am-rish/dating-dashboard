import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import AppSidebar from "../../../components/AppSidebar";
import AppHeader from "../../../components/AppHeader";
import PageTitle from "../../common/PageTitle";
import httpClient from "../../../util/HttpClient";
import Loader from "../../../components/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const EditFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submittedQA, setSubmittedQA] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();
  let navigate = useNavigate();

  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const handleAnswerChange = (e) => setAnswer(e.target.value);

  const handleSubmit = () => {
    setIsLoading(false);
    setSubmittedQA({ question, answer });
    setQuestion("");
    setAnswer("");
    httpClient
      .put(`/admin/update-faq/${params.id}`, { question, answer })
      .then((res) => {
        setIsLoading(true);
        navigate(-1);
      })
      .catch((err) => {
        setIsLoading(true);
        console.log(err);
      });
  };

  useEffect(() => {
    httpClient.get(`/admin/get-faq/${params.id}`).then((res) => {
      setAnswer(res.data.result.answer);
      setQuestion(res.data.result.question);
      setIsLoading(false);
    });
  },[]);

  return (
    <>
      <AppSidebar />
      <div className="wrapper bg-light min-vh-100 d-flex-column align-items-center">
        <AppHeader />
        <PageTitle title="Update FAQ" />

        <Container maxWidth="sm">
          {isLoading && <Loader />}
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 4 }}>
            <TextField
              label="Question"
              value={question}
              onChange={handleQuestionChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <textarea
              label="Answer"
              value={answer}
              onChange={handleAnswerChange}
              fullWidth
              margin="normal"
              variant="outlined"
              rows="16"
              
              cols="55"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Box>
          {submittedQA && (
            <Paper sx={{ mt: 4, p: 2 }}>
              <Typography variant="h6">
                Submitted Question and Answer
              </Typography>
              <Typography variant="subtitle1">
                <strong>Question:</strong> {submittedQA.question}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Answer:</strong> {submittedQA.answer}
              </Typography>
            </Paper>
          )}
        </Container>
      </div>
    </>
  );
};

export default EditFAQ;
