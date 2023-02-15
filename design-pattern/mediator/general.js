
// 中介者模式
// function Player(name){
//   this.name = name;
//   this.enemy = null;
// };

// Player.prototype.win = function(){
//   console.log(`${this.name} won`);
// };

// Player.prototype.lose = function(){
//   console.log(`${this.name} lost`);
// };

// Player.prototype.die = function(){
//   this.lose();
//   this.enemy.win();
// };


// const player1 = new Player('小明');
// const player2 = new Player('小红');

// player1.enemy = player2;
// player2.enemy = player1;

// player1.die();

const players = [];

function Player(name, teamColor) {
  this.partners = [];
  this.enemies = [];
  this.state = 'live';
  this.name = name;
  this.teamColor = teamColor;
};

Player.prototype.win = function () {
  console.log(`winner: ${this.name}`);
};

Player.prototype.lose = function () {
  console.log(`loser: ${this.name}`);
};

Player.prototype.die = function () {
  let all_dead = true;
  this.state = 'dead';

  for (let i = 0, partner; partner = this.partners[i++];) {
    if (partner.state !== 'dead') {
      all_dead = false;
      break;
    }
  }
  if (all_dead === true) {
    this.lose();
    for (let i = 0, partner; partner = this.partners[i++];) {
      partner.lose();
    }
    for (let i = 0, enemy; enemy = this.enemies[i++];) {
      enemy.win();
    }
  }
};

const playerFactory = function (name, teamColor) {
  const newPlayer = new Player(name, teamColor);

  for (let i = 0, palyer; player = players[i++];) {
    if (player.teamColor === newPlayer.teamColor) {
      player.partners.push(newPlayer);
      newPlayer.partners.push(player);
    } else {
      player.enemies.push(newPlayer);
      newPlayer.enemies.push(player);
    }
  }
  players.push(newPlayer);
  return newPlayer;
};

const player1 = playerFactory('小一', 'red'),
  player2 = playerFactory('小二', 'red'),
  player3 = playerFactory('小三', 'red'),
  player4 = playerFactory('小四', 'red');

const player5 = playerFactory('小五', 'blue'),
  player6 = playerFactory('小六', 'blue'),
  player7 = playerFactory('小七', 'blue'),
  player8 = playerFactory('小八', 'blue');


player1.die();
player2.die();
player4.die();
player3.die();
