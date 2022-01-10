import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./Reviews.css";

// MUI STUFF
import { CircularProgress, Paper } from "@mui/material";
// END OF MUI STUFF

const Reviews = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://ian-nc-games.herokuapp.com/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
      });
  }, []);

  return (
    <Paper className="paper-container Reviews" elevation={2}>
      {isLoading ? <CircularProgress /> : <ReviewCard />}
    </Paper>
  );
};

export default Reviews;
