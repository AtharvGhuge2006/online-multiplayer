class Player {
  constructor(){
    this.rank=0
    this.index = null;
    this.distance = 0;
    this.name = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
      
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  getFinishedPlayer(){var carsAtEndref = database.ref('carsAtEnd');
   carsAtEndref.on("value",
   (data)=>{ carsAtEnd = data.val();

   });
  }
  updateFinshedPlayer(rank){
    
    database.ref('/').update({ carsAtEnd: rank }); this.rank =rank;
  }
}
