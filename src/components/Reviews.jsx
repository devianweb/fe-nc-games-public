import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./css/Reviews.css";

// MUI STUFF
import { Paper, LinearProgress } from "@mui/material";
// END OF MUI STUFF

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://ian-nc-games.herokuapp.com/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setReviews(data.reviews);
      });
  }, []);

  return (
    <Paper className="paper-container" elevation={2}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div className="flex-container">
          {reviews.map((review) => {
            return <ReviewCard review={review} key={review.review_id} />;
          })}
        </div>
      )}
    </Paper>
  );
};

export default Reviews;
