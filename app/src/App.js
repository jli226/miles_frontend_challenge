import React from 'react';
import logo from './logo.svg';
import './App.css';

const REWARDS = [
  'R1',
  'R2',
  'R3',
  'R4',
  'R5',
]

const CATEGORIES = [
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
]

function App() {
  const rewards = REWARDS.map(reward => (
    <div key={reward} className='reward'>{reward}</div>
  ))
  const categories = CATEGORIES.map(category => (
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
