import { apiBaseUrl } from "@/lib/baseUrls";
import axios from "axios";

const lawyerApiClient = axios.create({
  baseURL: `${apiBaseUrl}/lawyer`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default lawyerApiClient;
