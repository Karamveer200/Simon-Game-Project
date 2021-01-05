
var buttonColors = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var level =0;

$(".btn").click(function(event){
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateButton(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

document.addEventListener("keypress",function(){
  nextSequence();
});

function nextSequence(){
  var randNum = Math.floor(Math.random()*4);
  var randColor = buttonColors[randNum];
  gamePattern.push(randColor);
  $("#level-title").text("Level - "+level);
  level++;

  $("#"+randColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randColor);
}

function playSound(colorPressed){
  var playSound = new Audio("sounds/"+colorPressed+".mp3");
  playSound.play();
}

function animateButton(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
  },200);
}

function checkAnswer(lastIndex){
  if(gamePattern[lastIndex]== userClickedPattern[lastIndex]){
    console.log("Success");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
      },1000);
    }
  }

  else{
    console.log("failed");
    $("body").addClass("game-over");
    var playSound = new Audio("sounds/wrong.mp3");
    playSound.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Failed. Press any key");
    restartGame();
  }
}

function restartGame(){
  userClickedPattern = [];
  gamePattern =[];
  level = 0;
}
