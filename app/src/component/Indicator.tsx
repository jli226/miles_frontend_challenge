import React from "react";
import { useDrag } from "react-dnd";
import { observer } from "mobx-react";
import clsx from "clsx";
import { useStore } from "../store/useStore";
import { ItemTypes } from "./ItemTypes";

const Indicator = observer((props: { category: string; reward: string }) => {
  const { category, reward } = props;
  const store = useStore();
  const set = store.getCategorySet(reward);
  const isBelongTo = set.has(category);
  const [, drag] = useDrag({
    item: { reward, srcCategory: category, type: ItemTypes.INDICATOR },
    canDrag: () => isBelongTo,
  });
  return (
    <div
      className={clsx("indicator", {
        "belong-to": isBelongTo,
      })}
      ref={drag}
    >
      <div className="close" onClick={() => store.delete(reward, category)} />
      {reward}
    </div>
  );
});

export default Indicator;
