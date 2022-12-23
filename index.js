var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
var started=false;



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    
    var randomNumber;
    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   
   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
}


function playSound(name){
    var audio=new Audio(name+".mp3")
   audio.play();
}


$("button").click(function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
})


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}


$(document).keypress(function(){
    if(!started){
        $('h1').text("Level "+level);
        
        started=true;
        nextSequence();
    }
    
});


function checkAnswer(currentLevel){
            if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){

            if(userClickedPattern.length==gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
        
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Gmae over,Press Any Key To Start");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200)
        
       
        startOver();
    }
}

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
   
    checkAnswer(userClickedPattern.length-1);
  });

  function startOver(){
    level=0;
    gamePattern=[];
    started=false;

  }