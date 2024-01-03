import { prisma } from "@/db";
import ActorListItem from "./actorlistitem";
import styles from "./infobox.module.css";

function getActorsForDrama(id: number, szerep: string) {
  return prisma.actors.findMany({
    where: {
      dramas: {
        some: {
          dramaId: id,
          szerep,
        },
      },
    },
  });
}

export default async function ActorList({ dramaid }: { dramaid: number }) {
  const mainActorData = await getActorsForDrama(dramaid, "main");
  const spActorData = await getActorsForDrama(dramaid, "sp");
  const actorData = [
    {
      title: "Főszereplők",
      class: "main-actors",
      data: mainActorData,
    },
    {
      title: "Mellékszereplők",
      class: "sp-actors",
      data: spActorData,
    },
  ];
  return (
    <>
      {actorData.map((data) => (
        <div key={data.class} className={`${data.class} ${styles.stand}`}>
          <h3>{data.title}</h3>
          <ul>
            {data.data.map((actor) => (
              <ActorListItem key={actor.id} {...actor} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
