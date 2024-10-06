import axios from "axios";
const client = axios.create({ baseURL: "https://api.ar7ebo.gomaplus.tech/api"});
export const request = async ({ ...options }) => {
  return client(options).then((res) => res);
};
