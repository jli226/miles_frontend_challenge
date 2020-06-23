import React from 'react';
import { useDrag } from 'react-dnd'
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';
import { ItemTypes } from './ItemTypes';

const Reward = observer((props: { reward: string }) => {
  const { reward } = props
  const store = useStore()
  const [collectedProps, drag] = useDrag({
    item: { reward, type: ItemTypes.REWARD }
  })
  const categoryArray = store.getCategorySet(reward)
  console.log(categoryArray, categoryArray.size);
  return (
    <div ref={drag} className='reward'>{reward} {categoryArray.size}</div>
  )
})

export default Reward;
