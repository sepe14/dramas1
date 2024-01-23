import Link from "next/link";

export default function ActorListItem({
  actor,
}: {
  actor: { name: string; id: number; szerep: string };
}) {
  return (
    <li key={actor.id}>
      <Link href={`/actors/${actor.id}`}>{actor.name}</Link>
    </li>
  );
}
