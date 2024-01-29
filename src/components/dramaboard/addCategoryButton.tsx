import { randomUUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import { useFormStatus } from "react-dom";

export default function AddCategoryButton() {
  // useFormStatus hook returns if the form submit is pending
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending ? "Mentés..." : "Kategória hozzáadása"}
    </button>
  );
}
