import Image, { StaticImageData } from "next/image";
import defaultImage from "../../public/default_poster.png";
import styles from "./dramacards.module.css";
import Link from "next/link";

type DramaProps = {
  id: number;
  name: string;
  network: string;
  year: number;
  episodes: number;
  poster: string;
  viewingDate: number;
};

export function DramaCards({
  id,
  name,
  network,
  year,
  episodes,
  poster,
  viewingDate,
}: DramaProps) {
  const posterUrl = poster === "default_poster.png" ? defaultImage : poster;

  return (
    <div className={styles.outerCard}>
      <div className={styles.card}>
        <div>
          <Image
            src={posterUrl}
            alt={`${name} posztere`}
            width={210}
            height={300}
          />
        </div>
        <div>
          <Link href={`/dramas/${id}`}>
            <h3>{name}</h3>
          </Link>
          <p>{network}</p>
          <p>{year}</p>
          <p>{episodes}</p>
          <p>Megnézve: {viewingDate}</p>
        </div>
      </div>
      <div className={styles.background}>
        <Image
          src={posterUrl}
          alt={`${name} posztere`}
          width={50}
          height={100}
        />
      </div>
    </div>
  );
}
