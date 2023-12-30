import styles from "./infobox.module.css";

import { json } from "stream/consumers";

type DramaProps = {
  id: number;
  name: string;
  network: string;
  year: number;
  episodes: number;
  poster: string;
  viewingDate: number;
};

export default function DramaInfobox({
  name,
  network,
  year,
  episodes,
  poster,
  viewingDate,
}: DramaProps) {
  return (
    <div className={styles.infobox} style={{ gridColumn: "2 / span 2" }}>
      <h2>{name}</h2>
    </div>
  );
}
