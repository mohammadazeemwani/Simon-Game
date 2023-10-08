gamePattern = [];
userClickedPattern = [];

buttonColours = ["red","blue","green","yellow"];

var started = false;
var level = 0;


$('*').on('keydown',function(){

    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
        started = true
    }

});



$('.btn').on('click',function(){
    // console.log(this.id)
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log('success')

        if(gamePattern.length===userClickedPattern.length){
            
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log('wrong');
        playSound("wrong");

        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);

        $('h1').text('Game Over, Press Any Key to Restart');

        startOver();
        
    }
};

function nextSequence(){

    userClickedPattern = [];

    level++;
    var currentLevel = 'Level '+level;
    $('h1').text(currentLevel)

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

};

function playSound(name){
    var sound = new Audio('./sounds/'+name+'.mp3');
    sound.play();
};

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');

    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed')
    },100)
};

function startOver(){
    level = 0;   
    gamePattern = []
    started = false;
};