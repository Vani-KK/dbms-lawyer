import { CaseType, CaseStatus } from "./case-types";

export interface ClientCase {
  id: string;
  name: string;
  type: CaseType;
  status: CaseStatus;
  lawyerName: string;
  startDate: Date;
  endDate?: Date;
}

export const dummyClientCases: ClientCase[] = [
  {
    id: "1",
    name: "Property Dispute Resolution",
    type: "Real Estate",
    status: "In Progress",
    lawyerName: "Sarah Johnson",
    startDate: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Contract Negotiation",
    type: "Corporate",
    status: "Closed",
    lawyerName: "Michael Chen",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-02-28"),
  },
  {
    id: "3",
    name: "Intellectual Property Claim",
    type: "Intellectual Property",
    status: "Pending",
    lawyerName: "Emily Rodriguez",
    startDate: new Date("2024-03-01"),
  },
];