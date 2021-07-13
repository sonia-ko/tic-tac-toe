export const img0 = document.querySelector(".x-image");
export const img1 = document.querySelector(".o-image");
export const startGameBtn = document.querySelector(".start-game-btn");

const tableCells = document.querySelectorAll("td");
const gameArea = document.querySelector(".game-area");
const gameTable = document.querySelector("table");
const gameStateEl = document.querySelector(".state-paragraph");

const dragging = {
  target: img0,
  activeTarget: "X",
  isDragged: false,
  positionOfMouse: {
    x: 0,
    y: 0,
  },
  offset: {
    left: 0,
    top: 0,
  },
  overlapFound: false,
  elementSet: false,
  leftIitial: "70%", //initial position of the dragged element
  topImitial: "40%",
};

export function gameStart() {
  img1.classList.add("hidden");
  img0.classList.remove("hidden");
  gameStateEl.textContent = "Please move the X sign to start the game.";
  tableCells.forEach((el) => {
    el.classList.remove("cell-filled");
    el.innerHTML = "&nbsp;&nbsp;";
  });
  gameTable.classList.remove("game-inactive");
  dragging.isDragged = false;
  dragging.target = img0;
  dragging.activeTarget = "X";
}

export function dragStart(e) {
  if (dragging.isDragged) return;
  if (e.target !== dragging.target) return;
  dragging.isDragged = true;
  dragging.offset.left = e.target.offsetLeft - e.clientX;
  dragging.offset.top = e.target.offsetTop - e.clientY;
}

export function dragEnd(e) {
  dragging.isDragged = false;
  tableCells.forEach((el) => checkIntersection(el, dragging.target));
  dragging.overlapFound = false;

  // moves the image back to the initial position
  e.target.style.left = `${dragging.leftIitial}`;
  e.target.style.top = `${dragging.topImitial}`;
  if (dragging.elementSet) {
    img1.classList.toggle("hidden");
    img0.classList.toggle("hidden");
    // updates the state paragraph
    gameStateEl.textContent = `Please move the ${
      dragging.activeTarget === "X" ? "O" : "X"
    }.`;
    checkWinner();
    switchSign(e);
  }
}

export function onDrag(e) {
  e.preventDefault();
  if (dragging.isDragged) {
    dragging.positionOfMouse.x = e.clientX;
    dragging.positionOfMouse.y = e.clientY;
    e.target.classList.add("image-dragged");
    e.target.style.left =
      dragging.positionOfMouse.x + dragging.offset.left + "px";
    e.target.style.top =
      dragging.positionOfMouse.y + dragging.offset.top + "px";
  }
}

function switchSign(e) {
  // switches the target image element
  dragging.target = dragging.target === img0 ? img1 : img0;
  // switches the target image object
  dragging.activeTarget = dragging.activeTarget === "X" ? "O" : "X";
  dragging.elementSet = false;
}

function checkIntersection(targetEl, draggedEl) {
  if (!dragging.overlapFound) {
    targetElCoords = targetEl.getBoundingClientRect();
    draggedElCoords = draggedEl.getBoundingClientRect();

    let overlap = !(
      targetElCoords.right < draggedElCoords.left ||
      targetElCoords.left > draggedElCoords.right ||
      targetElCoords.bottom < draggedElCoords.top ||
      targetElCoords.top > draggedElCoords.bottom
    );

    if (
      overlap &&
      targetEl.textContent !== "X" &&
      targetEl.textContent !== "O"
    ) {
      targetEl.textContent = `${dragging.activeTarget}`;
      targetEl.classList.add("cell-filled");
      dragging.overlapFound = true;
      dragging.elementSet = true;
    }
  }
}

function checkWinnerAlgorithm(num1, num2, num3) {
  let winner = false;
  if (
    tableCells[num1].textContent === tableCells[num2].textContent &&
    tableCells[num2].textContent === tableCells[num3].textContent &&
    (tableCells[num1].textContent === "X" ||
      tableCells[num2].textContent === "O")
  ) {
    winner = true;
  }

  return winner;
}

function checkWinner() {
  // check if X or O is a winner
  let winners = [
    checkWinnerAlgorithm(0, 1, 2),
    checkWinnerAlgorithm(3, 4, 5),
    checkWinnerAlgorithm(6, 7, 8),
    checkWinnerAlgorithm(0, 3, 6),
    checkWinnerAlgorithm(1, 4, 7),
    checkWinnerAlgorithm(2, 5, 8),
    checkWinnerAlgorithm(0, 4, 8),
    checkWinnerAlgorithm(2, 4, 6),
  ];
  let finalWinner = winners.some((el) => el === true);

  // check if all the table cells are filled
  let cellsFilled = [];
  for (const el of tableCells) {
    if (el.classList.contains("cell-filled")) {
      cellsFilled.push(true);
    } else {
      cellsFilled.push(false);
    }
  }
  let allCellsFilled = cellsFilled.every((el) => el === true);

  if (finalWinner) {
    gameStateEl.textContent = `${dragging.target.dataset.gameValue} is a winner   🏆🥇😉. To start a new game, click on the Start game button 🎉`;
    hideImages();
    gameTableFading();
  }

  if (!finalWinner && allCellsFilled) {
    gameStateEl.textContent = `There is no winner here 🦝. To start a new game, click on the Start game button 🎉`;
    hideImages();
    gameTableFading();
  }

  function hideImages() {
    img0.classList.add("hidden");
    img1.classList.add("hidden");
  }

  function gameTableFading() {
    gameTable.classList.add("game-inactive");
  }
}
