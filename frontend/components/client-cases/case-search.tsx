"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CaseSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function CaseSearch({ searchQuery, onSearchChange }: CaseSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search cases by name, type, or lawyer..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}