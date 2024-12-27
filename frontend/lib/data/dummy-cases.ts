import { CaseStatus, CaseType } from "./case-types";

export interface Case {
  id: string;
  clientId: string;
  name: string;
  type: CaseType;
  status: CaseStatus;
  startDate: Date;
  endDate?: Date;
  courtId: string;
}

export const dummyCases: Case[] = [
  {
    id: "1",
    clientId: "1",
    name: "Smith vs. Johnson",
    type: "Civil",
    status: "In Progress",
    startDate: new Date("2024-01-15"),
    courtId: "NYC-123",
  },
  {
    id: "2",
    clientId: "1",
    name: "Property Dispute",
    type: "Real Estate",
    status: "Pending",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-05-01"),
    courtId: "NYC-456",
  },
];