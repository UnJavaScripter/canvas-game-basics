class IGameSettings {
  canvasId?: string;
  background: string;
  canvasRef?: HTMLCanvasElement;
  heigth: number;
  width: number;
}

class ICharacter {
  color: string;
  x: number;
  y: number;
  width: number;
  heigth: number;
  newPos?: {x: number, y: number}[]
  speed: {x: number, y: number}
}



class Game {

  gameBoard: HTMLCanvasElement;
  settingsObj: IGameSettings;
  ctx: CanvasRenderingContext2D;
  fps: number = 60;
  fpsConfig = {
    fpsInterval: 1000 / this.fps,
    then: Date.now(),
    now: <any>undefined,
    elapsed: <any>undefined
  };

  characters: ICharacter[] = [];

  constructor(settingsObj?: IGameSettings) {
    this.settingsObj = settingsObj ? settingsObj : {background: 'pink', heigth: 800, width: 800, canvasId: 'canvas'};

    if(!this.settingsObj.canvasRef) {
      this.gameBoard = (<HTMLCanvasElement>document.getElementById(this.settingsObj.canvasId));
    }else {
      this.gameBoard = this.settingsObj.canvasRef;
    }

  }
  
  init(characters: ICharacter[]) {
    this.ctx = this.gameBoard.getContext('2d');
    
    this.characters = this.characters.concat(characters);

    this.startAnimating();
  }

  startAnimating() {
    
    this.fpsConfig.now = Date.now();
    this.fpsConfig.elapsed = this.fpsConfig.now - this.fpsConfig.then;
    
    requestAnimationFrame(this.startAnimating.bind(this));

    if (this.fpsConfig.elapsed > this.fpsConfig.fpsInterval) {
      this.fpsConfig.then = this.fpsConfig.now - (this.fpsConfig.elapsed % this.fpsConfig.fpsInterval);
      this.draw();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.settingsObj.width, this.settingsObj.heigth);
    
    this.ctx.fillStyle = this.settingsObj.background;
    this.ctx.fillRect(0, 0, this.gameBoard.width, this.gameBoard.height);
    this.moveCharacters(10, 0);
    
  }

  moveCharacters(x: number, y: number) {
    this.characters.forEach(character => {
      let lastPos;
      
      if(!character.newPos) {
        character.newPos = [];
        lastPos = {x: character.x, y: character.y}
      } else {
        if(character.newPos.length  > 5 ) {
          character.newPos = character.newPos.slice(1);
        }
        lastPos = character.newPos[character.newPos.length - 1];
      }
      const newX = lastPos.x + (x * character.speed.x) > this.settingsObj.width ? 0 : lastPos.x + (x * character.speed.x);
      const newY = lastPos.y + (y * character.speed.y) > this.settingsObj.heigth ? 0 : lastPos.y + (y * character.speed.y);
      this.ctx.fillStyle = character.color;
      this.ctx.fillRect(newX, newY, character.width, character.heigth);
      character.newPos.push({x: newX, y: newY});
    });
  }
}
