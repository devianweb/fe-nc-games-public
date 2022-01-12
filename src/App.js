import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import Review from "./components/Review";

// MUI STUFF
import {} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import { Grid } from "@mui/material/";
// END OF MUI STUFF

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/reviews" />} />
        <Route
          path="/reviews"
          element={
            <Reviews setIsLoading={setIsLoading} isLoading={isLoading} />
          }
        />
        <Route
          path="/reviews/:review_id"
          element={<Review setIsLoading={setIsLoading} isLoading={isLoading} />}
        />
      </Routes>
    </div>
  );
}

export default App;
