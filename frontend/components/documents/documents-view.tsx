"use client";

import { DocumentSearch } from "@/components/documents/document-search";
import { DocumentsTable } from "@/components/documents/documents-table";
import { useState } from "react";

export default function DocumentsView({ docs }: { docs: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = docs.filter((document) =>
    Object.values(document)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-gray-500">View and manage case documents</p>
      </div>

      <DocumentSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <DocumentsTable documents={filteredDocuments} />
    </div>
  );
}
