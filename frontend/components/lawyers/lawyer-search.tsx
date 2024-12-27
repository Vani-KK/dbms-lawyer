"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LawyerSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function LawyerSearch({ searchQuery, onSearchChange }: LawyerSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search lawyers by name, type, or location..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}