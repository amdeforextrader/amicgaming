let snake = [];
let food = {};
let dx = 10;
let dy = 0;
let score = 0;
let gameInterval;

function startSnake() {
  snake = [{x: 150, y: 150}];
  food = randomFood();
  dx = 10;
  dy = 0;
  score = 0;

  document.getElementById("snakeScore").innerText = "Score: 0";

  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(draw, 120);
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 30) * 10,
    y: Math.floor(Math.random() * 30) * 10
  };
}

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -10; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 10; }
  else if (e.key === "ArrowLeft" && dx === 0) { dx = -10; dy = 0; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = 10; dy = 0; }
});

function draw() {
  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // move snake
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  // collision
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some(p => p.x === head.x && p.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over 😢");
    return;
  }

  snake.unshift(head);

  // eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("snakeScore").innerText = "Score: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  // draw snake
  ctx.fillStyle = "#22c55e";
  snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));

  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}