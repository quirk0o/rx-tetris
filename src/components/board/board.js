import React from 'react'

import './board.css'

import {Row} from './row'

export const Board = ({board}) => (
  <div className="board" style={{marginTop: `calc(50% - ${board.length * 40}px)`}}>
    {board.map((row, idx) => (
      <Row key={idx} row={row} />
    ))}
  </div>
)
