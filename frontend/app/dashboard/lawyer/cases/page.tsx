"use client";

import { AddCaseDialog } from "@/components/cases/add-case-dialog";
import { CasesTable } from "@/components/cases/cases-table";
import { ClientSearch } from "@/components/clients/client-search";
import useUser from "@/hooks/useUser";
import { fetchLawyerCases } from "@/services/lawyerServices";
import { useEffect, useState } from "react";

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useUser();
  const [cases, setCases] = useState([]);
  useEffect(() => {
    if (user) {
      fetchLawyerCases(user.lid).then((data) => {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
          <p className="text-gray-500">
            Manage and track all cases across clients
          </p>
        </div>
      </div>

      <ClientSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <CasesTable cases={filteredCases} />
    </div>
  );
}
