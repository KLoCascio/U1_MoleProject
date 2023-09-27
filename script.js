// console.log("Hello World!")

let activeMoleTile // Hero.gif
let badMoleTile // Cactuar.gif
let secretOneTile // Secret1.gif
let secretTwoTile // Secret2.gif
let secretThreeTile // Secret3.gif

let score = 0
let gameOver = false
let secrets = 0

// global secret values
let secret1
let secret2
let secret3

// secrets booleans
let oneCollected = false
let twoCollected = false
let threeCollected = false

// setting interval IDs
let placeMoleInterval
let placeBadMoleInterval
let placeSecret1Interval
let placeSecret2Interval
let placeSecret3Interval

window.onload = function() {
    startGame()
}

function startGame() {
    for (let i=0; i<12; i++) {
        let tile = document.createElement("div")
        tile.id = i.toString()
        tile.addEventListener("click", pickTile)
        document.querySelector("#board").appendChild(tile)
    }

    placeMoleInterval = setInterval(placeMole, 4000)
    placeBadMoleInterval = setInterval(placeBadMole, 4000)
    placeSecret1Interval = setInterval(placeSecret1Tile, 4000)
    placeSecret2Interval = setInterval(placeSecret2Tile, 4000)
    placeSecret3Interval = setInterval(placeSecret3Tile, 4000)
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 12)
    return num.toString()
}

// Placing the Moles and Secrets
function placeMole() {
    if (gameOver) {
        return
    }
    if (activeMoleTile) {
        activeMoleTile.innerHTML = ""
    }
    let mole = document.createElement("img")
    mole.src= "./assets/Hero.gif"
    
    let num = getRandomTile()
    if (badMoleTile && badMoleTile.id == num
        || secretOneTile && secretOneTile.id == num
        || secretTwoTile && secretTwoTile.id == num
        || secretThreeTile && secretThreeTile.id == num) {
        return
    }
    activeMoleTile = document.getElementById(num)
    activeMoleTile.appendChild(mole)
}

function placeSecret1Tile() {
    if (gameOver || oneCollected == true) {
        return
    }
    if (secretOneTile) {
        secretOneTile.innerHTML = ""
    }
    secret1 = document.createElement("img")
    secret1.src = "./assets/Secret1.gif"

    let num = getRandomTile()
    if (activeMoleTile && activeMoleTile.id == num
        || badMoleTile && badMoleTile.id == num
        || secretTwoTile && secretTwoTile.id == num
        || secretThreeTile && secretThreeTile.id == num) {
        return
    }
    secretOneTile = document.getElementById(num)
    secretOneTile.appendChild(secret1)
}

function placeSecret2Tile() {
    if (gameOver || twoCollected == true) {
        return
    }
    if (secretTwoTile) {
        secretTwoTile.innerHTML = ""
    }
    secret2 = document.createElement("img")
    secret2.src = "./assets/Secret2.gif"

    let num = getRandomTile()
    if (activeMoleTile && activeMoleTile.id == num
        || badMoleTile && badMoleTile.id == num
        || secretOneTile && secretOneTile.id == num
        || secretThreeTile && secretThreeTile.id == num) {
        return
    }
    secretTwoTile = document.getElementById(num)
    secretTwoTile.appendChild(secret2)
}

function placeSecret3Tile() {
    if (gameOver || threeCollected == true) {
        return
    }
    if (secretThreeTile) {
        secretThreeTile.innerHTML = ""
    }
    secret3 = document.createElement("img")
    secret3.src = "./assets/Secret3.gif"

    let num = getRandomTile()
    if (activeMoleTile && activeMoleTile.id == num
        || badMoleTile && badMoleTile.id == num
        || secretOneTile && secretOneTile.id == num
        || secretTwoTile && secretTwoTile.id == num) {
        return
    }
    secretThreeTile = document.getElementById(num)
    secretThreeTile.appendChild(secret3)
}

function placeBadMole() {
    if (gameOver) {
        return
    }
    if (badMoleTile) {
        badMoleTile.innerHTML = ""
    }
    let badMole = document.createElement("img")
    badMole.src = "./assets/Cactuar.gif"
    let num = getRandomTile()
    if (activeMoleTile && activeMoleTile.id == num
        || secretOneTile && secretOneTile.id == num
        || secretTwoTile && secretTwoTile.id == num
        || secretThreeTile && secretThreeTile.id == num) {
        return
    }
    badMoleTile = document.getElementById(num)
    badMoleTile.appendChild(badMole)
}

// Click Good += 10 points, Bad -=10 points
function pickTile() {
    if (gameOver) {
        return
    }
    if (this == activeMoleTile && !activeMoleTile.clicked) {
        score += 10
        activeMoleTile.clicked = true
        document.querySelector("#score").innerText = score.toString()
        const clickSound = document.querySelector("#clickSound")
        clickSound.play()
        // Secret One Clicked -- change sound add boolean for oneCollected
    } else if (this == secretOneTile && !secretOneTile.clicked) {
        secrets += 1
        secretOneTile.clicked = true
        document.querySelector("#secrets").innerText = secrets.toString()
        const clickSound = document.querySelector("#clickSound")
        clickSound.play()
        oneCollected = true
        let secret1Collected = document.getElementById("display1")
        secret1Collected.classList.add("collected")
        clearSecretTiles()
    }  else if (this == secretTwoTile && !secretTwoTile.clicked) {
        secrets += 1
        secretTwoTile.clicked = true
        document.querySelector("#secrets").innerText = secrets.toString()
        const secret2Sound = document.querySelector("#secret2")
        secret2Sound.play()
        twoCollected = true
        let secret2Collected = document.getElementById("display2")
        secret2Collected.classList.add("collected")
        clearSecretTiles()
    }  else if (this == secretThreeTile && !secretThreeTile.clicked) {
        secrets += 1
        secretThreeTile.clicked = true
        document.querySelector("#secrets").innerText = secrets.toString()
        const clickSound = document.querySelector("#clickSound")
        clickSound.play()
        threeCollected = true
        let secret3Collected = document.getElementById("display3")
        secret3Collected.classList.add("collected")
        clearSecretTiles()
    } else if (this == badMoleTile && !badMoleTile.clicked) {
        score -= 10
        badMoleTile.clicked = true
        document.querySelector("#score").innerText = score.toString()
        const clickSound = document.querySelector("#clickSound")
        clickSound.play() 
        if (score < 0){
            document.querySelector("#score").innerText = "Game Over"
            gameOver = true
            console.log(gameOver)

        }
    }
}

function clearSecretTiles() {
    if (oneCollected && secretOneTile.contains(secret1)) {
        clearInterval(placeSecret1Interval)
        secretOneTile.removeChild(secret1)
    } else if (twoCollected && secretTwoTile.contains(secret2)) {
        clearInterval(placeSecret2Interval)
        secretTwoTile.removeChild(secret2)
    } else if (threeCollected && secretThreeTile.contains(secret3)) {
        clearInterval(placeSecret3Interval)
        secretThreeTile.removeChild(secret3)
    }
}

// not specific enough, causes error to pull an invalid child.
// function clearSecretTiles() {
//     if (oneCollected) {
//         clearInterval(placeSecret1Interval)
//         secretOneTile.removeChild(secret1)
//     } else if (twoCollected) {
//         clearInterval(placeSecret2Interval)
//         secretTwoTile.removeChild(secret2)
//     } else if (threeCollected) {
//         clearInterval(placeSecret3Interval)
//         secretThreeTile.removeChild(secret3)
//     }
// }

console.log(oneCollected)
