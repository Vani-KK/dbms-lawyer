"use client";

import { useEffect, useState } from "react";
import { CaseSearch } from "@/components/client-cases/case-search";
import { ClientCasesTable } from "@/components/client-cases/client-cases-table";
import { dummyClientCases } from "@/lib/data/dummy-client-cases";
import useUser from "@/hooks/useUser";
import { fetchInvolvedCases } from "@/services/clientServices";

export default function ClientCasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useUser();
  const [cases, setCases] = useState([]);
  useEffect(() => {
    if (user) {
      fetchInvolvedCases(user.cid).then((data) => {
        console.log(data);

        setCases(data);
      });
    }
  }, [user]);

  const filteredCases = cases.filter((case_) =>
    Object.values(case_)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Cases</h1>
        <p className="text-gray-500">Track and monitor your legal cases</p>
      </div>

      <CaseSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <ClientCasesTable cases={filteredCases} />
    </div>
  );
}
