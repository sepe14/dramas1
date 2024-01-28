import { link } from "fs";
import styles from "./dramacards.module.css";
import { useRef, useState } from "react";
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
  selected: number[];
  resetSelected: () => void;
  categories: {
    id: number;
    name: string;
  }[];
}) {
  // For the add category modal
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.toolbarWrapper}>
      <div>
        <NumberIcon />
        <p>{selected.length} kijelölt sorozat</p>
      </div>

      <div
        onClick={() => {
          // add category button
          setIsOpen(true);
        }}
      >
        <AddCategoryIcon />
        <p>Hozzáadás kategóriához</p>
      </div>
      <CategorySelect
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selected={selected}
        categories={categories}
      />
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
