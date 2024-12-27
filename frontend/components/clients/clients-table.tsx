"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientActions } from "./client-actions";

interface ClientsTableProps {
  clients: Array<{
    cid: string;
    cname: string;
    cphone: string;
    caddress: string;
    lid: string;
  }>;
}

export function ClientsTable({ clients }: ClientsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No clients found
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.cid}>
                <TableCell className="font-medium">{client.cname}</TableCell>
                <TableCell>{client.cphone}</TableCell>
                <TableCell>{client.caddress}</TableCell>
                <TableCell>
                  <ClientActions clientId={client.cid} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
