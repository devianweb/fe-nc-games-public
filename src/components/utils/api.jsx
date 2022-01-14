const checkError = (res) => {
  if (res.status >= 200 && res.status <= 299) {
    return res.json();
  } else {
    throw Error(res.statusText);
  }
};

export const getReviews = (filter, sort) => {
  const queries = !filter ? "" : `&category=${filter}`;
  const sorting = !sort ? `?sort_by=review_id` : `?sort_by=${sort}`;
  return fetch(
    `https://ian-nc-games.herokuapp.com/api/reviews${sorting}${queries}`
  ).then((res) => res.json());
};

export const getCategories = () => {
  return fetch("https://ian-nc-games.herokuapp.com/api/categories").then(
    (res) => res.json()
  );
};

export const patchReviewById = (review_id) => {
  return fetch(`https://ian-nc-games.herokuapp.com/api/reviews/${review_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inc_votes: 1 }),
  }).then((res) => checkError(res));
};

export const getReviewById = (review_id) => {
  return fetch(
    `https://ian-nc-games.herokuapp.com/api/reviews/${review_id}`
  ).then((res) => checkError(res));
};

export const getUsers = () => {
  return fetch("https://ian-nc-games.herokuapp.com/api/users").then((res) =>
    res.json()
  );
};

export const getCommentsByReviewId = (review_id) => {
  return fetch(
    `https://ian-nc-games.herokuapp.com/api/reviews/${review_id}/comments`
  ).then((res) => checkError(res));
};

export const deleteCommentsByCommentId = (comment_id) => {
  return fetch(
    `https://ian-nc-games.herokuapp.com/api/comments/${comment_id}`,
    {
      method: "DELETE",
    }
  );
};
