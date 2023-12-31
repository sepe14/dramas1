import Link from "next/link";

type actors = {
  id: number;
  name: string;
};

export default function ActorListItem({ id, name }: actors) {
  return (
    <li key={id}>
      <Link href={`/actors/${id}`}>{name}</Link>
    </li>
  );
}
