import _ from 'lodash'

const getTotal = map => {
  let total = 0
  map.forEach((row, i) => row.forEach((col, j) => {
    if (!isCellInfo(i, j) && col.value !== 0) {
      total += col.value
    }
  }))
  return total
}

export function isCellInfo (row, col) {
  return row === 6 || col === 6
}

export function getRowInfo (map, row) {
  let total = 0
  let bombs = 0
  map[row].forEach((cell, i) => {
    if (i < 6) {
      if (cell.value === 0) {
        bombs++
      } else if (!cell.shown) {
        total += cell.value
      }
    }
  })
  return { total, bombs }
}

export function getColInfo (map, col) {
  let total = 0
  let bombs = 0
  let i = 0
  while (i < 6) {
    const { value, shown } = map[i][col]
    if (value === 0) {
      bombs++
    } else if (!shown) {
      total += value
    }
    i++
  }
  return { total, bombs }
}

export function getRowProbs (map) {
  const prob = []
  map.forEach((row, i) => {
    if (i < 6) {
      let total = 0
      let bombs = 0
      row.forEach((col, j) => {
        if (j < 6 && !col.shown) {
          total++
        } if (j < 6 && col.value === 0) {
          bombs++
        }
      })
      if (bombs === 0) {
        prob.push(0)
      } else if (total === 0) {
        prob.push(100)
      } else {
        prob.push((bombs * 100.0) / total)
      }
    }
  })
  return prob
}

export function getColProbs (map) {
  const prob = []
  let i = 0
  while (i < 6) {
    let j = 0
    let total = 0
    let bombs = 0
    while (j < 6) {
      const { shown, value } = map[j][i]
      if (!shown) {
        total++
      } if (value === 0) {
        bombs++
      }
      j++
    }
    if (bombs === 0) {
      prob.push(0)
    } else if (total === 0) {
      prob.push(100)
    } else {
      prob.push((bombs * 100.0) / total)
    }
    i++
  }
  return prob
}

export function clearHighlightedCells (map) {
  return map.map(row => row.map(col => {
    if (col.highlighted) {
      col.highlighted = false
    }
    return col
  }))
}

export function revealBombs (map) {
  return map.map(row => row.map(col => {
    if (col.value === 0) {
      col.shown = true
    }
    return col
  }))
}

export function createMap () {
  let map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]
  map = map.map((row, i) => row.map((col, j) => {
      if (isCellInfo(i, j)) {
        return { total: 0, bombs: 0 }
      } else {
        const r = _.random(9)
        if (r < 5) {
          return { value: 1, shown: false, highlighted: false }
        } else if (r < 8) {
          return { value: 2, shown: false, highlighted: false }
        } else {
          return { value: 3, shown: false, highlighted: false }
        }
      }
    })
  )
  let bombs = 0
  while (bombs < 10) {
    const rx = _.random(5)
    const ry = _.random(5)
    if (map[rx][ry].value !== 0) {
      map[rx][ry].value = 0
      bombs++
    }
  }
  while (getTotal(map) < 50) {
    const rx = _.random(5)
    const ry = _.random(5)
    const r = _.random(2)
    if (map[rx][ry].value === 1 && r <= 1) {
      map[rx][ry].value = 2
    } else if (map[rx][ry].value === 1) {
      map[rx][ry].value = 3
    }
  }
  return map
}
