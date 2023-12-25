import Image, { StaticImageData } from "next/image";
import defaultImage from "../../public/default_poster.png";
import styles from "./dramacards.module.css";

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
            width={200}
            height={300}
          />
        </div>
        <div>
          <h3>{name}</h3>
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
          width={200}
          height={300}
        />
      </div>
    </div>
  );
}
