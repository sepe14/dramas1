import {
  useRef,
  useEffect,
  useState,
  useTransition,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./dramacards.module.css";
import { saveCategories, saveNewCategory } from "@/app/actions";
import { LoadingSpinner } from "../loading-spinner";

export default function CategorySelect({
  categories,
  selected,
  isOpen,
  setIsOpen,
}: {
  categories: {
    id: number;
    name: string;
  }[];
  selected: number[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // extend the categories with added key
  const initialInfo = categories.map((category) => ({
    id: category.id,
    name: category.name,
    added: false,
  }));

  const [categoryList, setCategoryList] = useState(initialInfo);
  const [isPending, startTransition] = useTransition();
  const [addNewCat, setAddNewCat] = useState(false);

  const ref = useRef<HTMLDialogElement>(null);

  // reset categories if the selection changes
  useEffect(() => {
    setCategoryList(initialInfo);
  }, [selected]);

  // close or open the native html dialog element
  useEffect(() => {
    setAddNewCat(false);
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, [isOpen]);

  // set modal state to close if it was closed with the esc key
  useEffect(() => {
    const handleEscapeKey = (event: { key: string }) => {
      if (event.key === "Escape" && ref.current) {
        ref.current.close();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const onClick = (category: number) => {
    startTransition(async () => {
      // save the data with a serve action and get the response
      const succes = await saveCategories(category, selected);

      // set added to true in CategoryList for the category the dramas were saved to
      if (succes === "succes") {
        const updatedInfo = categoryList.map((item) => {
          if (item.id === category) {
            item.added = true;
            return item;
          }
          return item;
        });
        setCategoryList(updatedInfo);
      }
    });
  };

  return (
    <dialog ref={ref} className={styles.categorySelect}>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        X
      </button>
      <ul>
        {categoryList.map((category) => (
          <li key={category.id}>
            <p>{category.name}</p>
            <button
              onClick={() => onClick(category.id)}
              disabled={isPending || category.added}
            >
              {!category.added ? isPending ? <LoadingSpinner /> : "+" : "✓"}
            </button>
          </li>
        ))}
      </ul>
      {!addNewCat ? (
        <div className={styles.newCatBtn} onClick={() => setAddNewCat(true)}>
          <p>Új kategória</p>
        </div>
      ) : (
        <form action={saveNewCategory}>
          <input type="text" name="" id="" />
          <button onClick={() => setAddNewCat(false)}>Mégse</button>
          <button type="submit">Kategória hozzáadása</button>
        </form>
      )}
    </dialog>
  );
}
