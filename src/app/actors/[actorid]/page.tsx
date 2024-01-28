import { prisma } from "@/db";
import { link } from "fs";

function getActor(id: number) {
  return prisma.actors.findUnique({
    where: {
      id: id,
    },
    include: {
      dramas: {
        include: {
          titles: true,
        },
      },
    },
  });
}

export default async function ActorPage({
  params,
}: {
  params: { actorid: string };
}) {
  const actor = await getActor(Number(params.actorid));
  return (
    <div>
      <h2>{actor?.name}</h2>
      <ul>
        {actor?.dramas.map((drama) => (
          <li key={drama.dramaId}>{drama.titles.name}</li>
        ))}
      </ul>
    </div>
  );
}
