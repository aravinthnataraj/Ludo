const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
score0El.textContent = 0;
// javascript will automatically convert this 0 to string
score1El.textContent = 0;
diceEl.classList.add("hidden");
let current_score = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = true;
// rolling a dice
const switchPlayer = function () {
  current_score = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    current_score;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
btnRoll.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.remove("hidden");
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `./assets/roll dice_${dice}.jpg`;
    if (dice !== 1) {
      current_score += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        current_score;
    } else {
      switchPlayer();
    }
  }
});
let active = 0;
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += current_score;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document.getElementById(`score--${activePlayer}`).textContent = "Win!";
      switchPlayer();
      document.getElementById(`score--${activePlayer}`).textContent = "Lost!";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      active = activePlayer == 1 ? 0 : 1;
      document
        .querySelector(`.player--${active}`)
        .classList.add("player--active");
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
});
