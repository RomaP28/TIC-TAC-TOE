
const scoreboards = document.querySelectorAll('.scoreboard')
const cells = document.querySelectorAll('.cell')
const result = document.querySelectorAll('.result')
const scores = document.querySelectorAll('.score')
const canvas = document.getElementById('cnvs');
cells.forEach(cell => cell.addEventListener('click', play))
cells.forEach(cell => cell.classList.add('pointer'))


const points = {
  firstPlayer: 0,
  secondPlayer: 0,
}

const start = () => {
  reset()
  let random = Math.floor(Math.random() * 2)
  gameProcess.turn = random
  scoreboards[random].classList.add('light_border')
  scoreboards[random].childNodes[1].classList.add('underLine')
  result[random].classList.remove('hide_result')
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
  let draw = 0;
  scoreboards.forEach(item => item.classList.toggle('light_border'))
  scoreboards.forEach(item => item.childNodes[1].classList.toggle('underLine'))
  arr.forEach(function (item) {
    if (player1.includes(item[0]) && player1.includes(item[1]) && player1.includes(item[2])) {
      draw = 1
      scores[0].innerHTML = ++points.firstPlayer
      drawLine(arr.indexOf(item))
      finishGame('WIN!', 'LOST!', 0)
    } else if (player2.includes(item[0]) && player2.includes(item[1]) && player2.includes(item[2])) {
      draw = 1
      scores[1].innerHTML = ++points.secondPlayer
      drawLine(arr.indexOf(item))
      finishGame('LOST!', 'WIN!', 1)
    } else if ((player1.length === 5 || player2.length === 5) && draw === 0) {
      finishGame('DRAW!', 'DRAW!', 0)
      result.forEach(item => item.classList.remove('hide_result'))
      scoreboards.forEach(item => item.classList.remove('light_border'))
      scoreboards.forEach(item => item.childNodes[1].classList.remove('underLine'))
    }
  })

}

const finishGame = (str1, str2, num) => {
  result[0].innerHTML = str1
  result[1].innerHTML = str2
  scoreboards.forEach(item => item.classList.remove('light_border'))
  scoreboards[num].classList.add('light_border')
  scoreboards.forEach(item => item.childNodes[1].classList.remove('underLine'))
  scoreboards[num].childNodes[1].classList.add('underLine')
  result[num].classList.remove('hide_result')
}

const reset = () => {
  gameProcess.firstPlayer = []
  gameProcess.secondPlayer = []
  cells.forEach(item => item.childNodes[1].classList.remove('circle'))
  cells.forEach(item => item.childNodes[1].classList.remove('cross'))
  scoreboards.forEach(item => item.classList.remove('light_border'))
  scoreboards.forEach(item => item.childNodes[1].classList.remove('underLine'))
  result.forEach(item => item.classList.add('hide_result'))
  result.forEach(item => item.innerHTML = 'Your turn!')
  canvas.classList.add('hide_result')
}

const drawLine = (num) => {
  canvas.classList.remove('hide_result')
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 5 // толщина линии
  ctx.strokeStyle = 'red' // цвет линии
  ctx.fillStyle = 'red' // цвет заливки
  let x, y, a, b;
  switch (num) {
    case 0:
      x = 25
      y = 25
      a = 275
      b = 25
      break;
    case 1:
      x = 25
      y = 75
      a = 275
      b = 75
      break;
    case 2:
      x = 25
      y = 126
      a = 275
      b = 126
      break;
    case 3:
      x = 50
      y = 12
      a = 50
      b = 138
      break;
    case 4:
      x = 150
      y = 12
      a = 150
      b = 138
      break;
    case 5:
      x = 250
      y = 12
      a = 250
      b = 138
      break;
    case 6:
      x = 27
      y = 15
      a = 272
      b = 138
      break;
    case 7:
      x = 27
      y = 138
      a = 272
      b = 15
      break;
  }
  ctx.beginPath()
  ctx.moveTo(x, y) //передвигаем перо
  // setInterval(function () {
  // if (x < a) {
  // x += 25
  ctx.lineTo(a, b) //рисуем линию
  // }
  ctx.fill()
  ctx.stroke()
  // }, 10
  // )
  ctx.closePath()
}
