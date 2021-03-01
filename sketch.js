var database;
var dog;
var dogimg;
var fetchStock;
var foodS;
var happyDog;
var foodObj;
var fedTime,lastFed;

this.button;
this.add;

function preload()
{
dogimg=loadImage("images/dogImg1.png")
happyDog=loadImage("images/dogImg.png")

}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  
  dog=createSprite(250,250,50,50)
  dog.addImage(dogimg);
  dog.scale=0.5;

  this.button=createButton('feed Dog');
this.add=createButton('add Feed');

foodObj=new Food(400,400,50,50);
  foodStock=database.ref('food')
  foodStock.on("value",readStock)
}


function draw() {  
background(46,139,87);

foodObj.display();
this.button.position(550, 70);
  this.add.position(650,70 );

text("food remaiming -"+ foodS,150,50);

fedTime=database.ref('feedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})


  drawSprites();
 

}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
database.ref('/').update({
  food:x
})
}

function addFoods(){
foodS++;
database.ref('/').update({
  food:foodS
})
}
function feedDog(){
  dog.addImage(happyDog);
if(foodObj.getFoodStock()<=0){
  foodObj.updateFoodStock(food.getFoodStock()*0);
}
  else{
    foodObj.updateFoodStock(food.getFoodStock()-1);
  }

  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

