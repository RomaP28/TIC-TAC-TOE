export function drawLine(num) {
  canvas.classList.remove('hide_element')
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // очищаем поле рисования
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
    ctx.moveTo(x, y)
    setInterval(function () {
      if (y < b) {
        y += 11.5
        ctx.lineTo(a, y)
      }
      ctx.fill()
      ctx.stroke()
    }, 10
    )
  }
  function drawDiagonalLineLeft(x, y, a, b) {
    ctx.moveTo(x, y)
    setInterval(function () {
      if (x < a && y < b) {
        x += 27
        y += 13.7
        ctx.lineTo(x, y)
      }
      ctx.fill()
      ctx.stroke()
    }, 10
    )
  }
  function drawDiagonalLineRight(x, y, a, b) {
    ctx.moveTo(x, y)
    setInterval(function () {
      if (x < a && b < y) {
        x += 27
        y = y - 13.7
        ctx.lineTo(x, y)
      }
      ctx.fill()
      ctx.stroke()
    }, 10
    )
  }
}
