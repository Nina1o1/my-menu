import axios from "axios";
const serverURL = "http://localhost:3000";

const axiosProvider = axios.create({
  baseURL: serverURL
});

const axiosPrivateProvider = axios.create({
  baseURL: serverURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export { axiosProvider, axiosPrivateProvider };