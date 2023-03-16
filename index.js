const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const backfround = new Backfround({
	src: "assets/background/BG_01/BG_01.png",
});

const player = new Player({ px: 100, py: 200 });
const enemy = new Enemy({ px: 924, py: 200 });
const timer = new Timer();

canvas.width = 1024;
canvas.height = 512;

function animate() {
	backfround.draw();
	enemy.update();
	player.update();
	requestAnimationFrame(animate);
}

animate();
