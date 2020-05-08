let gridWidth = tableWidth * tileSize;
let gridHeight = tableHeight * tileSize;

function setup() {
	createCanvas(windowWidth, gridHeight + tileSize * 1.5);
	data = loadStrings('moves.txt');
}

function draw() {
	// Draws the numbers
	translate(0, 0);
	strokeWeight(1);
	stroke(0);
	textSize(12);
 	for(var x = 1; x <= tableWidth; x++)
		text(x, x * tileSize + tileSize / 3, 20);
	
	for(var y = 1; y <= tableHeight; y++)
		text(y, 5, y * tileSize + 18);

	// Draws the lines
 	 translate(25, 25)

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
	
	for(var i = 0; i < data.length; i++) {
		let line = data[i].split(' ');

		let x = parseInt(line[1]) - 1;
		let y = parseInt(line[2]) - 1;

		if(line[3] == "N")
 			grid[y][x].buildWall(N);
		
		if(line[3] == "E")
			grid[y][x].buildWall(E);

		if(line[3] == "S")
			grid[y][x].buildWall(S);
	
		if(line[3] == "W")
			grid[y][x].buildWall(W);
	}

	// Draw the player lines
	for(var i = 0; i < tableHeight; i++)
		for(var j = 0; j < tableWidth; j++)
			grid[i][j].render(j * tileSize, i * tileSize);

}
