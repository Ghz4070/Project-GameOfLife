/* Projet - Le code du stagiaire 
~ Lisez le README.md pour plus d'informations ~
*/

import gameServer from './gameServer'

let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")
ctx.fillStyle = "#71b8ef";
let xCanvas = 350
let yCanvas = 250
canvas.height = window.innerHeight - 150
canvas.width = window.innerWidth

let i = 1;
while (i <= 4) {
    let button = document.querySelector("#btnSeed_" + i);
    button.addEventListener("click", function () {
        var chiffre = i.toString();
        gameServer.loadSeed('https://lp1.eu/courses/Programming/JS/GameOfLife/seeds/seed' + chiffre + '.seed')
            .then((seed) => {
                gameServer.init(seed)
            })
    })
    i++
}
const seedURL = 'https://lp1.eu/courses/Programming/JS/GameOfLife/seeds/seed1.seed'
const updateTime = 100

gameServer.onMessage = (message) => {
    /*
       Je comprends pas trop ce que je reçois ici quand
       le serveur m'envoie des infos ?!
       Ça ressemble à un objet JS mais je peux rien
       faire avec... NUL
   */
    const messageData = message.data
    // console.log(message.data)
    const resultMessage = JSON.parse(messageData)
    // console.log('LA DATA', resultMessage)
    for (let height = 0; height < resultMessage.height; height++) {
        for (let width = 0; width < resultMessage.width; width++) {
            let cellule = resultMessage.cells[height][width]
            if (cellule.alive === true) {
                ctx.rect(cellule.x * 10 + xCanvas, cellule.y * 10 + yCanvas, 5, 5)
                ctx.fill()
            }
        }
    }
}

gameServer.loadSeed(seedURL)
    .then((seed) => {
        // Je reçois bien une seed ici !
        gameServer.init(seed) // On m'a dit d'utiliser ça mais ça retourne RIEN
    })
    .catch((error) => {
        console.error(error)
    })

const interval = setInterval(() => {
    gameServer.next()
}, updateTime)

