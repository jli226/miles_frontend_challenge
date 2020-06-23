import React from 'react';
import './App.css';
import { useStore } from './store/useStore';
import Reward from './component/Reward';
import { observer } from 'mobx-react';

const App = observer(() => {
  const store = useStore()
  const rewards = store.rewards.map(reward => (
    <Reward key={reward} reward={reward} />
  ))
  const categories = store.categories.map(category => (
    <div className='lane' key={category}>
      <div className='header'>{category}</div>
    </div>
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
        <div className='columns'>
          {categories}
        </div>
      </div>
      <button onClick={() => store.add('R1', 'C1')}>add</button>
      <button onClick={() => store.delete('R1', 'C1')}>remove</button>
      <button onClick={() => store.move('R1', 'C1', 'C2')}>move</button>
    </div>
  )
})

export default App;
