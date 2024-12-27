import { setCookie } from "@/lib/cookieUtils";
import lawyerApiClient from "./lawyerApiClient";

export const registerLawyer = async (data: {
  lname: string;
  lid: string;
  ltype: string;
  lphone: string;
  laddress: string;
}): Promise<any> => {
  try {
    const response = await lawyerApiClient.post("/register", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "An unexpected error occurred"
    );
  }
};

export const loginLawyer = async (data: {
  lid: string;
  lname: string;
}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await lawyerApiClient.post("/signin", data);
      let userData = {
        ...response.data.lawyer,
        type: "lawyer",
      };
      setCookie("user", JSON.stringify(userData));
      resolve(response.data.lawyer);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const addClient = async (client: {
  cid: string;
  lid: string;
  cname: string;
  cphone: string;
  caddress: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      let addClient = lawyerApiClient.post("/add-client", client);
      resolve(addClient);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const fetchAllClients = async (lid: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clients = await lawyerApiClient.get(`/fetch-clients/${lid}`);
      resolve(clients.data.clients);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const getCourtDetails = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let courts = await lawyerApiClient.get(`/court-details`);
      resolve(courts.data.courts);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const addCase = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lawyerApiClient.post("/add-case", data);
      resolve(response.data);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const fetchCases = async (cid: string, lid: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lawyerApiClient.get(`/client-cases/${lid}/${cid}`);
      resolve(response.data.cases);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const fetchClientDetails = async (cid: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lawyerApiClient.get(`/client/${cid}`);
      resolve(response.data.client);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const fetchLawyerCases = async (lid: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lawyerApiClient.get(`/cases/${lid}`);
      resolve(response.data.cases);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const updateCaseData = async (
  data: {
    caseStatus: any;
    caseEndDate: any;
  },
  caseId: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lawyerApiClient.post(`/update-case/${caseId}`, data);
      resolve(response.data);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const addDocuments = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lawyerApiClient.post("/add-document", data);
      resolve(response.data);
    } catch (error: any) {
      reject(error.response?.data?.error || "An unexpected error occurred");
    }
  });
};

export const fetchDocuments = async (caseId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lawyerApiClient.get(`/fetch-documents/${caseId}`);
      resolve(response.data.documents);
    } catch (error: any) {
      resolve({
        error : true,
        message : error.response?.data?.error || "An unexpected error occurred"
      });
    }
  });
};
