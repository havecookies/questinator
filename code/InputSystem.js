const Input = {
  parse(command,ctx) {
      
  }
  
}
class Command {
  constructor(name) {
    this.name = name;
    commands += 1
  }
}
class MoveCommand extends Command {
  constructor(player,dx,dy) {
    this.player = player;
    this.dx = dx;
    this.dy = dy;
  }
	
  execute() {
    player.x += dx;
    player.y += dy;
  }
}
