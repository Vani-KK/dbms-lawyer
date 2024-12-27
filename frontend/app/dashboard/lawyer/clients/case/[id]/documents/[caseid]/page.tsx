import { DocumentSearch } from "@/components/documents/document-search";
import { DocumentsTable } from "@/components/documents/documents-table";
import DocumentsView from "@/components/documents/documents-view";
import { dummyDocuments } from "@/lib/data/dummy-documents";
import { fetchDocuments } from "@/services/lawyerServices";

export default async function DocumentsPage({
  params,
}: {
  params: {
    id: string;
    caseid: string;
  };
}) {
  const slug = (await params).caseid;
  let docs = await fetchDocuments(slug);
  if (docs.error) {
    docs = [];
  }
  return <DocumentsView docs={docs} />;
}
