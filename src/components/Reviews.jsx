import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./css/Reviews.css";
import { getReviews, getCategories } from "./utils/api";

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
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    setReviewsLoading(true);
    getReviews(filter, sort).then((data) => {
      setReviews(data.reviews);
      setReviewsLoading(false);
    });
  }, [filter, sort]);

  useEffect(() => {
    setCategoriesLoading(true);
    getCategories().then((data) => {
      setCategories(data.categories);
      setCategoriesLoading(false);
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
      {categoriesLoading ? (
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
      {reviewsLoading ? (
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
