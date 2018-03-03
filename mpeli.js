var canvas = document.getElementById('peli'), ctx = canvas.getContext('2d'), scoreIs = document
		.getElementById('score'), score = 0, turn = 1, kuvat = [ 'pollo.png',
		'kissa.png', 'hylje.png', 'lintu.png', 'lintu2.png', 'nalle.png',
		'otus.png', 'otus2.png', 'perhonen.png', 'pika.png' ];
valittu = {
	eka : false,
	toka : false
}, current = 1, used = [], ruudut = [ 20 ], cellSize = 150;

// makes canvas interactive upon load
canvas.setAttribute('tabindex', 1);
canvas.style.outline = 'none';
canvas.focus();
// draws a square.. obviously
function drawSquare(x, y, color) {
	// ctx.fillStyle = color;
	// ctx.fillRect(x*150, y*150, cellSize, cellSize);
	setBackground();
	var temp = [];
	temp.push(valittu.eka);
	if (!!valittu.toka) {
		temp.push(valittu.toka);
	}

	var imgs = [];

	for (var i = 0; i < temp.length; i++) {
		imgs[i] = new Image();
		imgs[i].onload = (function() {
			var thisX = temp[i].x * 150;
			var thisY = temp[i].y * 150;

			return function() {
				ctx.drawImage(this, thisX, thisY);
			};
		}());

		imgs[i].src = temp[i].path;

	}
	for (var i = 0; i <used.length; i++) {
		if(!used[i]){
		imgs[i] = new Image();
		imgs[i].onload = (function() {
			var thisX = ruudut[i].x * 150;
			var thisY = ruudut[i].y * 150;

			return function() {
				ctx.drawImage(this, thisX, thisY);
			};
		}());

		imgs[i].src = ruudut[i].path;
		}
	}



}

function setBackground(color1, color2) {
	ctx.fillStyle = color1;
	ctx.strokeStyle = color2;

	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var x = 0.5; x < canvas.width; x += cellSize) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
	}
	for (var y = 0.5; y < canvas.height; y += cellSize) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
	}

	ctx.stroke()
}
function setBackgroundLines(color1, color2) {
	ctx.fillStyle = color1;
	ctx.strokeStyle = color2;

	for (var x = 0.5; x < canvas.width; x += cellSize) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
	}
	for (var y = 0.5; y < canvas.height; y += cellSize) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
	}

	ctx.stroke()
}

function onClick(evt) {

	var x = (Math.ceil((evt.clientX - 8) / cellSize)) - 1;
	var y = (Math.ceil((evt.clientY - 54) / cellSize)) - 1;
	// alert(xz + "," + yz);
	// Jos klikataan jo avattua ei tehdä pitään
	
	if (current == 1) {
		valittu.eka = ruudut[5 * y + x];
		valittu.toka = false;
		current = 2;
	} else if (current == 2) {
		if(valittu.eka.ind == ruudut[5 * y + x].ind ){
		
			return;
		}
		valittu.toka = ruudut[5 * y + x];
		current = 1;
		
	}
	checkPair();
	drawSquare(x, y,"grey");
	turn = turn + 1;
	checkEnd();
	
}
function checkPair(){
	if(valittu.eka.path == valittu.toka.path){
		used[valittu.eka.ind]=false;
		used[valittu.toka.ind]=false;
		
	}
}
function checkEnd(){
	console.log(used);
	for(var u = 0; u < used.length; u++){
		console.log(used[u]);
		if(used[u]){
			return
		}
	}
	alert("VOITIT");
	newGame();
}
function setImages() {

	for (var i = 0; i < 20; i++) {
		used.push(false);
	}
	for (var i = 0; i < 20; i++) {
		xi = ((i) % 5);
		yi = Math.floor(i / 5);
		rand = Math.floor(Math.random() * 20);
		if (!used[rand]) {
			ruudut[i] = {
				path : kuvat[rand % 10],
				x : xi,
				y : yi,
				ind: i,	
			};
			used[rand] = true;

		} else {
			i--;
		}
		setBackground('grey', 'black');
	}
}

function newGame() {

	canvas.addEventListener("click", onClick, false);
	setBackground('#fff', 'black');
	setImages();
	
}
newGame();