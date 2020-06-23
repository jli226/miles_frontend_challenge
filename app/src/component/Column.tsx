import React from 'react';
import DropZone from './DropZone';

const Column = (props: { category: string }) => {
  const { category } = props
  return (
    <div className='lane' key={category}>
      <div className='header'>{category}</div>
      <DropZone {...{ category }} />
    </div>
  )
}

export default Column;
