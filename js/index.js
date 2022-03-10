
const scoreboards = document.querySelectorAll('.scoreboard')
const cells = document.querySelectorAll('.cell')
const result = document.querySelectorAll('.result')


const start = () => {
  reset()
  let random = Math.floor(Math.random() * 2)
  gameProcess.turn = random
  scoreboards[random].classList.add('light_border')
  result[random].classList.remove('hide_result')
  cells.forEach(cell => cell.addEventListener('click', play))
}

function play() { gameProcess.nextTurn(this) }

const gameProcess = {
  firstPlayer: [],
  secondPlayer: [],
  nextTurn(item) {
    if (item.childNodes[1].classList.contains('circle') || item.childNodes[1].classList.contains('cross')) { return }
    if (this.turn === 0) {
      this.figure = 'circle'
      this.firstPlayer.push(+item.id)
      this.turn = 1
    } else {
      this.figure = 'cross'
      this.secondPlayer.push(+item.id)
      this.turn = 0
    }
    item.childNodes[1].classList.add(this.figure)
    result.forEach(item => item.classList.toggle('hide_result'))
    checkCombination(this.firstPlayer, this.secondPlayer)
  }
}

const checkCombination = (player1, player2) => {
  const arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ]
  arr.forEach(function (item) {
    if (player1.includes(item[0]) && player1.includes(item[1]) && player1.includes(item[2])) {
      finishGame('ZERO WIN!', 'CROSS LOST!', 0)
    } else if (player2.includes(item[0]) && player2.includes(item[1]) && player2.includes(item[2])) {
      finishGame('ZERO LOST!', 'CROSS WIN!', 1)
    } else if (player1.length === 5 || player2.length === 5) {
      finishGame('DRAW!', 'DRAW!', 0)
      result.forEach(item => item.classList.remove('hide_result'))
    }
  })
  scoreboards.forEach(item => item.classList.toggle('light_border'))
}

const finishGame = (str1, str2, num) => {
  result[0].innerHTML = str1
  result[1].innerHTML = str2
  result[num].classList.remove('hide_result')
  cells.forEach(cell => cell.removeEventListener('click', play))
}

const reset = () => {
  gameProcess.firstPlayer = []
  gameProcess.secondPlayer = []
  cells.forEach(item => item.childNodes[1].classList.remove('circle'))
  cells.forEach(item => item.childNodes[1].classList.remove('cross'))
  scoreboards.forEach(item => item.classList.remove('light_border'))
  result.forEach(item => item.classList.add('hide_result'))
  result.forEach(item => item.innerHTML = 'Your turn!')
}