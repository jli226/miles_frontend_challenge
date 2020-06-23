import React from 'react';
import DropZone from './DropZone';
import clsx from 'clsx';
import { useDrop } from 'react-dnd'
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';
import { ItemTypes, DragObject } from './ItemTypes';

const Column = observer((props: { category: string }) => {
  const { category } = props
  const store = useStore()
  const [{ canDrop, isOver }, drop] =  useDrop({
    accept: ItemTypes.REWARD,
    drop: (item: DragObject) => {
      store.add(item.reward, category)
      return { name: category }
    },
    canDrop: (item: DragObject) => {
      const categorySet = store.getCategorySet(item.reward)
      return !categorySet.has(category)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  return (
    <div ref={drop} className={clsx('lane dropzone', {
      'drop-hover': isOver,
      'drop-not-allow': !canDrop && isOver
    })}>
      <div className='header'>{category}</div>
      <DropZone {...{ category }} />
    </div>
  )
})

export default Column;
