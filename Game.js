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
end(){
  console.log("Game is ended")
  
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

    car1 = createSprite(300,200);
    car1.addImage(car1img)
    car2 = createSprite(500,200);
    car2.addImage(car2img)
    car3 = createSprite(700,200);   
    car3.addImage(car3img)
    car4 = createSprite(900,200);
    car4.addImage(car4img)
    cars = [car1, car2, car3, car4];
    finished=false
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayer();


    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;
          image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //x and y position of the cars
      var x = 330;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        console.log(x)
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        console.log(cars)

        if (index === player.index){
          fill("green")
          ellipse(x,y,150,150)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        textSize(25)
        stroke("red")
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
if(player.distance>5200 ){
  carsAtEnd+=1
  if (carsAtEnd===4){
    gameState=2
  }
  finished=true
  player.rank=carsAtEnd
  player.updateFinshedPlayer(player.rank)
  player.update()
console.log(player.distance)
}
    drawSprites();
    imageMode(CENTER)
          image(groundimg,displayWidth/2,displayHeight-100,displayWidth,200)
  }
  rankDisplay(){
    camera.position.x=0
    camera.position.y=0
    Player.getPlayerInfo()
    imageMode(CENTER)
    image(first,0,-100)
    image(second,displayWidth/4,displayHeight/2+100)
    image(third,-displayWidth/4,displayHeight/2+100)
    for(var plr in allPlayers)
    { if(allPlayers[plr].rank === 1){ text("1st : "+allPlayers[plr].name,0,85); }
    else if(allPlayers[plr].rank === 2){ text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
    }else if(allPlayers[plr].rank === 3){ text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76); }
  }
  }
}
