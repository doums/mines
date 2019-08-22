import React, { useReducer } from 'react'
import { hot } from 'react-hot-loader/root'
import 'tachyons/css/tachyons.min.css'
import '../style.css'
import { InitGame, GameState, GameContext } from '../constant'
import Game from './game'
import { clearHighlightedCells, createMap, getColProbs, getRowProbs, revealBombs } from '../util'

const show = (state, { row, col }) => {
  const { map, score, gameState } = state
  const cell = map[row][col]
  if (cell.shown) {
    return state
  }
  map[row][col].shown = true
  let newScore = score
  let newGameState = gameState
  switch (cell.value) {
    case 0:
      newGameState = GameState.lose
      break
    case 1:
      newScore++
      break
    case 2:
      newScore += 2
      break
    case 3:
      newScore += 3
      break
  }
  if (newGameState !== GameState.lose && newScore >= 45) {
    newGameState = GameState.win
  }
  let newMap = clearHighlightedCells(map)
  if (newGameState !== GameState.run) {
    newMap = revealBombs(newMap)
  }
  return {
    map: newMap,
    gameState: newGameState,
    score: newScore
  }
}

const help = state => {
  const { map, gameState } = state
  if (gameState !== GameState.run) {
    return state
  }
  const rowProbs = getRowProbs(map)
  const colProbs = getColProbs(map)
  let minProb = 200
  let highlightedCells = []
  map.forEach((row, i) => {
    if (i < 6) {
      row.forEach((col, j) => {
        if (j < 6 && !col.shown) {
          const rowProb = rowProbs[i]
          const colProb = colProbs[j]
          if (rowProb === 0 || colProb === 0) {
            minProb = 0
            highlightedCells.push({ row: i, col: j, value: 0 })
          } else if (rowProb + colProb <= minProb && rowProb < 100 && colProb < 100) {
            minProb = rowProb + colProb
            highlightedCells.push({ row: i, col: j, value: minProb })
          }
        }
      })
    }
  })
  let minValue = 200
  highlightedCells.forEach(({ value }) => {
    if (value < minValue) {
      minValue = value
    }
  })
  highlightedCells = highlightedCells.filter(({ value }) => value <= minValue)
  highlightedCells.forEach(({ row, col }) => { map[row][col].highlighted = true })
  return {
    map,
    ...state
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'show':
      return show(state, action.payload)
    case 'new game':
      return { score: 0, map: createMap(), gameState: GameState.run }
    case 'help':
      return help(state)
    default:
      throw new Error()
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, InitGame)
  return (
    <GameContext.Provider value={{ game: state, dispatch }}>
      <Game />
    </GameContext.Provider>
  )
}

export default hot(App)
