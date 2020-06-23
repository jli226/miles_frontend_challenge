import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';
import Indicator from './Indicator';

const Indicators = observer((props: {
  category: string,
}) => {
  const { category } = props
  const store = useStore()
  const indicators = store.rewards.map(reward => (
    <Indicator key={reward} {...{ reward, category }} />
  ))
  return (
    <div className='indicators'>
      {indicators}
    </div>
  )
})

export default Indicators;
