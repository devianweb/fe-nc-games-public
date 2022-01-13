import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import "./css/Comments.css";
import { UserContext } from "../contexts/User/User";

// MUI STUFF
import { Paper, Button, TextField } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
// END OF MUI STUFF

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [render, setRender] = useState(false);
  const [comErr, setComErr] = useState(false);
  const { user } = useContext(UserContext);

  const { review_id } = useParams();

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleClick = () => {
    setComErr(false);
    setRender(false);
    fetch(
      `https://ian-nc-games.herokuapp.com/api/reviews/${review_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          body: newComment,
        }),
      }
    ).then(() => {
      setNewComment("");
      setRender(true);
    });
  };

  const checkEmpty = () => {
    if (newComment !== "") {
      return handleClick();
    } else {
      setComErr(true);
    }
  };

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
  }, [review_id, render]);

  return isLoading ? null : (
    <>
      <Paper className="paper-container comments">
        {user !== "" ? (
          <>
            <TextField
              error={comErr}
              id="outlined-required"
              label="New Comment"
              placeholder="Enter comment here..."
              multiline
              onChange={handleChange}
              value={newComment}
            />
            <div className="post-comment">
              <Button
                variant="contained"
                startIcon={<AddCommentIcon />}
                onClick={checkEmpty}
              >
                POST
              </Button>
            </div>
          </>
        ) : (
          <p>YOU MUST BE LOGGED IN TO COMMENT OR VOTE!</p>
        )}
      </Paper>
      <Paper className="paper-container" elevation={2}>
        {comments.length === 0 ? (
          <p>There are no comments on this review!</p>
        ) : (
          comments.map((comment) => {
            return (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                setRender={setRender}
              />
            );
          })
        )}
      </Paper>
    </>
  );
};

export default Comments;
