import React, { useContext } from 'react'
import { GameContext, GameState } from '../constant'

const Cell = props => {
  const { value, shown, row, col, highlighted } = props
  const { game: { gameState }, dispatch } = useContext(GameContext)
  const onClick = () => {
    if (!shown && gameState === GameState.run) {
      dispatch({ type: 'show', payload: { row, col } })
    }
  }
  let style = 'moon-gray flex justify-center items-center'
  if (!shown && !highlighted) {
    style += ' bg-green shadow-5'
  } else if (!shown && highlighted) {
    style += ' bg-light-purple shadow-5'
  } else if (shown && value === 0) {
    style += ' bg-light-red'
  }
  if (!shown && gameState === GameState.run) {
    style += ' grow raise'
  }
  return (
    <div
      className={style}
      onClick={onClick}
    >
      {
        shown && value !== 0 && value
      }
    </div>
  )
}

export default Cell
