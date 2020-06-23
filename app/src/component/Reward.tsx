import React from 'react';
import { useDrag } from 'react-dnd'
import { observer } from 'mobx-react';
import { ItemTypes } from './ItemTypes';

const Reward = observer((props: { reward: string }) => {
  const { reward } = props
  const [, drag] = useDrag({
    item: { reward, type: ItemTypes.REWARD }
  })
  return (
    <div ref={drag} className='reward'>{reward}</div>
  )
})

export default Reward;
