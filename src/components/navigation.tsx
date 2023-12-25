import Link from "next/link";
import styles from "./navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.fejlec}>
      <Link href="..">
        <h1>Megnézett sorozatok listája</h1>
      </Link>
      <div>
        <ul>
          <li>
            <Link href="/test">Teszt</Link>
          </li>
          <li>Alma2</li>
          <li>Alma3</li>
        </ul>
      </div>
    </nav>
  );
}
