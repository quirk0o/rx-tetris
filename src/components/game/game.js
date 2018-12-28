import React, {Component} from 'react'
import {clone, range} from 'ramda'
import {interval} from 'rxjs'

import {Board} from '../board/board'
import {filter, scan, tap} from 'rxjs/operators'

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

    this.board$ = this.block$.pipe(
      tap(console.log.bind(console)),
      filter(([_, y]) => y === props.size - 1),
      scan((board, block) => {
        const boardWithBlock = clone(board)
        boardWithBlock[block[1]][block[0]] = RED
        return boardWithBlock
      }, this.state.board)
    )

    this.block$.subscribe((block) => this.setState({block}))
    this.board$.subscribe((board) => this.setState({board}))
  }

  render () {
    const {board, block} = this.state
    const boardWithBlock = clone(board)
    boardWithBlock[block[1]][block[0]] = RED
    return (
      <Board board={boardWithBlock} />
    )
  }
}
