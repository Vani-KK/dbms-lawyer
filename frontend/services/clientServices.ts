import { setCookie } from "@/lib/cookieUtils";
import clientApiClient from "./clientApiClient";

export const signin = async (data: {
  clientId: string;
  clientName: string;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await clientApiClient.post("/signin", data);
      let client = response.data.client;
      setCookie(
        "user",
        JSON.stringify({
          ...client,
          type: "client",
        })
      );
      resolve({
        success: true,
        user: {
          ...client,
          type: "client",
        },
      });
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const fetchAllLawyers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await clientApiClient.get("/lawyers");
      resolve(res.data.lawyers);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const fetchInvolvedCases = async (clientId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await clientApiClient.get(`/cases/${clientId}`);
      resolve(res.data.cases);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};
