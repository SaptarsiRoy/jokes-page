/*
    Store url constants in this file for development and production.
*/

const url =
  process.env.NODE_ENV === "production"
    ? "https://jokesapp3039.herokuapp.com/api"
    : "http://localhost:5000/api";

export default url;
