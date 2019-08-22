import React from 'react'
import { createMap } from './util'

export const GameState = {
  run: 1,
  win: 2,
  lose: 3
}
Object.freeze(GameState)

export const InitGame = {
  map: createMap(),
  score: 0,
  gameState: GameState.run
}

export const GameContext = React.createContext(InitGame)
