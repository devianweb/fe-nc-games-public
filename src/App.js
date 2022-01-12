import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Comments from "./components/Comments";

// MUI STUFF
import {} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import { Grid } from "@mui/material/";
// END OF MUI STUFF

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/reviews" />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route
          path="/reviews/:review_id"
          element={
            <>
              <Review />
              <Comments />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
