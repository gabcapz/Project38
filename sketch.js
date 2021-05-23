var balloon,balloonImg1,balloonImg2, balloonPosition, database, position, eagle, eagleImage, fireball, fireballImage;
// create database and position variable here
var shield, shieldImage, coin, coinImage, heart, hearImage, heart1, heart2;
var lives = 3;
var score = 0;

function preload(){
   bg = loadImage("cityImage.png");
   eagleImage = loadImage("Eagle.png");
   shieldImage = loadImage("shield.png");
   fireballImage = loadImage("fireball.png");
   coinImage = loadImage("coin.png")
   heartImage = loadImage("heart.png");
   balloonImg1 = loadImage("hotairballoon1.png");
   balloonImg2 = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1300, 600);

  balloon = createSprite(250, 400, 150, 150);
  balloon.addAnimation("hotAirBalloon",balloonImg1);
  balloon.scale = 0.45;

  heart = createSprite(150, 100, 50,50);
  heart.addImage("heart", heartImage);
  heart.scale = 0.25;

  heart1 = createSprite(200, 100, 50,50);
  heart1.addImage("heart", heartImage);
  heart1.scale = 0.25;

  heart2 = createSprite(250, 100, 50,50);
  heart2.addImage("heart", heartImage);
  heart2.scale = 0.25;

  obstaclesGroup = new Group();
  coinsGroup = new Group();

  var ballonPosition = database.ref('Balloon/Position');
  ballonPosition.on("value", readPosition, showError);


  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
    balloon.addAnimation("hotAirBalloon",balloonImg2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
    balloon.addAnimation("hotairballoon", balloonImg1); 
    // balloon.scale = balloon.scale-0.01;    
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y + 10;
    balloon.addAnimation("hotairballoon", balloonImg1);     
    // balloon.scale = balloon.scale+0.01; 
    //write code to move air balloon in down direction
  }

  if (balloon.isTouching(obstaclesGroup)){
    lives = lives - 1;
    obstaclesGroup.destroyEach();
  }

  if (lives === 2){
    heart2.visible = false;
  }

  if (lives === 1){
    heart1.visible = false;
  }

  if (lives === 0){
    heart.visible = false;
  }

  if (balloon.isTouching(coinsGroup)){
    score = score + 1;
    coinsGroup.destroyEach();
  }

  // if (balloon.isTouching())

// spawnEagle();
// spawnFireball();
// spawnShield();
spawnObstacles();
spawnCoin();

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  }
  
  function writePosition(x, y){
  database.ref('Balloon/Position').set({
    'x': balloon.x + x,
    'y': balloon.y + y,
  })
  }
  
  function showError(){
    console.log("error");
  }

  // function spawnEagle(){

  //   if(frameCount % 200 === 0){
  //   eagle = createSprite(1300, 200, 50, 50);
  //   eagle.y = Math.round(random(50, 550));
  //   eagle.velocityX = -5;
  //   eagle.addImage("flying", eagleImage);
  //   eagle.scale = 0.15;
  //   eagle.lifetime = 500;
  //   }

  // }

  // function spawnFireball(){

  //   if(frameCount === 2000 && frameCount % 250 === 0){
  //     fireball = createSprite(1250, 200, 50, 50);
  //     fireball.y = Math.round(random(50, 550));
  //     fireball.velocityX = -5;
  //     fireball.addImage("fireball", fireballImage);
  //     fireball.scale = 0.2;
  //     fireball.lifetime = 500;
  //   }

  // }

  // function spawnShield(){

  //   if(frameCount === 500 && frameCount % 250 === 0){
  //     shield = createSprite(1250, 200, 50, 50);
  //     shield.y = Math.round(random(50, 550));
  //     shield.velocityX = -5;
  //     shield.addImage("shield", shieldImage);
  //     shield.scale = 0.15;
  //     shield.lifetime = 500;
  //     shieldsGroup.add(shield);
  //   }

  // }

  function spawnCoin(){

    if(frameCount % 100 === 0){
      coin = createSprite(1250, 200, 50, 50);
      coin.y = Math.round(random(50, 500));
      coin.velocityX = -5;
      coin.addImage("coin", coinImage);
      coin.scale = 0.025;
      coin.lifetime = 500;
      coinsGroup.add(coin);
    }

  }

  function spawnObstacles(){
  
    if (frameCount % 120 === 0){
      obstacle = createSprite(1250, 120);
      obstacle.y = Math.round(random(50, 500));
      obstacle.velocityX = -5;
      // obstacle.y = Math.round(random(50, 550));
      
      var rand = Math.round(random(1,2));
      
      switch(rand){
          case 1: obstacle.addImage(eagleImage);
          break;
          case 2: obstacle.addImage(fireballImage);
          break;   
          default: break;
      }
      
      obstacle.scale = 0.15;
      obstacle.lifetime = 500;
      
      obstaclesGroup.add(obstacle);
    }
    
  }