class Player {
  constructor(){
    this.index = null;
    this.name = null;
    this.score = 0;
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

  getscore(){
    var playerscore = database.ref('score');
    playerscore.on("value",(data)=>{
      this.score = data.val();
    })
  }

  static updatescore( score ){
    database.ref('/').update(
      {
        'score': score
      }
    )
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      score:this.score

    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
