import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import NotFoundPage from "./components/NotFoundPage";
import Comments from "./components/Comments";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
