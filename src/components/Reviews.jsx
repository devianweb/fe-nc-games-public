import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./css/Reviews.css";

// MUI STUFF
import {
  Paper,
  LinearProgress,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
// END OF MUI STUFF

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [fetchingReviews, setfetchingReviews] = useState(true);
  const [fetchingCategories, setfetchingCategories] = useState(true);

  useEffect(() => {
    setfetchingReviews(true);
    const queries = filter === "" ? "" : `&category=${filter}`;
    const sorting = sort === "" ? `?sort_by=review_id` : `?sort_by=${sort}`;
    fetch(`https://ian-nc-games.herokuapp.com/api/reviews${sorting}${queries}`)
      .then((res) => res.json())
      .then((data) => {
        setfetchingReviews(false);
        setReviews(data.reviews);
      });
  }, [filter, sort]);

  useEffect(() => {
    setfetchingCategories(true);
    fetch("https://ian-nc-games.herokuapp.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setfetchingCategories(false);
        setCategories(data.categories);
      });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleClear = () => {
    setFilter("");
    setSort("");
  };

  return (
    <>
      {fetchingReviews && fetchingCategories ? (
        <Paper className="paper-container" elevation={2}>
          <LinearProgress />
        </Paper>
      ) : (
        <Paper className="paper-container filter-bar" elevation={2}>
          <div className="clear-button">
            <Button
              variant="contained"
              startIcon={<ClearIcon />}
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
          <FormControl>
            <InputLabel variant="standard">Filter Category</InputLabel>
            <NativeSelect value={filter} onChange={handleFilter}>
              <option value={""}></option>
              {categories.map((category) => {
                return <option value={category.slug}>{category.slug}</option>;
              })}
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel variant="standard">Sort Categories</InputLabel>
            <NativeSelect value={sort} onChange={handleSort}>
              <option value={""}></option>
              <option value={"created_at"}>creation date</option>
              <option value={"comment_count"}>comment count</option>
              <option value={"votes"}>votes</option>
            </NativeSelect>
          </FormControl>
        </Paper>
      )}
      {fetchingReviews ? (
        <Paper className="paper-container" elevation={2}>
          <LinearProgress />
        </Paper>
      ) : (
        <Paper className="paper-container flex-container" elevation={2}>
          {reviews.map((review) => {
            return <ReviewCard review={review} key={review.review_id} />;
          })}
        </Paper>
      )}
    </>
  );
};

export default Reviews;
