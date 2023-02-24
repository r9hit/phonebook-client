import axios from "axios";

let baseURL = "http://localhost:4000";

// console.log("env is ", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_SERVER_URL;
}

console.log(process.env.REACT_APP_SERVER_URL);
export const axiosClient = axios.create({
  baseURL,
});
