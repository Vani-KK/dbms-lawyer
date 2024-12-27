"use client";

import { FileText, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Document } from "@/lib/data/dummy-documents";

interface DocumentsTableProps {
  documents: Document[];
}

export function DocumentsTable({ documents }: DocumentsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Primary Witness</TableHead>
            <TableHead>Opposition</TableHead>
            <TableHead>Defence</TableHead>
            <TableHead>Legal Document</TableHead>
            <TableHead>Reference Document</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No documents found
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <TableRow key={doc.d_id}>
                <TableCell>{doc.pwitness}</TableCell>
                <TableCell>{doc.opposition}</TableCell>
                <TableCell>{doc.defence}</TableCell>
                <TableCell>{doc.legal_doc}</TableCell>
                <TableCell>{doc.refernce_doc}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
