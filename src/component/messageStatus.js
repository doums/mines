import React, { useContext } from 'react'
import { GameContext, GameState } from '../constant'

const MessageStatus = () => {
  const { game: { gameState } } = useContext(GameContext)
  let message
  switch (gameState) {
    case GameState.run:
      message = 'You need 45 points'
      break
    case GameState.lose:
      message = 'Game over!'
      break
    case GameState.win:
      message = 'You win!'
      break
  }
  return (
    <div className='mt3'>
      { message }
    </div>
  )
}

export default MessageStatus
