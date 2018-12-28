import React, {Component} from 'react'
import {range} from 'ramda'

import {Board} from '../board/board'

const BLANK = 'BLANK'
const RED = 'red'
const BLUE = 'blue'
const GREEN = 'green'

export class Game extends Component {
  static defaultProps = {
    size: 5
  }

  constructor (props) {
    super(props)

    this.state = {
      board: range(0, props.size)
        .map(() => range(0, props.size)
          .map(() => BLANK))
    }

    this.state.board[0][1] = RED
    this.state.board[0][3] = BLUE
    this.state.board[1][2] = GREEN
  }

  render () {
    const {board} = this.state
    return (
      <Board board={board} />
    )
  }
}
