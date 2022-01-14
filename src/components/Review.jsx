import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User/User";
import NotFoundPage from "./NotFoundPage";
import { patchReviewById, getReviewById } from "./utils/api";

import "./css/Review.css";

// MUI STUFF
import { Paper, LinearProgress, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// END OF MUI STUFF

const Review = () => {
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [voted, setVoted] = useState(false);
  const { user } = useContext(UserContext);

  const { review_id } = useParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getReviewById(review_id)
      .then((data) => {
        setIsLoading(false);
        setReview(data.review);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [review_id]);

  const handleClick = () => {
    patchReviewById(review_id)
      .then(() => {
        setReview((currReview) => {
          return { ...currReview, votes: currReview.votes + 1 };
        });
        setVoted(true);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return isError ? (
    <NotFoundPage />
  ) : (
    <>
      <Paper className="paper-container" elevation={2}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <div className="Review-container">
            <p className="t">Title: {review.title}</p>
            <p className="o">Owner: {review.owner}</p>
            <p className="c">Category: {review.category}</p>
            <p className="des">Designer: {review.designer}</p>
            <div className="v">
              <p>votes: {review.votes}</p>
              <IconButton
                aria-label="delete"
                className="vb"
                onClick={handleClick}
                disabled={(user ? false : true) || voted}
              >
                <ThumbUpIcon />
              </IconButton>
            </div>
            <img src={review.review_img_url} className="i" alt="" />
          </div>
        )}
      </Paper>
      {isLoading ? null : (
        <Paper className="paper-container" elevation={2}>
          <p>{review.review_body}</p>
        </Paper>
      )}
    </>
  );
};

export default Review;
