var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var Level = 0;

//adding event listener to the buttons.
$(".btn").click(function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//adding an event listener to detect a key press for reset of the game.
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level" + " " + Level);
        nextSequence();
        started = true;

    }
});

//creating a sequence which the player needs to follow.
function nextSequence() {
    userClickedPattern=[];
    Level++;
    $("#level-title").text("Level" + " " + Level);
    randmonNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randmonNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    
}

//function to play sound.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function to animate a button when it is pressed.
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}
//function to start over.
function startOver(){
    started = false;
    gamePattern=[];
    Level = 0;
}

//function to check the answer given by user agains the pattern
function checkAnswer(currentLevel){
    
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
     else {
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game Over,Press any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        startOver();
    }
}