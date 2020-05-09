grid = [];
let gridWidth = tableWidth * tileSize;
let gridHeight = tableHeight * tileSize;

function setup() {
	createCanvas(windowWidth, gridHeight + tileSize * 1.5);
	moves = loadStrings('moves.txt');
	eu = loadImage('img/eu.png');
	el = loadImage('img/el.png');
	
	// Initialize table without walls
	for(var y = 0; y < tableHeight; y++) {
		grid[y] = [];
		for(var x = 0; x < tableWidth; x++) {
			grid[y][x] = new Tile();
			grid[y][x].setNewWalls();
		}
	}
	
	// Build outside walls
	for(var i = 0; i < tableHeight; i++) {
		grid[i][0].buildWall(W);
		grid[i][tableWidth - 1].buildWall(E);
	}
	for(var i = 0; i < tableWidth; i++) {
		grid[0][i].buildWall( N);
		grid[tableHeight - 1][i].buildWall(S);
	}
}

function draw() {
	background(255)

	// Draws the numbers
	translate(0, 0);
	strokeWeight(1);
	fill(0);
	textSize(12);
 	for(var x = 1; x <= tableWidth; x++)
		text(x, x * tileSize + tileSize / 3, 20);
	
	for(var y = 1; y <= tableHeight; y++)
		text(y, 5, y * tileSize + 18);

	translate(25, 25)


	// Looking at
	if(mouseX >= 25 && mouseX < gridWidth + 25 && mouseY >= 25 && mouseY < gridHeight + 25) {
		let x = ~~(mouseX % tileSize);
		let y = ~~(mouseY % tileSize);
		var curDir = 0;

		if(x - y > 0)
			if(y + x > tileSize)
				curDir = E;
			else
				curDir = N;
		else
			if(y + x > tileSize)
				curDir = S;
			else
				curDir = W;
		
		let col = int(mouseX / tileSize) - 1;
		let row = int(mouseY / tileSize) - 1;
		grid[row][col].highlight(curDir, col * tileSize, row * tileSize);
	}


	// Draws the lines
	strokeWeight(2);
	stroke(20, 156, 186);
 	 for(var x = 1; x < tableWidth; x++)
		line(x * tileSize, 0, x * tileSize, gridHeight);
	
	for(var y = 1; y < tableHeight; y++)
 		line(0, y * tileSize, gridWidth, y * tileSize);

	strokeWeight(3);
	stroke(0);
	line(0, 0, gridWidth, 0);
	line(0, 0, 0, gridHeight);
	line(gridWidth, 0, gridWidth, gridHeight);
	line(0, gridHeight, gridWidth, gridHeight);

	
	// Read stored lines
	for(var i = 0; moves[i].length > 2; i++) {
		let move = moves[i].split(' ');
		let player = move[0];
		let x = parseInt(move[1]) - 1;
		let y = parseInt(move[2]) - 1;

		var curDir = 0;
		if(move[3] == "N")
 			curDir = N;
		if(move[3] == "E")
			curDir = E;
		if(move[3] == "S")
			curDir = S;
		if(move[3] == "W")
			curDir = W;

		newSquares = 0;

		newSquares += grid[y][x].buildWall(curDir);

		if(curDir == N && y > 0)
			newSquares += grid[y - 1][x].buildWall(S);
		if(curDir == E && x < tableWidth - 1)
			newSquares += grid[y][x + 1].buildWall(W);
		if(curDir == S && y < tableHeight - 1)
			newSquares += grid[y + 1][x].buildWall(N);
		if(curDir == W && x > 0)
			newSquares += grid[y][x - 1].buildWall(E);
		

		if(!grid[y][x].marked && newSquares) {
			grid[y][x].marked = true;
			if(player == 'V')
				scoreEu += newSquares;
			if(player == 'N')
				scoreEl += newSquares;
		}
	}
	

	// Draw the player lines
	strokeWeight(3);
	stroke(0);
	for(var i = 0; i < tableHeight; i++)
		for(var j = 0; j < tableWidth; j++)
			grid[i][j].render(j * tileSize, i * tileSize);
	
	
	// Who shall move next
	noStroke();
	textSize(30);
	fill(255, 0, 0);
	text('Who moves next:', 1130, 30);
	if(moves.length % 2) // I shall move next
		image(eu, 1100, 40, 300, 300)
	else // He shall move next
		image(el, 1100, 40, 300, 300);

	text('Move history:', 1160, 600);

	// Score display

	text('Score:', 1100, 400);
	fill(0, 0, 256);
	text('V: ' + str(scoreEu), 1133, 445);
	fill(0);
	text('N: ' + str(scoreEl), 1130, 490);
}

lastMove = '';

function mouseClicked() {
	if(mouseX >= 25 && mouseX < gridWidth + 25 && mouseY >= 25 && mouseY < gridHeight + 25) {
		let x = ~~(mouseX % tileSize);
		let y = ~~(mouseY % tileSize);
		var curDir = 0;

		if(x - y > 0)
			if(y + x > tileSize)
				curDir = E;
			else
				curDir = N;
		else
			if(y + x > tileSize)
				curDir = S;
			else
				curDir = W;
		
		let col = ~~((mouseX / tileSize));
		let row = ~~((mouseY / tileSize));

		if(!grid[row - 1][col - 1].walls[curDir]) {
			if(curDir == N)
				curDir = 'N';
			if(curDir == E)
				curDir = 'E';
			if(curDir == S)
				curDir = 'S';
			if(curDir == W)
				curDir = 'W';

			curMove = col + ' ' + row + ' ' + curDir;

			if(curMove != lastMove) {
				lastMove = curMove;

				if(moves.length % 2)
					moves.push(curMove = 'V ' + curMove);
				else
					moves.push(curMove = 'N ' + curMove);

				textToWrite = 'New move:  ' + curMove;
				
				print(textToWrite);
				alert(textToWrite);
			}
		}
	}
}

var scoreEu = 0;
var scoreEl = 0;
