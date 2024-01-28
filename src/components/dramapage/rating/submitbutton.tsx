import { Dispatch, SetStateAction } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  // useFormStatus hook returns if the form submit is pending
  const { pending } = useFormStatus();
  return (
    <button onClick={() => setLoading(true)} disabled={pending} type="submit">
      {pending ? "Mentés..." : "Mentés"}
    </button>
  );
}
