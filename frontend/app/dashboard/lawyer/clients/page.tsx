"use client";

import { useEffect, useState } from "react";
import { ClientSearch } from "@/components/clients/client-search";
import { ClientsTable } from "@/components/clients/clients-table";
import useUser from "@/hooks/useUser";
import { fetchAllClients } from "@/services/lawyerServices";

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);
  const [user, setUser] = useUser();
  const filteredClients = clients.filter((client) =>
    Object.values(client)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      fetchAllClients(user.lid).then((data) => {
        setClients(data);
      });
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-gray-500">Manage your client list and their cases</p>
      </div>

      <ClientSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <ClientsTable clients={filteredClients} />
    </div>
  );
}
