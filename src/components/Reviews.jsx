import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./css/Reviews.css";

// MUI STUFF
import { Paper, LinearProgress } from "@mui/material";
// END OF MUI STUFF

const Reviews = ({ isLoading, setIsLoading }) => {
  const [reviews, setReviews] = useState([]);

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
          {reviews.map((review, key) => {
            return <ReviewCard review={review} key={key} />;
          })}
        </div>
      )}
    </Paper>
  );
};

export default Reviews;
