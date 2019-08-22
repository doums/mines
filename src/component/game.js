import React, { useContext } from 'react'
import { GameContext, GameState } from '../constant'
import Map from './map'
import MessageStatus from './messageStatus'

const Game = () => {
  const { game: { score, gameState }, dispatch } = useContext(GameContext)
  return (
    <div className='flex-row justify-center mt5 moon-gray pa3'>
      <div className='flex mb3'>
        <Map />
        <div>
          <div>{ `score: ${score}` }</div>
          <MessageStatus />
        </div>
      </div>
      <button
        className='grow shadow-3 bg-orange black h2 ph3 mr3'
        onClick={() => dispatch({ type: 'new game' })}
      >
        new game
      </button>
      <button
        className={`${gameState === GameState.run && 'grow'} shadow-3 bg-yellow dark-gray h2 ph3`}
        onClick={() => dispatch({ type: 'help' })}
      >
        help
      </button>
    </div>
  )
}

export default Game
