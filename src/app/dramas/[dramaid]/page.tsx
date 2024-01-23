import DramaInfobox from "@/components/dramapage/dramainfobox";
import DramaPoster from "@/components/dramapage/dramaposter";
import { prisma } from "@/db";
import styles from "../../../components/dramapage/infobox.module.css";
import DramaRating from "@/components/dramapage/rating/dramarating";
import { Suspense } from "react";
import ActorList from "@/components/dramapage/actorlist";

function getDrama(id: number) {
  return prisma.titles.findUnique({
    where: {
      id: id,
    },
    include: {
      ratings: true,
      actors: {
        include: {
          actors: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

async function getRating(id: number) {
  const rating = await prisma.ratings.findMany({
    where: {
      titlesId: id,
    },
  });
  return {
    props: { rating },
    tags: ["ratings"],
  };
}

function flattenActorData(
  actorData: ({ actors: { name: string } } & {
    dramaId: number;
    actorId: number;
    szerep: string;
  })[]
): {
  name: string;
  id: number;
  szerep: string;
}[] {
  const flattenedActorData = [];

  for (const actor of actorData) {
    const flattenedActor = {
      id: actor.actorId,
      name: actor.actors.name,
      szerep: actor.szerep,
    };

    flattenedActorData.push(flattenedActor);
  }

  return flattenedActorData;
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
  const ratingData = await getRating(dramaid);

  if (!titlesData) {
    return <h2>Nem található sorozat ezzel az azonosítóval!</h2>;
  }

  const actorData = flattenActorData(titlesData.actors);

  return (
    <div className={styles.gridrendszer}>
      <DramaPoster {...titlesData} />
      <DramaInfobox {...titlesData} />

      <Suspense fallback={<h3>Értékelés betöltése...</h3>}>
        <DramaRating dramaData={titlesData} ratings={ratingData.props.rating} />
      </Suspense>
      <Suspense
        fallback={
          <>
            <div className={styles.stand}>
              <h3>Főszereplők betöltése...</h3>
            </div>
            <div className={styles.stand}>
              <h3>Mellékszereplők betöltése...</h3>
            </div>
          </>
        }
      >
        <ActorList actorData={actorData} />
      </Suspense>
      <div className={`${styles.stand}`}>
        <h3>Alkotók</h3>
        <ul>
          <li>Név Név</li>
          <li>Név Név</li>
          <li>Név Név</li>
          <li>Név Név</li>
        </ul>
      </div>
    </div>
  );
}
