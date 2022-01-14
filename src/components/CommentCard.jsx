import { Paper, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "@react-hook/media-query";
import { UserContext } from "../contexts/User/User";
import { useContext } from "react";
import "./css/CommentCard.css";

const CommentCard = ({ comment, setComments }) => {
  const { user } = useContext(UserContext);

  const screenSize = useMediaQuery("only screen and (max-width: 600px)");

  const handleDelete = () => {
    fetch(
      `https://ian-nc-games.herokuapp.com/api/comments/${comment.comment_id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      setComments((prevComments) => {
        return prevComments.filter((value) => {
          return value.comment_id !== comment.comment_id;
        });
      });
    });
  };

  return (
    <Paper elevation={2} className="paper-container CommentCard-container">
      <div className="d">
        <p>{comment.author}</p>
        <p>
          {new Date(comment.created_at).toLocaleDateString("en-gb")}
          {screenSize
            ? null
            : " - " + new Date(comment.created_at).toLocaleTimeString("en-gb")}
        </p>
        <p>👍 {comment.votes}</p>
        {user === comment.author ? (
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <></>
        )}
      </div>
      <p className="b">{comment.body}</p>
      <IconButton disabled={true} className="vb">
        <ThumbUpIcon />
      </IconButton>
    </Paper>
  );
};

export default CommentCard;
