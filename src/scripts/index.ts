const gameSettings = {
  background: 'white',
  canvasRef: (<HTMLCanvasElement>document.getElementById('gameBoard')),
  heigth: 300,
  width: 1200
}

const character1 = {
  color: 'peru',
  x: 80,
  y: 60,
  width: 25,
  heigth: 25,
  speed: {
    x: 2,
    y: 2
  }
}

const character2 = {
  color: 'purple',
  x: 20,
  y: 20,
  width: 25,
  heigth: 25,
  speed: {
    x: 5,
    y: 1
  }
}

const game = new Game(gameSettings);

game.init([character1, character2]);
