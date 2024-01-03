import { prisma } from "@/db";
import { ReactNode, Suspense } from "react";
import styles from "../../../components/dramapage/infobox.module.css";
import DramaRating from "@/components/dramapage/rating/dramarating";
import ActorListItem from "@/components/dramapage/actorlistitem";
import DramaInfobox from "@/components/dramapage/dramainfobox";
import DramaPoster from "@/components/dramapage/dramaposter";
import ActorList from "@/components/dramapage/actorlist";

function getDrama(id: number) {
  return prisma.titles.findUnique({
    where: {
      id: id,
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

export default async function DramaLayout({
  params,
  children,
}: {
  children: ReactNode;
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

  return (
    <div className={styles.gridrendszer}>
      <Suspense fallback={<h3>Sorozat adatlap betöltése...</h3>}>
        <DramaPoster {...titlesData} />
        <DramaInfobox {...titlesData} />
      </Suspense>
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
        <ActorList dramaid={dramaid} />
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
