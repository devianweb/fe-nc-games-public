import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User/User";

import "./css/Review.css";

// MUI STUFF
import { Paper, LinearProgress, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// END OF MUI STUFF

const Review = () => {
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);
  const { user } = useContext(UserContext);

  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ian-nc-games.herokuapp.com/api/reviews/${review_id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setReview(data.review);
      });
  }, [review_id, render]);

  const handleClick = () => {
    setRender(false);
    fetch(`https://ian-nc-games.herokuapp.com/api/reviews/${review_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inc_votes: 1 }),
    }).then(() => {
      setRender(true);
    });
  };

  return (
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
                disabled={user ? false : true}
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
