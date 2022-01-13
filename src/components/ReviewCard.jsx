import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import "./css/ReviewCard.css";

const ReviewCard = ({ review }) => {
  const screenSize = useMediaQuery("only screen and (max-width: 600px)");

  return (
    <Link to={`/reviews/${review.review_id}`}>
      <Paper elevation={2} className="flex-item ReviewCard-container">
        <p className="title">{review.title}</p>
        <p className="owner">{review.owner}</p>
        <div className="review-body">
          {screenSize ? null : review.review_body.slice(0, 150) + "..."}
        </div>
        <img src={review.review_img_url} className="review-img-url" alt="" />
        <div className="details">
          <p>👍 {review.votes}</p>
          <p>💬 {review.comment_count}</p>
        </div>
      </Paper>
    </Link>
  );
};

export default ReviewCard;
