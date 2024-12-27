export interface Document {
  id: string;
  primaryWitness: string;
  opposition: string;
  defence: string;
  legalDocument?: string;
  referenceDocument?: string;
}

export const dummyDocuments: Document[] = [
  {
    id: "1",
    primaryWitness: "Jane Wilson",
    opposition: "ABC Corporation",
    defence: "Self Defense",
    legalDocument: "legal-doc-1.pdf",
    referenceDocument: "reference-1.pdf",
  },
  {
    id: "2",
    primaryWitness: "Robert Brown",
    opposition: "State Prosecutor",
    defence: "Alibi Defense",
    legalDocument: "legal-doc-2.pdf",
  },
  {
    id: "3",
    primaryWitness: "Mary Johnson",
    opposition: "XYZ Company",
    defence: "Statute of Limitations",
    referenceDocument: "reference-3.pdf",
  },
];