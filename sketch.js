//Create variables here
var dog,happydog;
var database;
var foods,foodstock;
var fedtime,lastfed;
var foodobj;

function preload()
{
  //load images here
  img = loadImage("Dog.png");
  img2 = loadImage("happydog.png");
  
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250,30,40);
  dog.addImage(img);
  dog.scale = 0.15;

  foodobj = new Foods();

  foodstock = database.ref('Food');
  foodstock.on("value",readstock);

  feed = createButton("Feed The Dog");
  feed.position(550,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650,95);
  addFood.mousePressed(addFoods);

  
}


function draw() {  
  background(46,139,87);

  foodobj.display();

  //add styles here
 

        fill("white");
        textSize(20);
        text("Press UP arrow key to feed Tommy the dog",30,80);
        text("Food left: " + foods ,250,100);

        fill(255,255,254);
        textSize(15);
        if(lastfed>=12){
            text("last Fed: " + lastfed%12 + "PM",50,30);
        }else if(lastfed===0){
            text("last Fed: 12 AM",350,30);
        }else{
            text("last Fed: " + lastfed  + "AM",350,30);
        }


  fedtime = database.ref('FeedTime');
  fedtime.on("value",function(data){
    lastfed = data.val();
  })

  drawSprites();
}

function readstock(data){
  foods = data.val();
  foodobj.updateFoodStock(foods);
}

function feedDog(){
  dog.addImage(img2);

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}




