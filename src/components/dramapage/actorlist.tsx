import ActorListItem from "./actorlistitem";
import styles from "./infobox.module.css";

export default async function ActorList({
  actorData,
  role,
}: {
  actorData: {
    name: string;
    id: number;
    szerep: string;
  }[];
  role: string;
}) {
  if (!actorData) {
    return <div>Nem találhatóak színészek</div>;
  } else {
    return (
      <>
        <div className={styles.stand}>
          {actorData.map((actor) => {
            if (actor.szerep === role) {
              // filter by role "sp" | "main"
              return <ActorListItem key={actor.id} actor={actor} />;
            }
          })}
        </div>
      </>
    );
  }
}
