import React from 'react';
import './App.css';
import { useStore } from './store/useStore';

function App() {
  const store = useStore()
  const rewards = store.rewards.map(reward => (
    <div key={reward} className='reward'>{reward}</div>
  ))
  const categories = store.categories.map(category => (
    <div className='lane'>
      <div key={category} className='header'>{category}</div>
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
    </div>
  )
}

export default App;
