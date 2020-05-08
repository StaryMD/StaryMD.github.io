class Tile {
    walls = [false, false, false, false];

    isWall(dir) {
        return this.walls[dir];
    }

    buildWall(dir) {
        this.walls[dir] = true;
    }

    render(x, y) {
        if(this.walls[0])
            line(x, y, x + tileSize, y);
        if(this.walls[1])
            line(x + tileSize, y, x + tileSize, y + tileSize);
        if(this.walls[2])
            line(x, y + tileSize, x + tileSize, y + tileSize);
        if(this.walls[3])
            line(x, y, x, y + tileSize);
    }
}
let tileSize = 25;
let tableWidth = 39;
let tableHeight = 56;

let N = 0;
let E = 1;
let S = 2;
let W = 3;

var grid = [];
// Initialize table without walls
for(var y = 0; y < tableHeight; y++) {
    grid[y] = [];
    for(var x = 0; x < tableWidth; x++)
        grid[y][x] = new Tile();
}

// Build outside walls
for(var i = 0; i < tableHeight; i++) {
    grid[i][0].buildWall(W);
    grid[i][tableWidth - 1].buildWall(E);
}
for(var i = 0; i < tableWidth; i++) {
    grid[0][i].buildWall(N);
    grid[tableHeight - 1][i].buildWall(S);
}