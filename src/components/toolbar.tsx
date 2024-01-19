import styles from "./dramacards.module.css";

export default function ToolBar({
  selected,
  resetSelected,
}: {
  selected: never[];
  resetSelected: () => void;
}) {
  return (
    <div className={styles.toolbarWrapper}>
      <div>Jelenleg {selected.length} sorozat van kijelölve.</div>
      <div onClick={() => resetSelected()}>Kijelölés megszüntetése</div>
    </div>
  );
}
