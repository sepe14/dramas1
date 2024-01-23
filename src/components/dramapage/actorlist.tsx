import { prisma } from "@/db";
import ActorListItem from "./actorlistitem";
import styles from "./infobox.module.css";

export default async function ActorList({
  actorData,
}: {
  actorData: {
    name: string;
    id: number;
    szerep: string;
  }[];
}) {
  if (!actorData) {
    return <div>Nem találhatóak színészek</div>;
  } else {
    return (
      <>
        <div>
          {actorData.map((actor) => (
            <ActorListItem key={actor.id} actor={actor} />
          ))}
        </div>
      </>
    );
  }
}
