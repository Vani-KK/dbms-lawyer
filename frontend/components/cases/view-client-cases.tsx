"use client";
import { CasesTable } from "@/components/cases/cases-table";
import useUser from "@/hooks/useUser";
import { fetchCases } from "@/services/lawyerServices";
import { useEffect, useState } from "react";

export default function ClientCasePage({ clientData }: { clientData: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useUser();
  const [flag, setFlag] = useState(false);
  const [caseData, setCaseData] = useState([]);
  useEffect(() => {
    if (user) {
      fetchCases(clientData.cid, user.lid).then((data) => {
        setCaseData(data);
      });
    }
  }, [user, flag]);
  const filteredCases = caseData.filter((case_) =>
    Object.values(case_)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
          <p className="text-gray-500">Case for client : {clientData.cname}</p>
        </div>
      </div>

      <CasesTable setFlag={setFlag} cases={filteredCases} />
    </div>
  );
}
