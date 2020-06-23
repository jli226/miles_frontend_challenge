import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';

const Indicator = observer((props: {
  category: string,
  reward: string
}) => {
  const { category, reward } = props
  const store = useStore()
  const set = store.getCategorySet(reward)
  const isBelongTo = set.has(category)
  if (isBelongTo) {
    return (
    <div>
      {reward}
    </div>
    )
  }
  return (
    <div>
      none
    </div>
  )
})

export default Indicator;
