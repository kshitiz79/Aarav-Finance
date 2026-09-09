import LoansClient from "./LoansClient";

export function generateStaticParams() {
  return [
    { slug: "personal" },
    { slug: "home" },
    { slug: "business" },
    { slug: "property" },
  ];
}

export default async function LoansPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LoansClient slug={slug} />;
}
