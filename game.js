const buttons = {
    paper : document.getElementById('paper'),
    rock : document.getElementById('rock'),
    scissors : document.getElementById('scissors')
}
const displays = {
    round : document.getElementById('round'),
    score : document.getElementById('score')
}
const assets = {
    player : {
        paper : 'assets/paper.png',
        rock : 'assets/rock.png',
        scissors : 'assets/scissors.png'
    },
    opponent : {
        paper : 'assets/paper2.png',
        rock : 'assets/rock2.png',
        scissors : 'assets/scissors2.png'
    }

}
const game = {
    round : 0,
    score : 0,
    hands : ['rock', 'paper', 'scissors'],
    counters : ['paper', 'scissors', 'rock'],
    defaultHand : "rock",
}
game.player = {
    currentHand : game.defaultHand,
    nextHand : game.defaultHand,
    handElement : document.getElementById('player-hand'),
    roundsWon : 0
};
game.opponent = {
    currentHand : game.defaultHand,
    nextHand : game.defaultHand,
    handElement : document.getElementById('opponent-hand'),
    roundsWon : 0
};
async function startRound(){
    game.round++;
    displays.round.innerHTML = game.round;
    await shuffleHands();
    checkHands();
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function shuffleHands(){
    const rotationDegrees = -20;
    const defaultDegrees = 0;
    var shuffleCount = 3;
    const shuffleDelay = 300;
    setHandTo('player', game.defaultHand);
    setHandTo('opponent', game.defaultHand);
    shuffleMovement();
    async function shuffleMovement(){
        if(shuffleCount > 0){
            game.player.handElement.style.transform = `rotate(${rotationDegrees}deg)`;
            game.opponent.handElement.style.transform = `rotate(${rotationDegrees*-1}deg)`;
            await delay(shuffleDelay);
            game.player.handElement.style.transform = `rotate(${defaultDegrees}deg)`;
            game.opponent.handElement.style.transform = `rotate(${defaultDegrees*-1}deg)`;
            await delay(shuffleDelay);
            shuffleCount--;
            console.log(shuffleCount);
            shuffleMovement();
        }else{
            generateOpponentHand();
        }
    }
}
function checkHands(){
    const playerHandIndex = findHandIndexOf(game.player.currentHand);
    const opponentHandIndex = findHandIndexOf(game.opponent.currentHand);
    const playerCounterIndex = findCounterIndexOf(game.player.currentHand);
    const opponentCounterIndex = findCounterIndexOf(game.opponent.currentHand);
    if(playerHandIndex == opponentCounterIndex){
        console.log('opponent wins');
    }
    if(opponentHandIndex == playerCounterIndex){
        console.log('player wins');
    }
}
function findHandIndexOf(value){
    return game.hands.indexOf(value);
}
function findCounterIndexOf(value){
    return game.counters.indexOf(value);
}
function generateOpponentHand(){
    game.opponent.nextHand = game.hands[Math.floor(Math.random() * game.hands.length)];
}
function setHandTo(entity, hand){
    game[entity].handElement.src = assets[entity][hand];
    game[entity].currentHand = hand;
}
window.onload = function(){
    setHandTo('player', game.defaultHand);
    setHandTo('opponent', game.defaultHand);
    buttons.paper.onclick = function(){
        setHandTo('player', 'paper');
    }
    buttons.rock.onclick = function(){
        setHandTo('player', 'rock');
    }
    buttons.scissors.onclick = function(){
        setHandTo('player', 'scissors');
    }
}
function testing(){
    console.log(game.hands);
}