"use client";

import { useEffect, useState } from "react";
import { LawyerSearch } from "@/components/lawyers/lawyer-search";
import { LawyersTable } from "@/components/lawyers/lawyers-table";
import { dummyLawyers } from "@/lib/data/dummy-lawyers";
import { fetchAllLawyers } from "@/services/clientServices";

export default function ContactLawyerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const filteredLawyers = lawyers.filter((lawyer) =>
    Object.values(lawyer)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchAllLawyers().then((data) => {
      setLawyers(data);
    });
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Lawyers</h1>
        <p className="text-gray-500">
          Find and connect with legal professionals
        </p>
      </div>

      <LawyerSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <LawyersTable lawyers={filteredLawyers} />
    </div>
  );
}
