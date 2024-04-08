import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const get = api.get;
const post = api.post;
const put = api.put;
const remove = api.delete;

export { api, get, post, put, remove };
