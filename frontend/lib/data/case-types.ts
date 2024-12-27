export const caseTypes = [
  "Civil",
  "Criminal",
  "Family",
  "Corporate",
  "Real Estate",
  "Immigration",
  "Intellectual Property",
  "Tax",
] as const;

export const caseStatuses = [
  "Open",
  "In Progress",
  "Pending",
  "Closed",
  "Appealed",
] as const;

export type CaseType = typeof caseTypes[number];
export type CaseStatus = typeof caseStatuses[number];