import React from "react";
import { useStore } from "../store/useStore";
import { observer } from "mobx-react";
import Column from "./Column";

const Columns = observer(() => {
  const store = useStore();
  const columns = store.categories.map((category) => (
    <Column key={category} category={category} />
  ));
  return <div className="columns">{columns}</div>;
});

export default Columns;
