import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';

const Reward = observer((props: { reward: string }) => {
  const { reward } = props
  const store = useStore()
  const categoryArray = store.getCategorySet(reward)
  console.log(categoryArray, categoryArray.size);
  return (
    <div className='reward'>{reward} {categoryArray.size}</div>
  )
})

export default Reward;
