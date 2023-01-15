var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var userClickPattern = [];
var started = false;

$(document).keydown(function() {
    if(!started) {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        StartOver();
    }

    
}

function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    var randNum = Math.floor(Math.random() * 4);
    var randCurColor = buttonColors[randNum];
    gamePattern.push(randCurColor);

    $("#" + randCurColor).fadeOut(100).fadeIn(100);
    playSound(randCurColor);
}

function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(curColor) {
    $("#" + curColor).addClass("pressed");
    setTimeout(function() {
        $("#" + curColor).removeClass("pressed");
    }, 100);
}

function StartOver() {
    started = false;
    gamePattern = [];
    level = 0;
}