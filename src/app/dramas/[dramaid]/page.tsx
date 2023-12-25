import { prisma } from "@/db";

function getDrama(id: number) {
  return prisma.titles.findUnique({
    where: {
      id: id,
    },
  });
}

export default async function DramaPage({
  params,
}: {
  params: { dramaid: string };
}) {
  const dramaid: number = Number(params.dramaid);

  if (!dramaid) {
    return <h2>Nem található sorozat ezzel az azonosítóval!</h2>;
  }

  const titlesData = await getDrama(dramaid);

  if (!titlesData) {
    return <h2>Nem található sorozat ezzel az azonosítóval!</h2>;
  }

  return (
    <div>
      <h2>{titlesData.name}</h2>
      <p>{titlesData.network}</p>
      <p>{titlesData.year}</p>
    </div>
  );
}
