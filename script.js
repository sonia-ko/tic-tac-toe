import * as Modal from "./modal.js";
import * as Game from "./game.js";

/// MODAL WINDOW FUNCTIONALITY

Modal.btnOpenModal.addEventListener("click", Modal.openModal);
Modal.btnCloseModal.addEventListener("click", Modal.closeModal);
Modal.overlay.addEventListener("click", Modal.closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !Modal.modal.classList.contains("hidden")) {
    Modal.closeModal();
  }
});

// Game functionality

Game.xImg.addEventListener("mousedown", Game.dragStart, true);
Game.oImg.addEventListener("mousedown", Game.dragStart, true);

Game.xImg.addEventListener("mouseup", Game.dragEnd, true);
Game.oImg.addEventListener("mouseup", Game.dragEnd, true);

document.addEventListener("mousemove", Game.onDrag, true);

Game.startGameBtn.addEventListener("click", Game.gameStart);

Game.gameStart();
