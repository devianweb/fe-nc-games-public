import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";

// MUI STUFF
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
        <Route path="/" element={<Reviews />} />
      </Routes>
    </div>
  );
}

export default App;
