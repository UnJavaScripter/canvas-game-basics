const gameSettings = {
  background: 'white',
  canvasRef: (<HTMLCanvasElement>document.getElementById('gameBoard')),
  heigth: 800,
  width: 800
}

const character1 = {
  color: 'peru',
  x: 80,
  y: 60,
  width: 25,
  heigth: 25
}

const game = new Game(gameSettings);

game.init([character1]);
