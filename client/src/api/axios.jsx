import axios from "axios";
const serverURL = "http://localhost:3000";

const axiosProvider = axios.create({
  baseURL: serverURL
});

export { axiosProvider }