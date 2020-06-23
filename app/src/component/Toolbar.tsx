import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';

const Toolbar = observer(() => {
  const store = useStore()
  return (
    <div className="toolbar">
      <button
        disabled={!store.canUndo}
        onClick={store.undo}
      >Undo</button> / <button
        disabled={!store.canRedo}
        onClick={store.redo}
        >Redo</button>
    </div>
  )
})

export default Toolbar;
