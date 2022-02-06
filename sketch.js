var PLAY=1, END=0;
var gameState = PLAY;

var obstaclesGroup, cloudsGroup;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacles, obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4, obstacleImg5, obstacleImg6;
var score = 0

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    cloudImage = loadImage("cloud.png");
    groundImage = loadImage("ground2.png");
    obstacleImg1 = loadImage("obstacle1.png");
    obstacleImg2 = loadImage("obstacle2.png");
    obstacleImg3 = loadImage("obstacle3.png");
    obstacleImg4 = loadImage("obstacle4.png");
    obstacleImg5 = loadImage("obstacle5.png");
    obstacleImg6 = loadImage("obstacle6.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    //var message = "hi"
    

    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.setCollider("circle",0,0,40);
    trex.debug = true;
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;

    //create a ground sprite
    ground = createSprite(windowWidth/2,windowHeight-80,windowWidth,2);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    invisibleGround = createSprite(windowWidth/2,windowHeight-20,windowWidth,125);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();
    cloudsGroup = new Group();

    var r = Math.round(random(10,60));
    //console.log(r);
//console.log(4+6+"hello"+5+9)
}

function draw() {
background(180); 
//console.log()
//console.log(message);

if(gameState==PLAY){
    //jump when the space button is pressed
    if (keyDown("space")|| touches.length>0 && trex.y >= 100) {
        trex.velocityY = -10;
        touches = []
    }
    trex.velocityY = trex.velocityY + 0.8
    //console.log(trex.y);

    
    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }

   
    spawnclouds();
    spawnobstacles();
    if(obstaclesGroup.isTouching(trex)){
gameState = END;
    }
}
else if(gameState==END){
ground.velocityX=0;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation("collided", trex_collided);
obstaclesGroup.setLifetimeEach(-100);
cloudsGroup.setLifetimeEach(-200);
}
    //fill(ball.colour)
    //circle(ball.x,ball.y,ball.radius)




    trex.collide(invisibleGround);
    drawSprites();
}
function spawnclouds() {
    if(frameCount%60 == 0){
        cloud = createSprite(600,100,40,10);
cloud.velocityX = -3;
cloud.y = Math.round(random(20,60))
cloud.addImage(cloudImage)
cloud.scale = 0.1
cloud.lifetime = 200
trex.depth = cloud.depth
trex.depth = trex.depth +1
cloudsGroup.add(cloud);
    }

}
function spawnobstacles() {
if(frameCount%61 == 0){
    obstacle = createSprite(windowWidth,windowHeight-100,10,40);
    obstacle.velocityX = -6;
    obstacle.lifetime = windowWidth/6;
    var r = Math.round(random(1,6));
    switch(r){
        case 1:
            obstacle.addImage(obstacleImg1);
            break;
            case 2:
            obstacle.addImage(obstacleImg2);
            break;
            case 3:
            obstacle.addImage(obstacleImg3);
            break;
            case 4:
            obstacle.addImage(obstacleImg4);
            break;
            case 5:
            obstacle.addImage(obstacleImg5);
            break;
            case 6:
            obstacle.addImage(obstacleImg6);
            break;
            default: 
            obstacle.addImage(obstacleImg2);
    }
obstacle.scale = 0.075
obstaclesGroup.add(obstacle);
}
}