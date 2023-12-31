import Cerka from "@/components/cerka";
import styles from "../infobox.module.css";
import { Dispatch, SetStateAction } from "react";

export default function ShowCurrentUsersRating({
  setEditing,
  isEditing,
  usersrating,
}: {
  setEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  usersrating: number;
}) {
  return (
    <div className={styles.usersrating}>
      <p>A te értékelésed:</p>
      <div className="rating">{usersrating}</div>
      <Cerka setEditing={setEditing} isEditing={isEditing} />
    </div>
  );
}
