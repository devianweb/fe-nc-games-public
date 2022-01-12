import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

// MUI STUFF
import { Paper } from "@mui/material";
// END OF MUI STUFF

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://ian-nc-games.herokuapp.com/api/reviews/${review_id}/comments`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setComments(data.comments);
      });
  }, [review_id]);

  return isLoading ? null : (
    <Paper className="paper-container" elevation={2}>
      {comments.length === 0 ? (
        <p>There are no comments on this review!</p>
      ) : (
        comments.map((comment) => {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        })
      )}
    </Paper>
  );
};

export default Comments;
