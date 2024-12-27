"use client";

import { Phone, Mail } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Lawyer } from "@/lib/data/dummy-lawyers";

interface LawyersTableProps {
  lawyers: Lawyer[];
}

export function LawyersTable({ lawyers }: LawyersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Practice Area</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Office Address</TableHead>
            <TableHead className="w-[100px]">Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lawyers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No lawyers found
              </TableCell>
            </TableRow>
          ) : (
            lawyers.map((lawyer) => (
              <TableRow key={lawyer.lid}>
                <TableCell className="font-medium">{lawyer.lname}</TableCell>
                <TableCell>{lawyer.ltype}</TableCell>
                <TableCell>{lawyer.lphone}</TableCell>
                <TableCell>{lawyer.laddress}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        window.location.href = `tel:${lawyer.lphone}`;
                      }}
                      variant="ghost"
                      size="icon"
                      title="Call"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
