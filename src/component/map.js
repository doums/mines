import React, { useContext } from 'react'
import { GameContext } from '../constant'
import Cell from './cell'
import { isCellInfo } from '../util'
import CellInfo from './cellInfo'

const Map = () => {
  const { game: { map } } = useContext(GameContext)
  return (
    <div className='map mr3'>
      {
        map.map((row, i) => row.map((col, j) => {
          if (isCellInfo(i, j)) {
            return <CellInfo key={`${i}${j}`} row={i} col={j} />
          }
          return <Cell key={`${i}${j}`} {...col} row={i} col={j} />
        }))
      }
    </div>
  )
}

export default Map
