import ActorListItem from "@/components/dramapage/actorlistitem";
import DramaInfobox from "@/components/dramapage/dramainfobox";
import DramaPoster from "@/components/dramapage/dramaposter";
import { prisma } from "@/db";

import styles from "../../../components/dramapage/infobox.module.css";

import Link from "next/link";
import DramaRating from "@/components/dramapage/rating/dramarating";

function getDrama(id: number) {
  return prisma.titles.findUnique({
    where: {
      id: id,
    },
  });
}

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
  const mainActorData = await getActorsForDrama(dramaid, "main");
  const spActorData = await getActorsForDrama(dramaid, "sp");
  const ratingData = await getRating(dramaid);

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

  if (!titlesData) {
    return <h2>Nem található sorozat ezzel az azonosítóval!</h2>;
  }
  console.log(ratingData);
  return (
    <div className={styles.gridrendszer}>
      <DramaPoster {...titlesData} />
      <DramaInfobox {...titlesData} />
      <DramaRating dramaData={titlesData} ratings={ratingData.props.rating} />
      <div className={`${styles.stand}`}>
        <h3>Alkotók</h3>
        <ul>
          <li>Név Név</li>
          <li>Név Név</li>
          <li>Név Név</li>
          <li>Név Név</li>
        </ul>
      </div>
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
    </div>
  );
}
