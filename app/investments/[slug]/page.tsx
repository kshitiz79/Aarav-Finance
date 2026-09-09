import InvestmentsClient from "./InvestmentsClient";

export function generateStaticParams() {
  return [
    { slug: "mutual-funds" },
    { slug: "sip" },
    { slug: "elss" },
    { slug: "retirement" },
  ];
}

export default async function InvestmentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <InvestmentsClient slug={slug} />;
}
