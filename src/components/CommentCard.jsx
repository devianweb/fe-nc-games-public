import { Paper, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useMediaQuery } from "@react-hook/media-query";
import "./css/CommentCard.css";

const CommentCard = ({ comment }) => {
  const screenSize = useMediaQuery("only screen and (max-width: 600px)");

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
      </div>
      <p className="b">{comment.body}</p>
      <IconButton aria-label="delete" className="vb">
        <ThumbUpIcon />
      </IconButton>
    </Paper>
  );
};

export default CommentCard;
