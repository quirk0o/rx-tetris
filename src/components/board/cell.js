import React from 'react'

import './cell.css'

export const Cell = ({color}) => (
  <div className="board__cell" style={{backgroundColor: color}} />
)
