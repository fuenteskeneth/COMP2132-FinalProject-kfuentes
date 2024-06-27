('use strict');

var round;
var score1;
var score2;
var roundScore1;
var roundScore2;
var dices1;
var dices2;

function repaint() {
    $("#round").text(round);
    $("#scoreP1").text(score1);
    $("#scoreP2").text(score2);
    $("#roundScore1").text((roundScore1===undefined) ? '' : `= ${roundScore1}`);
    $("#roundScore2").text((roundScore1===undefined) ? '' : `= ${roundScore2}`);
    $(".player1 > .dices > img:eq(0)").attr("src", imagePlayer1Dice1);
    $(".player1 > .dices > img:eq(1)").attr("src", imagePlayer1Dice2);
    $(".player2 > .dices > img:eq(0)").attr("src", imagePlayer2Dice1);
    $(".player2 > .dices > img:eq(1)").attr("src", imagePlayer2Dice2);
}

function reset(){
    round = 0;
    score1 = 0;
    score2 = 0;
    roundScore1 = undefined;
    roundScore2 = undefined;
    imagePlayer1Dice1 = 'images/perspective-dice-six-faces-one.svg';
    imagePlayer1Dice2 = 'images/perspective-dice-six-faces-six.svg';
    imagePlayer2Dice1 = 'images/perspective-dice-six-faces-four.svg';
    imagePlayer2Dice2 = 'images/perspective-dice-six-faces-three.svg';
    gameover = false;
    $("#rollBtn").removeAttr("disabled");
    $(".winner").text('');
    repaint();
}

$(document).ready(() => {
    reset();
    repaint();
});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function rollDices() {
    return [randomIntFromInterval(1, 6), randomIntFromInterval(1, 6)]; 
}

function computeScore(dices) {
    //If any of the players two dice comes up as a 1 then the score for that round for the 
    //player is 0. eg: if the player rolls a 6 and 1, they get a score of 0
    if (dices.includes(1)) return 0;

    //If the player rolls a pair of the same numbers then the players score is the total 
    //of the two dice times 2. eg: if he player rolls 5 and 5, they get a score of (5+5)*2=20
    if (dices[0]==dices[1]) return dices[0]*4;

    //If the player rolls any other combination of dice other than the ones mentioned above then the 
    //players score is the total value of the two dice, eg: player rolls a 3 and 2, 
    //player gets a score of 3+2=5
    return dices[0]+dices[1];
}

function playRound() {
    dices1 = rollDices();
    dices2 = rollDices();

    setDicesImages();

    roundScore1 = computeScore(dices1);
    roundScore2 = computeScore(dices2);

    score1 += roundScore1;
    score2 += roundScore2;

    round++;

    if (round==3) {
        gameover = true;
        $("#rollBtn").attr("disabled", true);
        if (score1>score2) {
            $(".winner").text('You Win!!');
        }
        else if (score2>score1) {
            $(".winner").text('You Loose!!');
        }
        else {
            $(".winner").text('Draw!!');
        }
    }

    repaint();
}

function setDicesImages() {
    imagePlayer1Dice1 = `images/dice-six-faces-${dices1[0]}.svg`;
    imagePlayer1Dice2 = `images/dice-six-faces-${dices1[1]}.svg`;
    imagePlayer2Dice1 = `images/dice-six-faces-${dices2[0]}.svg`;
    imagePlayer2Dice2 = `images/dice-six-faces-${dices2[1]}.svg`;
}
