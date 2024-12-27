"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ClientSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ClientSearch({ searchQuery, onSearchChange }: ClientSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search clients..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}