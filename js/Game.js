class Game {
  constructor(){}
  
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
      let playerCountRef = await database.ref('playerCount').once("value")
      if (playerCountRef.exists()){
        playerCount = playerCountRef.val()
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide()
    textSize(30)
    text("Go!", 120, 100)
    Player.getPlayerInfo()

    if (allPlayers !== undefined){
      let disp_Position = 130
      for (let plr in allPlayers){
        if (plr === "player" + player.index){
          fill("green")
        } else{
          fill("red")
        }
        disp_Position += 20
      textSize(15)
      text(allPlayers[plr].name + "Distance: " + allPlayers[plr].distance, 120, disp_Position)
      }
    }
  

  if (keyIsDown(UP_ARROW) && player.index !== null){
    player.distance += 50
    player.update();
  }
}}
