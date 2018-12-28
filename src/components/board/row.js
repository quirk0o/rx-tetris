import React from 'react'
import {range} from 'ramda'

import './row.css'

import {Cell} from './cell'

export const Row = ({size}) => (
  <div className="board__row">
    {range(0, size).map((i) => (
      <Cell key={i} />
    ))}
  </div>
)
