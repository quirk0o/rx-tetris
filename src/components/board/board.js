import React from 'react'
import {range} from 'ramda'

import './board.css'

import {Row} from './row'

export const Board = ({size = 5}) => (
  <div className="board" style={{marginTop: `calc(50% - ${size * 40}px)`}}>
    {range(0, size).map((i) => (
      <Row key={i} size={size} />
    ))}
  </div>
)
