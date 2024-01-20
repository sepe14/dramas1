import styles from "./dramacards.module.css";

export default function CategorySelect({
  categories,
}: {
  categories: {
    id: number;
    name: string;
  }[];
}) {
  return (
    <div className={styles.categorySelect}>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
