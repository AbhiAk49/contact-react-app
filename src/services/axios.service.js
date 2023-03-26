import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_API_URL;
//using static token -- api key
const access_token = process.env.REACT_APP_ACCESS_TOKEN;
export default axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  },
});
