import SubmitButton from "@/components/submitbutton";
import styles from "../infobox.module.css";

export default function RatingForm({
  rating,
  saveRatingId,
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
      <SubmitButton />
    </form>
  );
}
