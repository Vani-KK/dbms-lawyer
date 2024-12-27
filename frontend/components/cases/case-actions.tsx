"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  FileEdit,
  Files,
  FileUp,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { AddDocumentDialog } from "./add-document-dialog";
import { CourtDetailsDialog } from "../courts/court-details-dialog";
import { EditCaseDialog } from "./edit-case-dialog";

interface CaseActionsProps {
  caseId: string;
  caseData: any;
  setFlag: any;
}

export function CaseActions({ caseId, caseData, setFlag }: CaseActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <EditCaseDialog
        setFlag={setFlag}
        caseData={caseData}
        trigger={
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <FileEdit className="h-4 w-4" />
            <span className="sr-only">Edit Case</span>
          </Button>
        }
      />
      <CourtDetailsDialog
        court={{
          id: caseData.court_id,
          location: caseData.court_location,
          judgeName: caseData.judge_name,
        }}
        trigger={
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Building2 className="h-4 w-4" />
            <span className="sr-only">Court Details</span>
          </Button>
        }
      />

      <AddDocumentDialog
        caseId={caseId}
        trigger={
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <FileUp className="h-4 w-4" />
            <span className="sr-only">Add Document</span>
          </Button>
        }
      />
      <Link
        href={`/dashboard/lawyer/clients/case/${caseData.cid}/documents/${caseId}`}
      >
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Files className="h-4 w-4" />
          <span className="sr-only">View Documents</span>
        </Button>
      </Link>
    </div>
  );
}
