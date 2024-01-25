import { prisma } from "@/db";

function getActor(id: number) {
    return prisma.actors.findUnique({
      where: {
        id: id,
      },
    });
  }

export default async function ActorPage({params}:{params: {actorid: string}}) {
    const actor = await getActor(Number(params.actorid))
    return <div>{actor.name}</div>
}