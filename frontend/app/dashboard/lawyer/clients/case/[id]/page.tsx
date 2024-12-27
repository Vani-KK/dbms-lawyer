import ClientCasePage from "@/components/cases/view-client-cases";
import { dummyCases } from "@/lib/data/dummy-cases";
import { fetchClientDetails } from "@/services/lawyerServices";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const slug = (await params).id;
  let clientDetails = await fetchClientDetails(slug);
  return (
    <ClientCasePage
      clientData={clientDetails}
      clientId={slug}
      caseData={dummyCases}
    />
  );
}
