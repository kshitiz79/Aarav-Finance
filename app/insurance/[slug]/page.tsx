import InsuranceClient from "./InsuranceClient";

export function generateStaticParams() {
  return [
    { slug: "health" },
    { slug: "life" },
    { slug: "car" },
    { slug: "bike" },
    { slug: "travel" },
    { slug: "business" },
  ];
}

export default async function InsurancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <InsuranceClient slug={slug} />;
}
