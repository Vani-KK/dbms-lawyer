"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FilePlus, Files } from "lucide-react";
import Link from "next/link";
import { AddCaseDialog } from "@/components/cases/add-case-dialog";
import { generateRandomUID } from "@/lib/generateUID";
import useUser from "@/hooks/useUser";
import { addCase } from "@/services/lawyerServices";
import { toast } from "sonner";

interface ClientActionsProps {
  clientId: string;
}

export function ClientActions({ clientId }: ClientActionsProps) {
  const [user, setUser] = useUser();
  const handleAddCase = (formData: any) => {
    if (!formData.endDate) {
      formData.endDate = null;
    }
    let data = {
      caseId: generateRandomUID(),
      caseName: formData.name,
      caseType: formData.type,
      caseStatus: formData.status,
      caseStrDate: formData.startDate,
      caseEndDate: formData.endDate,
      cid: clientId,
      lid: user.lid,
      courtId: formData.courtId,
    };
    addCase(data)
      .then(() => {
        toast.success("Case added successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="flex items-center gap-2">
      <AddCaseDialog
        clientId={clientId}
        formSubmit={handleAddCase}
        trigger={
          <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            Add Case
          </Button>
        }
      />
      <Button>
        <Link
          href={`/dashboard/lawyer/clients/case/${clientId}`}
          className="min-w-max flex items-center"
        >
          <Files className="mr-2 h-4 w-4" />
          View Cases
        </Link>
      </Button>
    </div>
  );
}
