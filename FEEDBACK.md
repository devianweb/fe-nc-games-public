# Checklist for NC Games Front End

## README - write your own and make sure that it:

- [x] has a link to the deployed version
- [x] provides general info about your app
- [x] includes links to your back end repo
- [x] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [x] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)

## UX

- [x] Basic styling added
- [x] Responsive design
- [x] Items aligned
- [x] Content legible (not too wide, obstructed, etc)

---

**_OH STOP IT IT'S SO NICE TO LOOK AT_**

<!-- Ta! -->

---

- [x] Refreshing doesn’t cause an issue on sub-pages
- [x] No errors in the console
- [x] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading

---

**_I think you've overcomplicated things a bit here... you wouldn't need render/setRender if you were optimistically rendering your votes in the onclick. Also abstracting out fetch functions > having them inline in your component._**

<!-- Fixed this! Added optimistic rendering on voting, posting and deleteing comments! -->

---

## Functionality

### Login

- [x] Some indication of who is logged in (this can be hardcoded)

---

**_USERNAME PERSISTS ON REFRESH OOOOOHHHH_**

---

### Reviews

- [x] Serves all reviews / top reviews
- [x] Can vote on reviews
- [x] Can vote a maximum of once in either direction per page load
- [x] Votes are persistent when page is refreshed
- [x] Reviews by category pages load only relevant reviews (especially when navigating from one category page to another)
- [x] Can sort reviews by date created / comment_count / votes

### Individual Review / Comments

- [x] Individual reviews are served with comments
- [ ] Can vote on comments
- [ ] Can vote a maximum of once in either direction per page load
- [ ] Votes are persistent when page is refreshed
- [x] Can post new comments, which are persistent

### Additional functionality:

- [x] Can only delete comments of logged in user
- [x] Deleted comments don’t re-appear on re-render/refresh
- [ ] sort comments by date created / votes
- [ ] navigate over pages of reviews (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display reviews by specific user
- [ ] post new review
- [ ] delete logged in user's reviews

## Error Handling

- [x] Bad url
- [x] Bad category slug in url
- [x] Bad review_id in url
- [x] Post comment: (No text in comment body / Can you post without logging in?)

## Code

- [x] Well named components
- [x] Components reused where possible (`Reviews` / `Voter`...)
- [ ] Minimal state - don't hold derivable data in state

---

**_This could be applied to the isLoading pattern - you could set your useEffects to run one after each other without overcomplicating and having fetchingReviews and fetchingCategories in the same component._**

<!-- This was done as I only want the sorting/filter bar to update itself only on mounting, whereas the reviews want to update every time there is a sort or filter selected. -->

**_Also, again, abstract your API functions into either hooks or an api file. In your reviews.js you have `sort === ""` - this could be checked using `!sort`, as an ampty string is a falsy value, and you are specifying the constraints so could guard against it coming through as anything else (null, 0, undefined etc.). These component files can get to being very unwieldy if there is too much stuff happening in one component!_**

---

- [x] Set state correctly, using previous state where possible
- [x] Handle asynchronicity clearly (i.e. isLoading pattern)

---

## **_As above_**

- [x] Functions are DRY (`handleChange` for controlled components / api calls)
- [x] Use object destructuring where possible
- [x] Tidy? If not: ESLint / Prettier
- [x] `node_modules` git ignored
- [ ] No `console.log`s / comments
- [x] remove unnecessary files (e.g. App.test.js)

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## Once everything else is complete, here are some extra challenges:

- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Create a user page where you can change their profile information if they are "logged in as the right user". This will require having an additional PATCH endpoint on your backend
- [ ] Create a view for all the reviews a user has liked. This will require additional functionality on your backend
- [ ] Make use of [web sockets](https://en.wikipedia.org/wiki/WebSocket) to allow your page to automatically update with a little notification if there have been any recent posts. [socket.io](https://socket.io/) is quite a good one to use and has some good getting started guides. This will require additional functionality on your backend for recent reviews e.g. last 10 minutes

---

**_What a beast of a project! Well done in particular for utilising MUI components and also a lovely modal! You are in danger of overcomplicating to the point of confusion though..._**

- Optimistic rendering > setting render in state
- Abstract out API functions into hooks
- At risk of showing bias, axios > fetch, especially when params/queries are involved.

**_Well done again Ian, this is a great project! Congratulations :)_**

---
