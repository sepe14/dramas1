import { link } from "fs";
import styles from "./dramacards.module.css";
import { useState } from "react";
import CategorySelect from "./categoryselect";
import {
  AddCategoryIcon,
  DeleteIcon,
  DeselectIcon,
  NumberIcon,
} from "../icons";

export default function ToolBar({
  selected,
  resetSelected,
  categories,
}: {
  selected: never[];
  resetSelected: () => void;
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.toolbarWrapper}>
      <div>
        <NumberIcon />
        <p>{selected.length} kijelölt sorozat</p>
      </div>

      <div onClick={() => setIsOpen(!isOpen)}>
        <AddCategoryIcon />
        <p>Hozzáadás kategóriához</p>{" "}
        {isOpen && <CategorySelect categories={categories} />}
      </div>

      <div onClick={() => alert("Na ilyet azért még nem")}>
        <DeleteIcon />
        <p>Törlés</p>
      </div>
      <div onClick={() => resetSelected()}>
        <DeselectIcon />
        <p>Kijelölés megszüntetése</p>
      </div>
    </div>
  );
}
