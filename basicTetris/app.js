document.addEventListener('DOMContentLoaded', () => {
// export function f1() {...}
//import { f1 } from "./file1.js";

  // const node = document.querySelector("#tetrisGrid");
  //  [...Array(300)].forEach(_ =>
  //  node.parentNode.insertBefore(node.cloneNode(true), node)
  //  );
  var tetrisGridElems = "";
  for (var i = 0; i < 200; i++) {
    tetrisGridElems += '<div></div>';
  }
  var tetrisGridTakenClasses = "";
  for (var j = 0; j < 10; j++) {
    tetrisGridTakenClasses += '<div class="taken" style="border:none"></div>';
  }
  document.getElementById("tetrisGrid").innerHTML = tetrisGridElems;
  document.getElementById("tetrisGrid").innerHTML += tetrisGridTakenClasses;

  var nextTetriminoElems = "";
  for (var k = 0; k < 36; k++) {
    nextTetriminoElems += '<div></div>';
  }
  document.getElementById("nextTetriminoDisplay").innerHTML = nextTetriminoElems;

  const tetris = document.querySelector(".TETRISCONTAINER");
  console.log(tetris);
  const grid = document.querySelector("#tetrisGrid");
  console.log(grid);
  let squares = Array.from(document.querySelectorAll("#tetrisGrid div"));
  const scoreDisplay = document.querySelector("#score");
  const startButton = document.querySelector("#startButton");
  var introMusic = document.querySelector("#introMusic");
  var playMusic = document.querySelector("#playMusic");
  var playTetris = document.querySelector("#TETRISBUTTON");
  const width = 10;
  let nextRandom = 0;
  let timerID;
  let highlighTextTimer;
  let score = 0;
  let hasStarted = false;
  let areThereAnyWordsDrawn = false;

  let currentLetter = 0;

const lettersAccessor = [
  [0,0],[0,1],[0,2],[0,3],[0,4],//for 'Press'
[1,0],[1,1],[1,2],//for 'Any'
[2,0],[2,1],[2,2],//for 'Key'
[3,0],[3,1], //'To'
[4,0],[4,1],[4,2],[4,3],[4,4]//'Continue'
];
  const pressAnyKeyToStart = [
    [[width*3+1,"P"], [width*3+2,"r"],[width*3+3,"e"],[width*3+4,"s"],[width*3+5,"s"]],
    [[width*5+2,"A"],[width*5+3,"n"],[width*5+4,"y"]],
    [[width*7+3,"K"],[width*7+4,"e"],[width*7+5,"y"]],
    [[width*9+4,"t"],[width*9+5,"o"]],
    [[width*11+5,"S"],[width*11+6,"t"],[width*11+7,"a"],[width*11+8,"r"],[width*11+9,"t"]]
  ];


  //tetramino colours
  const colours = [
    'orangeTetrimino',
    'redTetrimino',
    'purpleTetrimino',
    'greenTetrimino',
    'blueTetrimino'
  ];

  //Tetriminors with all rotations
  const lTetrimino = [
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [0, width, width + 1, width + 2]
  ];

  const zTetrimino = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1]
  ];

  const oTetrimino = [
    [width, width + 1, width * 2, width * 2 + 1],
    [width, width + 1, width * 2, width * 2 + 1],
    [width, width + 1, width * 2, width * 2 + 1],
    [width, width + 1, width * 2, width * 2 + 1]
  ];

  const iTetrimino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const tTetrimino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const theTetriminos = [lTetrimino, zTetrimino, oTetrimino, iTetrimino, tTetrimino];

  let currentPosition = 4;
  let currentRotation = 0;

  //select random tetrimino
  let random = Math.floor(Math.random() * theTetriminos.length);
  let current = theTetriminos[random][currentRotation];


 function showTetris() {
   highlighTextTimer = setInterval(highlightNextLetter, 1000);
   tetris.style.display = "block";
   playIntroMusic();
   playTetris.style.display = "none";
 }

 function playIntroMusic() {
   introMusic.play();
 }

 function playPlayMusic() {
   playMusic.play();
 }

 function pausePlayMusic() {
   playMusic.pause();
 }

 function pauseIntroMusic() {
   introMusic.pause();
 }

  function drawWords(wordsArray) {
    wordsArray.forEach(word => word.forEach(letter => squares[letter[0]].innerHTML = letter[1]));
     // wordsArray.forEach(word => word.forEach(letter => console.log(squares[letter[0]])));
    areThereAnyWordsDrawn = true;
  }

  function undrawWords(wordsArray) {
    wordsArray.forEach(word => word.forEach(letter => squares[letter[0]].innerHTML = ''));
    areThereAnyWordsDrawn = false;
  }

function highlightNextLetter() {
  if(currentLetter === 0){
    squares[pressAnyKeyToStart[4][4][0]].classList.remove("selectedLetter");

  } else {
    currentSquare.classList.remove("selectedLetter");
  }
  word = lettersAccessor[currentLetter][0];
  letter = lettersAccessor[currentLetter][1];
  currentSquare = squares[pressAnyKeyToStart[word][letter][0]];

   currentSquare.classList.add("selectedLetter");
  // currentSquare.style.height = "25px";
  // currentSquare.style.width = "25px";
  currentLetter = (currentLetter + 1) % lettersAccessor.length;
}
  function draw() {
    current.forEach(tetriminoBlockLocation => {
      squares[currentPosition + tetriminoBlockLocation].classList.add('tetrimino');
        squares[currentPosition + tetriminoBlockLocation].style.borderLeft = '2px solid white';
        squares[currentPosition + tetriminoBlockLocation].style.borderTop = '2px solid lightGrey';
      console.log(colours[random]);
      squares[currentPosition + tetriminoBlockLocation].classList.add(colours[random]);
    });
  }


  //undraw the tetrimino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetrimino');
      squares[currentPosition + index].style.borderLeft = '';
      squares[currentPosition + index].style.borderTop = '';
      squares[currentPosition + index].classList.remove(colours[random]);
    });
  }

  playTetris.addEventListener('click', showTetris);


  drawWords(pressAnyKeyToStart);
  // make the terimino move down every second
  // timerID = setInterval(moveDown, 1000);

  //assign functions to KeyCodes
  function control(e) {
    if(tetris.style.display === "block") {
      if(currentSquare) {currentSquare.classList.remove("selectedLetter");}
      clearInterval(highlighTextTimer);
      highlighTextTimer = null;
    if(areThereAnyWordsDrawn) {
      undrawWords(pressAnyKeyToStart);
    }
    if(!hasStarted) {
      draw();
      timerID = setInterval(moveDown, 1000);
      pauseIntroMusic();
      playPlayMusic();
      squares.forEach(square => square.style.transition = "0s");
      hasStarted = true;
      displayShape();
    }
    if (timerID) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  }
}

//listen out for keystrokes
  document.addEventListener('keyup', control);

  function moveDown() {
    undraw();
    currentPosition += width;
    if (current.some(index => squares[currentPosition + index ].classList.contains('taken'))) {
      freeze();
    } else {
    draw();
}
  }

  //freeze function
  function freeze() {
    if (current.some(index => squares[currentPosition + index ].classList.contains('taken'))) {
      currentPosition -= width;
      draw();
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetriminos.length);
      current = theTetriminos[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  //move the tetrimino left unless is is at the edge or there is a bloackage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }

  //move the tetrimino right unless is is at the edge or there is a bloackage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    const isleftOfTaken = current.some(index => squares[currentPosition + index + 1].classList.contains('taken'));
    if (!isAtRightEdge && !isleftOfTaken) currentPosition += 1;
    // if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    //   currentPosition -= 1;
    // }

    draw();
  }

function computeOverlappNumber(potentialRotatedPosition, oneBlock, twoBlocks) {
  if(potentialRotatedPosition.some(index => (currentPosition + index) % width === twoBlocks)) {
    return 2;
  } else if (potentialRotatedPosition.some(index => (currentPosition + index) % width === oneBlock)) {
    return 1;
  }
  else return 0;
}

  function getOverlapNumber(potentialRotatedPosition, isAtLeftEdge, isAtRightEdge) {
    if (isAtRightEdge) {
      return - computeOverlappNumber(potentialRotatedPosition,0,1);
    } else if (isAtLeftEdge) {
      return computeOverlappNumber(potentialRotatedPosition,width -1,width -2);
    } else {
      return 0;
        }
  }

  //rotate tetrimino
  function rotate() {
    undraw();
    var nextRotation = (currentRotation + 1) % 4;
    const potentialRotatedPosition = theTetriminos[random][nextRotation];

    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1 ||  (currentPosition + index) % width === width - 2);
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0 || (currentPosition + index) % width === 1);

    const overlap = getOverlapNumber(potentialRotatedPosition, isAtLeftEdge, isAtRightEdge);

    const isGoingToOverlapTaken = potentialRotatedPosition.some(index => squares[currentPosition + index].classList.contains('taken'));

    // console.log('isGoingToOverlapTaken:' + isGoingToOverlapTaken);
    // console.log(overlap);
    if (potentialRotatedPosition.some(index => (currentPosition + index) > 199) || isGoingToOverlapTaken) {

    } else {
    currentRotation = (currentRotation + 1) % 4;

    currentPosition = currentPosition + overlap;
    current = theTetriminos[random][currentRotation];
}
    draw();
  }

  //show up-next tetrimino in mini grid Display
  const displaySquares = document.querySelectorAll("#nextTetriminoDisplay div");
  const displayWidth = 6;
  const displayIndex = displayWidth + 1;
  //The Tetriminos without rotations
  const upNextTetriminos = [// l z o t i
    [1, 2, displayWidth + 1, displayWidth * 2 + 1],
    [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1],
    [displayWidth, displayWidth + 1, displayWidth * 2, displayWidth * 2 + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2]
  ];

  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('tetrimino');
      square.classList.remove(colours[random]);
    });
    upNextTetriminos[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetrimino');
      displaySquares[displayIndex + index].classList.add(colours[nextRandom]);
      console.log(displaySquares[displayIndex + index]);
    });

  }

  var hasRandomBeenSet = false;
  //add functionality to sart/pause button
  startButton.addEventListener('click', () => {
    currentSquare.classList.remove("selectedLetter");
    clearInterval(highlighTextTimer);
    highlighTextTimer = null;
    pauseIntroMusic();
    undrawWords(pressAnyKeyToStart);
    if (timerID) {
      //pause
      pausePlayMusic();
      clearInterval(timerID);
      timerID = null;
    } else {
      draw();
      timerID = setInterval(moveDown, 1000);
      playPlayMusic();
      if(!hasStarted) {squares.forEach(square => square.style.transition = "0s");}
      hasStarted = true;
      if (!hasRandomBeenSet) {
        nextRandom = Math.floor(Math.random() * theTetriminos.length);
        hasRandomBeenSet = true;
      }

      displayShape();
    }
  });


  function addScore() {
    let rowsCompleted = 0;
    let scoreToAdd = 0;
    for (let ii = 0; ii < 199; ii+=width) {
      const row = [ii, ii+1, ii+2, ii+3, ii+4, ii+5, ii+6, ii+7, ii+8, ii+9];

      if(row.every(index => squares[index].classList.contains('taken'))) {
        rowsCompleted += 1;
        row.forEach(index => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetrimino');
          squares[index].style.borderLeft = '';
          squares[index].style.borderTop = '';
          colours.forEach(colour => squares[index].classList.remove(colour));
        });
        const squaresRemoved = squares.splice(ii, width);
        // console.log(squaresRemoved);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
      }
    }


//TODO CUrrent bug for not removing styling fom bloacks appended ack to the top
    if(rowsCompleted > 0) {
    scoreToAdd = Math.floor(Math.pow(rowsCompleted, 1.7))*10;
  }
    if (scoreToAdd === 100) {alert("WOW");}

    score += scoreToAdd;


    scoreDisplay.innerHTML = score;
  }


  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = "Game Over";
      clearInterval(timerID);
      pausePlayMusic();
      playIntroMusic();
      timerID = null;

    }
  }

  // TODO: FIX issue when rotating next to a block and moving into it




});
