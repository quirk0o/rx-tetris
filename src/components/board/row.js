import React from 'react'

import './row.css'

import {Cell} from './cell'

export const Row = ({row}) => (
  <div className="board__row">
    {row.map((color, idx) => (
      <Cell key={idx} color={color} />
    ))}
  </div>
)
