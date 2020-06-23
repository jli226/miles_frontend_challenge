import React from 'react';
import './App.css';
import { useStore } from './store/useStore';
import Reward from './component/Reward';
import { observer } from 'mobx-react';
import Columns from './component/Columns';

const App = observer(() => {
  const store = useStore()
  const rewards = store.rewards.map(reward => (
    <Reward key={reward} reward={reward} />
  ))
  return (
    <div className="app">
      <div className="rewards-container">
        <div className="header">Rewards</div>
        <div className='placeholder' />
        {rewards}
      </div>
      <div className="categories-container">
        <div className="header">Categories</div>
        <Columns />
      </div>
    </div>
  )
})

export default App;
