const buttons = {
    paper : document.getElementById('paper'),
    rock : document.getElementById('rock'),
    scissors : document.getElementById('scissors')
}
const displays = {
    round : document.getElementById('round'),
    score : document.getElementById('score')
}
const game = {
    round : 0,
    score : 0,
    player : {
        hand : document.getElementById('player-hand'),
        roundsWon : 0
    },
    opponent : {
        hand : document.getElementById('opponent-hand'),
        roundsWon : 0
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function shuffleHands(){
    const rotationDegrees = '-20';
    const defaultDegrees = '0';
    const opponentScale = 'scaleX(-1)';
    var shuffleCount = 3;
    const shuffleDelay = 300;
    shuffleMovement();
    async function shuffleMovement(){
        if(shuffleCount > 0){
            game.player.hand.style.transform = `rotate(${rotationDegrees}deg)`;
            game.opponent.hand.style.transform = `${opponentScale} rotate(${rotationDegrees}deg)`;
            await delay(shuffleDelay);
            game.player.hand.style.transform = `rotate(${defaultDegrees}deg)`;
            game.opponent.hand.style.transform = `${opponentScale} rotate(${defaultDegrees}deg)`;
            await delay(shuffleDelay);
            shuffleCount--;
            console.log(shuffleCount);
            shuffleMovement();
        }
    }
}

async function testing(ms){
    await delay(ms);
    console.log('testing');
    testing(ms);
}