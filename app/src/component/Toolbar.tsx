import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../store/useStore";

const Toolbar = observer(() => {
  const store = useStore();
  return (
    <div className="toolbar">
      <button disabled={!store.canUndo} onClick={store.undo}>
        Undo
      </button>
      <span> / </span>
      <button disabled={!store.canRedo} onClick={store.redo}>
        Redo
      </button>
      <span className="divider">|</span>
      <button onClick={store.save}>Save</button>
      <label>
        <input
          type="checkbox"
          checked={store.autoSave}
          onChange={store.toggleAutoSave}
        />
        Auto Save
      </label>
    </div>
  );
});

export default Toolbar;
