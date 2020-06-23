import React from 'react';
import { useDrag } from 'react-dnd'
import { observer } from 'mobx-react';
import clsx from 'clsx'
import { useStore } from '../store/useStore';
import { ItemTypes } from './ItemTypes';

const Indicator = observer((props: {
  category: string,
  reward: string
}) => {
  const { category, reward } = props
  const [, drag] = useDrag({
    item: { reward, srcCategory: category, type: ItemTypes.INDICATOR }
  })
  const store = useStore()
  const set = store.getCategorySet(reward)
  const isBelongTo = set.has(category)
  return (
    <div className={clsx("indicator", {
      'belong-to': isBelongTo
    })}
    ref={drag}
    >
      {reward}
    </div>
  )
})

export default Indicator;
