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
import { CaseActions } from "./case-actions";
import type { Case } from "@/lib/data/dummy-cases";

interface CasesTableProps {
  cases: (Case & { clientName?: string })[];
  setFlag: any;
}

export function CasesTable({ cases, setFlag }: CasesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                No cases found
              </TableCell>
            </TableRow>
          ) : (
            cases.map((case_) => (
              <TableRow key={case_.case_id}>
                <TableCell className="font-medium">{case_.case_id}</TableCell>
                <TableCell>{case_.case_name}</TableCell>
                <TableCell>{case_.case_type}</TableCell>
                <TableCell>{case_.case_status}</TableCell>
                <TableCell>{format(case_.case_strdate, "PP")}</TableCell>
                <TableCell>
                  {case_.case_enddate ? format(case_?.case_enddate, "PP") : "-"}
                </TableCell>
                <TableCell>
                  <CaseActions
                    setFlag={setFlag}
                    caseId={case_.case_id}
                    caseData={case_}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
