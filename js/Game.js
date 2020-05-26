class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,displayHeight/2);
    runner1.addImage("runner1",runner1_img);
    runner.scale = 0.050;
    runner2 = createSprite(100,displayHeight-20);
    runner2.addImage("runner2",runner2_img);
    runner2.scale = 0.050;
    cars = [runner1, runner2];
    ground = createSprite(displayWidth/2,displayHeight/2,displayWidth,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
   
    ground1 = createSprite(displayWidth/2,displayHeight-20,displayWidth,20);
    ground1.addImage("ground1",groundImage2);
    ground1.x = ground1.width /2;
  
    gameOver = createSprite(displayWidth/2,displayHeight/2);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(displayWidth/2,displayHeight/2-20);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
  
    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround = createSprite(displayWidth/2,displayHeight/2+10,displayWidth,10);
    invisibleGround.visible = false;
  
    invisibleGround1 = createSprite(displayWidth/2,displayHeight-10,displayWidth,10);
    invisibleGround2.visible = false;
    
  
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getscore();

    player.score = player.score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*player.score/100);

    player.score =  player.score + Math.round(getFrameRate()/60);
    ground1.velocityX = -(6 + 3* player.score/100);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (ground1.x < 0){
      ground1.x = ground1.width/2;
    }
    if(allPlayers !== undefined){
      var index = 0;
      var x = 100 ;
      var y = displayHeight/2 || displayHeight-20;
      for(var plr in allPlayers){
        index = index + 1 ;
       if (index === player.index){
          stroke(10);
          fill("yellow");
          ellipse(x,y,100,100);
        }
      }
    }
    
    runner.collide(invisibleGround);
    runner2.collide(invisibleGround1);
    spawnClouds();
    spawnObstacles();
    spawnClouds1();
    spawnObstacles1();

    if(keyIsDown(UP_ARROW)){
      player.y =   player.y -130
      player.update();
    }
    runner.velocityY = runner.velocityY + 0.8;
    runner2.velocityY = runner2.velocityY + 0.8;
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    runner1.velocityY = 0;
    ground1.velocityX = 0;
    runner2.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
}



function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,displayHeight/2-80,40,10);
    cloud.y = Math.round(random(displayHeight/2-120,displayHeight/2-80));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = runner2.depth;
    runner2.depth = runner2.depth + 1;
    cloud.depth = runner1.depth;
    runner1.depth = runner1.depth + 1;
    
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var hurdle1 = createSprite(displayWidth,displayHeight/2-40,10,40);
    hurdle1.velocityX = -(6 + 3*Player.score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: hurdle1 .addImage(hurdle);
              break;
      case 2: hurdle1.addImage(hurdle);
              break;
      case 3: hurdle1.addImage(hurdle);
              break;
      case 4: hurdle1.addImage(hurdle);
              break;
      case 5: hurdle1.addImage(hurdle);
              break;
      case 6: hurdle1.addImage(hurdle);
              break;
      default: break;
    }
            
    hurdle1.scale = 0.1;
    hurdle1.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(hurdle1);
  }
}

function spawnClouds1() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,displayHeight-80,40,10);
    cloud.y = Math.round(random(displayHeight-120,displayHeight-80));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = runner2.depth;
    runner2.depth = runner2.depth + 1;
    cloud.depth = runner1.depth;
    runner1.depth = runner1.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles1() {
  if(frameCount % 60 === 0) {
    var hurdle1 = createSprite(displayWidth,displayHeight-40,10,40);
    hurdle1.velocityX = -(6 + 3*Player.score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: hurdle1 .addImage(hurdle);
              break;
      case 2: hurdle1.addImage(hurdle);
              break;
      case 3: hurdle1.addImage(hurdle);
              break;
      case 4: hurdle1.addImage(hurdle);
              break;
      case 5: hurdle1.addImage(hurdle);
              break;
      case 6: hurdle1.addImage(hurdle);
              break;
      default: break;
    }
            
    hurdle1.scale = 0.1;
    hurdle1.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(hurdle1);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  player.score = 0;
 
}