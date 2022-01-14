import "./css/NotFoundPage.css";

import { Paper } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Paper className="paper-container not-found" elevation={2}>
      <div>
        <img
          src="https://i.pinimg.com/originals/00/b0/1c/00b01cff53dc5dfb91c618ce55b89c35.jpg"
          alt=""
        />
      </div>
      <h2>something went horribly wrong!</h2>
      <h3>please go back to home!</h3>
    </Paper>
  );
};

export default NotFoundPage;
