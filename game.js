const player = document.getElementById("player")
const container = document.getElementById("game-container")
const scoreEl = document.getElementById("score")

let x = 185
let score = 0
let obstacles = []
let dead = false

document.addEventListener("keydown", e => {
  if (dead) return
  if (e.key === "ArrowLeft" && x > 0) x -= 20
  if (e.key === "ArrowRight" && x < 370) x += 20
  player.style.left = x + "px"
})

function spawn() {
  if (dead) return
  const o = document.createElement("div")
  o.className = "obstacle"
  o.textContent = "404"
  o.style.left = Math.floor(Math.random() * 7) * 60 + "px"
  o.style.top = "0px"
  container.appendChild(o)
  obstacles.push(o)
}

function update() {
  obstacles.forEach((o, i) => {
    let y = parseInt(o.style.top)
    y += 5
    o.style.top = y + "px"

    let ox = parseInt(o.style.left)
    if (y > 550 && x + 30 > ox && x < ox + 60) {
      dead = true
      alert("Game Over | Score: " + score)
      location.reload()
    }

    if (y > 600) {
      o.remove()
      obstacles.splice(i, 1)
      score++
      scoreEl.textContent = "Score: " + score
    }
  })
}

setInterval(update, 50)
setInterval(spawn, 1400)
