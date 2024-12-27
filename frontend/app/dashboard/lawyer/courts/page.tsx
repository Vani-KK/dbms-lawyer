"use client";

import { CourtSearch } from "@/components/courts/court-search";
import { CourtsTable } from "@/components/courts/courts-table";
import { getCourtDetails } from "@/services/lawyerServices";
import { useEffect, useState } from "react";

export default function CourtsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courtData, setCourtData] = useState([]);
  const filteredCourts = courtData.filter((court) =>
    Object.values(court)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getCourtDetails().then((data) => {
      setCourtData(data);
    });
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Court Details</h1>
        <p className="text-gray-500">View and manage court information</p>
      </div>

      <CourtSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <CourtsTable courts={filteredCourts} />
    </div>
  );
}
