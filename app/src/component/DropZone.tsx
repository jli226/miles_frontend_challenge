import React from 'react';
import clsx from 'clsx';
import { useDrop } from 'react-dnd'
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';
import { ItemTypes } from './ItemTypes';
import Indicator from './Indicator';

type DragObject = {
  reward: string;
  type: string;
}

const DropZone = observer((props: {
  category: string,
}) => {
  const { category } = props
  const store = useStore()
  const [{ canDrop, isOver }, drop] =  useDrop({
    accept: ItemTypes.REWARD,
    drop: (item: DragObject) => {
      store.add(item.reward, category)
      return { name: category }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      // TODO: return false if the item is already in
      canDrop: monitor.canDrop(),
    }),
  })
  const indicators = store.rewards.map(reward => (
    <Indicator key={reward} {...{ reward, category }} />
  ))
  return (
    <div className={clsx('dropzone', {
      'drop-hover': isOver
    })} ref={drop}>
      {indicators}
    </div>
  )
})

export default DropZone;
