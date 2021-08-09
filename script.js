const maze               = document.getElementById("maze")
const header             = document.getElementById("header")
const heather            = document.createElement("img")
const win                = document.createElement("img")
const bread              = document.createElement("img")
const playAgain          = document.createElement("button")
const winner             = document.createElement("section")
const youWin             = document.createElement("h1")

heather.src            = "./imagens/heather.png"
win.src                = "./imagens/win.jpeg"
youWin.innerText       = "It's Bread."
bread.src              = "./imagens/bread.png"
playAgain.innerText    = "Play Again"

document.body.appendChild(winner)

winner.setAttribute("id", "winSec")
winner.appendChild(youWin)
winner.appendChild(win)
winner.appendChild(playAgain)

win.classList.add("hidden")
playAgain.classList.add("hidden")
youWin.classList.add("hidden")

let i = [9]
let j = [0]

let playerTop = 360
let playerLeft = 0

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

const criaCaminho = route =>{
	let wall = "W"
    let way = " "
	let start = "S"
	let finish = "F"
	for(let i = 0; i < route.length; i++){
        let block = route[i]
		const line = document.createElement("div")
        line.classList.add("line")
        maze.appendChild(line)
		
        for(let j = 0; j < block.length; j++){
            let cell = block[j]

            const current = document.createElement("div")
            line.appendChild(current)


            if(cell == wall){
                current.classList.add("wall")
            }
            if(cell === way){
                current.classList.add("way")
            }
            if(cell === start){
                const player = document.createElement("div")

                player.setAttribute("id", "start")
                player.appendChild(heather)

                heather.classList.add("heather")

                current.appendChild(player)
                current.classList.add("way")
            }
            if(cell === finish){
                current.setAttribute("id","finish")
                bread.classList.add("heather")
                current.appendChild(bread)
            }
        }
	}
}

criaCaminho(map)

const sum = x =>{
    let result = []
    for(let i = 0; i < x.length ; i++){
        let num = x[i]
        result.push(num + 1)
    }
    return result
}

const sub = x =>{
    let result = []
    for(let i = 0; i < x.length ; i++){
        let num = x[i]
        result.push(num - 1)
    }
    return result
}

const move = x =>{

    if(x === "ArrowUp"){
        if(map[sub(i)][j] === " "){
            playerTop -= 40
            i = sub(i)
        }
    }
    if(x === "ArrowDown"){
        if(map[sum(i)][j] === " "){
            playerTop += 40
            i = sum(i)
        }
    }
    if(x === "ArrowLeft"){
        if(map[i][sub(j)] === " " || map[i][sub(j)] === "S"){
            playerLeft -= 40
            j = sub(j)
        }
    }
    if(x === "ArrowRight"){
        if(map[i][sum(j)] === " " || map[i][sum(j)] === "F"){
            playerLeft += 40
            j = sum(j)
        }
    }
    if(map[i][j] === map[8][20]){
        header.classList.add("hidden")
        maze.classList.add("hidden")

        win.classList.remove("hidden")
        playAgain.classList.remove("hidden")
        youWin.classList.remove("hidden")
        document.body.classList.add("dark")
    }
}

document.addEventListener("keydown", (e) =>{
    const key = e.key

    move(key)

    document.getElementById("start").style.top = playerTop + "px";
    document.getElementById("start").style.left = playerLeft + "px";
})

playAgain.addEventListener("click", (e) => {
    location.reload()
})