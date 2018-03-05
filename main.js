function renderRow(rowIdx) {
  var rowEl = document.createElement('div');
  rowEl.classList.add('row');
  for (var i = 0; i < 15; i++) {
    var cell = document.createElement('div');
    cell.classList.add('cell');
    rowEl.appendChild(cell);
  }
  return rowEl;
}

function renderGrid() {
  var newEl = document.createElement('div');
  newEl.classList.add('grid');
  for (var i = 0; i < 15; i++) {
    var newRow = this.renderRow(i);
    newRow.setAttribute('id', '' + i);
    newEl.appendChild(newRow);
  }
  return newEl;
}

function render() {
  var gridEl = document.querySelector('#grid-container');
  gridEl.innerHTML = '';
  gridContent = this.renderGrid();
  gridEl.classList.add('board');
  gridEl.appendChild(gridContent);
}

var board = {
  render: render,
  renderGrid: renderGrid,
  renderRow: renderRow,
};

board.render();

var grid = document.querySelector('.grid');
var container = document.querySelector('main');
var body = document.querySelector('body');

var cells = document.querySelectorAll('.cell');

for (var i = 0; i < cells.length; i++) {
  cells[i].setAttribute('id', [i]);
}

// cells.forEach(function(element) {
//   if (element.id % 2 === 0) {
//     element.style.background = '#c4d5f2';
//   }
// });

var snake = [cells[106], cells[107], cells[108]];

for (var i = 0; i < cells.length; i += 15) {
  cells[i].classList.add('leftBorder');
}

for (var i = 14; i < cells.length; i += 15) {
  cells[i].classList.add('rightBorder');
}

var loser = document.createElement('div');
loser.classList.add('loser');
loser.textContent = 'GAME OVER';

body.appendChild(loser);

function play() {
  for (var i = 0; i < snake.length; i++) {
    snake[i].classList.add('inplay');
  }
}

play();

var startOver = document.createElement('div');
startOver.textContent = 'Play Again';
startOver.classList.add('startOver');

startOver.addEventListener('click', function() {
  for (var i = 0; i < snake.length; i++) {
    snake[i].classList.remove('inplay');
  }
  snake = [cells[106], cells[107], cells[108]];
  loser.style.opacity = '0';
  cells[el].classList.remove('food');
  play();
  food();
  clear();
  document.addEventListener('keydown', move);
});

container.appendChild(startOver);

document.addEventListener('keydown', move);

function gameOver() {
  loser.style.opacity = '1';
  document.removeEventListener('keydown', move);
  clear();
}

var intUp;
var intRight;
var intDown;
var intLeft;

function clear() {
  clearInterval(intUp);
  clearInterval(intRight);
  clearInterval(intDown);
  clearInterval(intLeft);
}

function move(event) {
  if (event.keyCode === 38) {
    clear();
    intUp = setInterval(moveUp, 200);
  } else if (event.keyCode === 39) {
    clear();
    intRight = setInterval(moveRight, 200);
  } else if (event.keyCode === 40) {
    clear();
    intDown = setInterval(moveDown, 200);
  } else if (event.keyCode === 37) {
    clear();
    intLeft = setInterval(moveLeft, 200);
  }
}

function moveUp() {
  console.log('up');
  if (snake[snake.length - 1].parentElement.id != 0) {
    j = snake.length - 1;
    k = snake[j].id - 15;
    if (cells[k].classList.contains('inplay')) {
      gameOver();
    }
    for (var i = 0; i < snake.length; i++) {
      snake[i].classList.remove('inplay');
    }
    if (cells[k].classList.contains('food')) {
      cells[k].classList.remove('food');
      snake.push(cells[k]);
      food();
    } else if (!cells[k].classList.contains('food')) {
      snake.shift();
      snake.push(cells[k]);
    }
    play();
  } else if (snake[snake.length - 1].parentElement.id == 0) {
    gameOver();
  }
}

function moveRight() {
  console.log('right');
  if (!snake[snake.length - 1].classList.contains('rightBorder')) {
    j = snake.length - 1;
    k = snake[j].id - -1;
    if (cells[k].classList.contains('inplay')) {
      gameOver();
    }
    for (var i = 0; i < snake.length; i++) {
      snake[i].classList.remove('inplay');
    }
    if (cells[k].classList.contains('food')) {
      cells[k].classList.remove('food');
      snake.push(cells[k]);
      food();
    } else if (!cells[k].classList.contains('food')) {
      snake.shift();
      snake.push(cells[k]);
    }
    play();
  } else if (snake[snake.length - 1].classList.contains('rightBorder')) {
    gameOver();
  }
}

function moveDown() {
  console.log('down');
  if (snake[snake.length - 1].parentElement.id != 14) {
    j = snake.length - 1;
    k = snake[j].id - -15;
    if (cells[k].classList.contains('inplay')) {
      gameOver();
    }
    for (var i = 0; i < snake.length; i++) {
      snake[i].classList.remove('inplay');
    }
    if (cells[k].classList.contains('food')) {
      cells[k].classList.remove('food');
      snake.push(cells[k]);
      food();
    } else if (!cells[k].classList.contains('food')) {
      snake.shift();
      snake.push(cells[k]);
    }
    play();
  } else if (snake[snake.length - 1].parentElement.id == 14) {
    gameOver();
  }
}

function moveLeft() {
  console.log('left');
  if (!snake[snake.length - 1].classList.contains('leftBorder')) {
    j = snake.length - 1;
    k = snake[j].id - 1;
    if (cells[k].classList.contains('inplay')) {
      gameOver();
    }
    for (var i = 0; i < snake.length; i++) {
      snake[i].classList.remove('inplay');
    }
    if (cells[k].classList.contains('food')) {
      cells[k].classList.remove('food');
      snake.push(cells[k]);
      food();
    } else if (!cells[k].classList.contains('food')) {
      snake.shift();
      snake.push(cells[k]);
    }
    play();
  } else if (snake[snake.length - 1].classList.contains('leftBorder')) {
    gameOver();
  }
}

food();

function food() {
  el = Math.floor(Math.random() * 225);
  if (!cells[el].classList.contains('inplay')) {
    cells[el].classList.add('food');
  } else if (cells[el].classList.contains('inplay')) {
    console.log(el);
    el = Math.floor(Math.random() * 225);
    food();
  }
}
