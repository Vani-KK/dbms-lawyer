"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CourtsTableProps {
  courts: Array<{
    court_id: string;
    court_location: string;
    judge_name: string;
  }>;
}

export function CourtsTable({ courts }: CourtsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Court ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Judge Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                No courts found
              </TableCell>
            </TableRow>
          ) : (
            courts.map((court) => (
              <TableRow key={court.court_id}>
                <TableCell className="font-medium">{court.court_id}</TableCell>
                <TableCell>{court.court_location}</TableCell>
                <TableCell>{court.judge_name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
