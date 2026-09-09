import TaxClient from "./TaxClient";

export function generateStaticParams() {
  return [
    { slug: "itr" },
    { slug: "accounting" },
    { slug: "gst" },
    { slug: "compliance" },
  ];
}

export default async function TaxPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TaxClient slug={slug} />;
}
