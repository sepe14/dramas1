import styles from "./infobox.module.css";
import Image from "next/image";
import defaultImage from "../../public/default_poster.png";

type DramaProps = {
  id: number;
  name: string;
  network: string;
  year: number;
  episodes: number;
  poster: string;
  viewingDate: number;
};

export default function DramaPoster({ poster, name }: DramaProps) {
  const posterUrl = poster === "default_poster.png" ? defaultImage : poster;

  return (
    <div style={{ gridRow: "1 / span 2" }} className={styles.poster}>
      <Image
        src={posterUrl}
        alt={`${name} posztere`}
        width={250}
        height={370}
      />
    </div>
  );
}
