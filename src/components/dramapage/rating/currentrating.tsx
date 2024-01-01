"use client";

import { useContext, useEffect } from "react";
import styles from "../infobox.module.css";
import { UserContext } from "@/app/user-provider";

export default function Rating({
  rating,
  length,
}: {
  rating: number;
  length: number;
}) {
  const { currentUser, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(currentUser);
  }, [rating]);

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
