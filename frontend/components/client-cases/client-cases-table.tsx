"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ClientCase } from "@/lib/data/dummy-client-cases";

interface ClientCasesTableProps {
  cases: ClientCase[];
}

export function ClientCasesTable({ cases }: ClientCasesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Name</TableHead>
            <TableHead>Case Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Lawyer Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No cases found
              </TableCell>
            </TableRow>
          ) : (
            cases.map((case_) => (
              <TableRow key={case_.case_id}>
                <TableCell className="font-medium">{case_.case_name}</TableCell>
                <TableCell>{case_.case_type}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      case_.case_status === "Closed" ? "secondary" :
                      case_.case_status === "In Progress" ? "default" :
                      "outline"
                    }
                  >
                    {case_.case_status}
                  </Badge>
                </TableCell>
                <TableCell>{case_.lawyer_name}</TableCell>
                <TableCell>{format(case_.case_strdate, "PP")}</TableCell>
                <TableCell>
                  {case_.case_enddate ? format(case_.case_enddate, "PP") : "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}