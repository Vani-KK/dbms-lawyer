import { apiBaseUrl } from "@/lib/baseUrls";
import axios from "axios";

const clientApiClient = axios.create({
  baseURL: `${apiBaseUrl}/clients`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default clientApiClient;
