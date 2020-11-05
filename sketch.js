   
   var gameState = "play";
   var score =0;

   function preload(){
    spaceImage= loadImage("images/bgspace.jpg");
    enemyImage= loadImage("images/enemy.png");
    spaceshipImage= loadImage("images/spaceShip.png");
    restartImage=loadImage("images/restart.png");
    shoot=loadSound("shooting.mp3");
   }
   
   function setup(){
     createCanvas(displayWidth,displayHeight)
    space = createSprite(width, height);
    space.addImage(spaceImage);  
    space.scale=5
    space.y = space.height/2;
    
    player = createSprite(width/2, height-100);
    player.addImage(spaceshipImage);
    //player.scale= 0.5;

    restart=createSprite(width/2,height/2);
    restart.addImage(restartImage); 
    //restart.scale=0.5;
    restart.visible=false;

    EnemyGroup = new Group();
    BulletGroup = new Group();
    textSize(25);
    fill("yellow");
   }


   
   function draw() {
  
   background("black");
   
   if(gameState === "play"){
  
    if(keyWentDown("space"))  {
      shoot.play();
      generateBullets();  
   }

     space.velocityY= 5;
     player.x = World.mouseX;
   
     if (space.y > 500) {       
       space.y = space.height/2;
     }
  
     generateEnemy();

     if(player.isTouching(EnemyGroup)){
       gameState ="end";
     }
       
   }
   if(gameState==="end"){
     space.velocityY=0;
    EnemyGroup.setVelocityYEach(0);
    EnemyGroup.setLifetimeEach(-1);
    restart.visible=true;
   }

   for (var i = 0; i < EnemyGroup.length; i++) {
   var temp=EnemyGroup.get(i);
   if(temp.isTouching(BulletGroup)){
     temp.destroy();
     score = score+1;
   }
 }  
 
   for (var i = 0; i < EnemyGroup.length; i++) {
     var temp1=EnemyGroup.get(i);
     if(temp1.y>height){
     temp1.destroy();
     score = score-1;
   }
 }  
 if(mousePressedOver(restart)){
   gameState ="play";
   EnemyGroup.destroyEach();
   restart.visible=false;
   score =0;
 }
   
   drawSprites();
    
     text("Score:  "+score,300,30); 
   }
  
  function generateEnemy() {
   if(World.frameCount%40===0){
     var enemy = createSprite(300,0);
     enemy.addImage(enemyImage);
     enemy.x = random(20,width-20);
     enemy.velocityY = 5;
     enemy.scale = 0.9;
     enemy.lifetime = 300;
     EnemyGroup.add(enemy);
   }
 }
 
 function generateBullets() {
   var bullet = createSprite(300,300,5,10);
   bullet.x = player.x;
   bullet.y = player.y;
   bullet.shapeColor = "red"; 
   bullet.velocityY = -10;
   bullet.depth = player.depth-1;
   bullet.lifetime = 200;  
   BulletGroup.add(bullet);
   
 }  
 
   
