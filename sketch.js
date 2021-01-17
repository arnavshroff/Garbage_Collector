var person,personI;
var garbage,garbageI,garbageG;
var medicine,medicineI;
var city, cityI;
var welcomeI;
var invisibleBlock;
var score;
var health;
var medicine,medicineI,medG;
var gameover,gameoverI;
var hi;
var edge1,edge2;
//var gameState = "beginning";

function preload(){
    garbageI = loadImage("garbage.png")
    cityI = loadImage("staircase.png")
    personI = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png",);
    welcomeI = loadImage("welcome.png")
    medicineI = loadImage("med.png");
    gameoverI = loadImage("game.png");
    hi = loadImage("hi.png");
}

function setup(){
    createCanvas(600, 600);
    //camera.position.x = 0;
    //edge1 = createSprite(312,282,20,600)
    city = createSprite(300,300)
    city.addImage(cityI);
    city.velocityY = 2;
    city.scale= 1.5

    person = createSprite(300,450,40,40);
    person.addAnimation("walking",personI);
    person.scale = 0.5

    invisibleBlock = createSprite(320,550,30,50);
    invisibleBlock.visible = false;
    //rect(300,450,10,10)

    garbageG = new Group();
    medG = new Group();
    score = 0.0;
    health = 15;

    gameover = createSprite(300,300,50,50);
    gameover.addImage(gameoverI);
    gameover.visible = false;
    gameover.scale = 0.2;
}
function draw(){
    background("white");

    

    if(city.y > 310){
        city.y = 300
      }
      if(keyDown("left_arrow")){
        person.x = person.x - 3;
        invisibleBlock.x = invisibleBlock.x-3;
      }
      
      if(keyDown("right_arrow")){
        person.x = person.x + 3;
        invisibleBlock.x = invisibleBlock.x+3;
      }
      spawnGarbage();
      medicines();

      if(invisibleBlock.isTouching(garbageG)){
          garbageG.destroyEach();
          score++
          health--
      }
      if(invisibleBlock.isTouching(medG)){
        //garbageG.destroyEach();
        medG.destroyEach();
        score = score -0.5;
        health++
    }
    if(health<=0){
        background("black")
        city.visible = false;
        person.visible = false;
        medG.destroyEach();
        garbageG.destroyEach();
        gameover.visible = true;
        fill("yellow");
        textSize(26);
        //textStyle("italic")
        textFont("algerian")
        textStyle("italic")
        stroke("red")
        strokeWeight(2);
        text("You Played Really Well !!",120,450);
    }
    


    drawSprites();

    fill("black")
    stroke("black")
    textSize(20)
    text("Your Score = "+score,330,50);
    if(health>0){
    fill("red");
    stroke("red")
    textSize(20);
    text("Health Remaining = "+health,330,80);
    }
}
function spawnGarbage(){
    if(frameCount % 110 === 0){
        garbage = createSprite(200,280,20,20);
        garbage.addImage(garbageI);
        garbage.x = random(200,400);
        garbage.scale = 0.2
        garbage.velocityY = 2;
        garbage.depth = person.depth;
        person.depth = person.depth+1;
        garbageG.add(garbage);
        
    }
    
}
function medicines(){
    if(frameCount % 270 === 0){
        medicine = createSprite(100,280,20,20);
        medicine.addImage(medicineI);
        medicine.velocityY = 2;
        medicine.scale = 0.2
        medicine.x = random(200,400);
        medicine.depth = person.depth;
        person.depth+=1;
        medicine.lifeTime = 200;
        medG.add(medicine);
    }
}