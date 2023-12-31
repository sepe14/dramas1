"use client";

import styles from "../infobox.module.css";

export default function Rating({
  rating,
  length,
}: {
  rating: number;
  length: number;
}) {
  console.log(rating);
  return (
    <>
      <div className={styles.ratingbox}>
        <span>{length === 0 ? 0 : rating.toFixed(2)}</span>
        <span>/10</span>
        <p>{length} értékelés</p>
      </div>
    </>
  );
}
