import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./css/Review.css";

// MUI STUFF
import { Paper, LinearProgress } from "@mui/material";
// END OF MUI STUFF

const Review = () => {
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ian-nc-games.herokuapp.com/api/reviews/${review_id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setReview(data.review);
      });
  }, [review_id]);

  return (
    <>
      <Paper className="paper-container" elevation={2}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <div className="Review-container">
            <p className="t">{review.title}</p>
            <p className="o">{review.owner}</p>
            <p className="c">{review.category}</p>
            <p className="d">{review.designer}</p>
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
