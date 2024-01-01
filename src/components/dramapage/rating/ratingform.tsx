import SubmitButton from "@/components/submitbutton";
import styles from "../infobox.module.css";
import { Dispatch, SetStateAction } from "react";

export default function RatingForm({
  rating,
  saveRatingId,
  setLoading,
}: {
  rating: number | undefined;
  saveRatingId: (formData: FormData) => Promise<
    | {
        errors: {
          value?: string[] | undefined;
        };
      }
    | undefined
  >;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <form className={styles.form} action={saveRatingId}>
      <label htmlFor="rating">Sorozat értékelése:</label>
      <input
        type="number"
        name="rating"
        id="rating-inp"
        defaultValue={rating}
        min="1"
        max="10"
      />
      <SubmitButton setLoading={setLoading} />
    </form>
  );
}
