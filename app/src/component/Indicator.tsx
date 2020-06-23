import React from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx'
import { useStore } from '../store/useStore';

const Indicator = observer((props: {
  category: string,
  reward: string
}) => {
  const { category, reward } = props
  const store = useStore()
  const set = store.getCategorySet(reward)
  const isBelongTo = set.has(category)
  return (
    <div className={clsx("indicator", {
      'belong-to': isBelongTo
    })}>
      {reward}
    </div>
  )
})

export default Indicator;
