import React, { useContext } from 'react'
import { GameContext } from '../constant'
import { getColInfo, getRowInfo } from '../util'

const CellInfo = props => {
  const { row, col } = props
  const { game: { map } } = useContext(GameContext)
  let info
  if (row === 6 && col === 6) {
    return <div />
  }
  if (row === 6) {
    info = getColInfo(map, col)
  } else {
    info = getRowInfo(map, row)
  }
  const { total, bombs } = info
  return (
    <div
      className='flex justify-center items-center bg-dark-blue moon-gray'
    >
      { `${total}/${bombs}` }
    </div>
  )
}

export default CellInfo
