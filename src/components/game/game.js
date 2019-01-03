import React, {Component} from 'react'
import {clone, range, transpose} from 'ramda'
import {interval} from 'rxjs'

import {Board} from '../board/board'
import {filter, scan, map, withLatestFrom} from 'rxjs/operators'

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
      block: [0, 0],
      board: range(0, props.size)
        .map(() => range(0, props.size)
          .map(() => BLANK))
    }

    this.tick$ = interval(500)
    this.block$ = this.tick$.pipe(
      scan((acc) => [0, (acc[1] + 1) % props.size], [0, 0])
    )

    this.column$ = this.block$.pipe(
      scan((board, block) => {
        const [x, y] = block
        if (y === this.props.size - 1 || board[x][y + 1] !== BLANK) {
          const boardWithBlock = clone(board)
          boardWithBlock[x][y] = RED
          return boardWithBlock
        }
        return board
      }, this.state.board)
    )

    this.board$ = this.column$.pipe(
      map(transpose),
      withLatestFrom(this.block$, (board, block) => {
        const boardWithBlock = clone(board)
        boardWithBlock[block[1]][block[0]] = RED
        return boardWithBlock
      })
    )

    this.block$.subscribe((block) => this.setState({block}))
    this.board$.subscribe((board) => this.setState({board}))
  }

  render () {
    const {board} = this.state

    return (
      <Board board={board} />
    )
  }
}
