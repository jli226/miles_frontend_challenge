import React from "react";
import Indicators from "./Indicators";
import clsx from "clsx";
import { useDrop } from "react-dnd";
import { observer } from "mobx-react";
import { useStore } from "../store/useStore";
import { ItemTypes, DragObject } from "./ItemTypes";

const Column = observer((props: { category: string }) => {
  const { category } = props;
  const store = useStore();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [ItemTypes.REWARD, ItemTypes.INDICATOR],
    drop: (item: DragObject) => {
      if (item.type === ItemTypes.REWARD) {
        store.add(item.reward, category);
      }
      if (item.type === ItemTypes.INDICATOR) {
        store.move(item.reward, item.srcCategory!, category);
      }
      return { name: category };
    },
    canDrop: (item: DragObject) => {
      const categorySet = store.getCategorySet(item.reward);
      return !categorySet.has(category);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div
      ref={drop}
      className={clsx("lane dropzone", {
        "drop-hover": isOver && canDrop,
      })}
    >
      <div className="header">{category}</div>
      <Indicators {...{ category }} />
    </div>
  );
});

export default Column;
