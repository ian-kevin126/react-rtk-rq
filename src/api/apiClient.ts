import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://g309vikr-4cwl3fyz-p96h3yv0ppyx.vcc7.mcprev.cn",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
