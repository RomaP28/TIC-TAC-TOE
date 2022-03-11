
const scoreboards = document.querySelectorAll('.scoreboard')
const cells = document.querySelectorAll('.cell')
const result = document.querySelectorAll('.result')
const scores = document.querySelectorAll('.score')
const canvas = document.getElementById('cnvs');



const points = {
  firstPlayer: 0,
  secondPlayer: 0,
}

const start = () => {
  reset()
  let random = Math.floor(Math.random() * 2)
  gameProcess.turn = random
  scoreboards[random].classList.add('light_border')
  result[random].classList.remove('hide_result')
  cells.forEach(cell => cell.addEventListener('click', play))
  cells.forEach(cell => cell.classList.add('pointer'))
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
  let draw = 0;
  scoreboards.forEach(item => item.classList.toggle('light_border'))
  arr.forEach(function (item) {
    if (player1.includes(item[0]) && player1.includes(item[1]) && player1.includes(item[2])) {
      draw = 1
      scores[0].innerHTML = ++points.firstPlayer
      drawLine(arr.indexOf(item))
      throw finishGame('WIN!', 'LOST!', 0)
    } else if (player2.includes(item[0]) && player2.includes(item[1]) && player2.includes(item[2])) {
      draw = 1
      scores[1].innerHTML = ++points.secondPlayer
      drawLine(arr.indexOf(item))
      throw finishGame('LOST!', 'WIN!', 1)
    } else if ((player1.length === 5 || player2.length === 5) && draw === 0) {
      finishGame('DRAW!', 'DRAW!', 0)
      result.forEach(item => item.classList.remove('hide_result'))
      scoreboards.forEach(item => item.classList.remove('light_border'))
    }
  })

}

const finishGame = (str1, str2, num) => {
  result[0].innerHTML = str1
  result[1].innerHTML = str2
  scoreboards.forEach(item => item.classList.remove('light_border'))
  scoreboards[num].classList.add('light_border')
  result[num].classList.remove('hide_result')
}

const reset = () => {
  gameProcess.firstPlayer = []
  gameProcess.secondPlayer = []
  cells.forEach(item => item.childNodes[1].classList.remove('circle'))
  cells.forEach(item => item.childNodes[1].classList.remove('cross'))
  scoreboards.forEach(item => item.classList.remove('light_border'))
  result.forEach(item => item.classList.add('hide_result'))
  result.forEach(item => item.innerHTML = 'Your turn!')
  canvas.classList.add('hide_result')
}

const drawLine = (num) => {
  canvas.classList.remove('hide_result')
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // очишаем поле рисования
  ctx.lineWidth = 5 // толщина линии
  ctx.strokeStyle = 'red' // цвет линии
  ctx.beginPath()// обозначаем начало рисования новой фигуры
  let x, y, a, b;
  switch (num) {
    case 0:
      drawHorizontalLine(x = 25, y = 25, a = 275, b = 25)
      break;
    case 1:
      drawHorizontalLine(x = 25, y = 75, a = 275, b = 75)
      break;
    case 2:
      drawHorizontalLine(x = 25, y = 126, a = 275, b = 126)
      break;
    case 3:
      drawVerticalLine(x = 50, y = 12, a = 50, b = 138)
      break;
    case 4:
      drawVerticalLine(x = 150, y = 12, a = 150, b = 138)
      break;
    case 5:
      drawVerticalLine(x = 250, y = 12, a = 250, b = 138)
      break;
    case 6:
      drawDiagonalLineLeft(x = 27.2, y = 15, a = 272, b = 138)
      break;
    case 7:
      drawDiagonalLineRight(x = 27.2, y = 138, a = 272, b = 15)
      break;
  }

  ctx.stroke()
  ctx.closePath()


  function drawHorizontalLine(x, y, a, b) {
    ctx.moveTo(x, y) //передвигаем перо
    setInterval(function () {
      if (x < a) {
        x += 25
        ctx.lineTo(x, b) //рисуем линию
      }
      ctx.fill()
      ctx.stroke()
    }, 10
    )
  }
  function drawVerticalLine(x, y, a, b) {
    ctx.moveTo(x, y) //передвигаем перо
    setInterval(function () {
      if (y < b) {
        y += 11.5
        ctx.lineTo(a, y) //рисуем линию
      }
      ctx.fill()
      ctx.stroke()
    }, 10
    )
  }
  function drawDiagonalLineLeft(x, y, a, b) {
    ctx.moveTo(x, y) //передвигаем перо
    setInterval(function () {
      if (x < a && y < b) {
        x += 27
        y += 13.7
        ctx.lineTo(x, y) //рисуем линию
      }
      ctx.fill()
      ctx.stroke()
    }, 10
    )
  }
  function drawDiagonalLineRight(x, y, a, b) {
    ctx.moveTo(x, y) //передвигаем перо
    setInterval(function () {
      if (x < a && b < y) {
        x += 27
        y = y - 13.7
        ctx.lineTo(x, y) //рисуем линию
      }
      ctx.fill()
      ctx.stroke()
    }, 10
    )
  }
}
