class Tile {
    walls = [];

    setNewWalls() {
        this.walls = [false, false, false, false];
    }

    buildWall(dir) {
        this.walls[dir] = true;
    }

    isWall(dir) {
        return this.walls[dir];
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

    highlight(dir, x, y) {
        fill(Math.random() * 256, Math.random() * 256, Math.random() * 256);
        noStroke();

        beginShape();
        if(dir == N) {
            vertex(x, y);
            vertex(x + tileSize, y);
        }
        if(dir == E) {
            vertex(x + tileSize, y);
            vertex(x + tileSize, y + tileSize);
        }
        if(dir == S) {
            vertex(x, y + tileSize);
            vertex(x + tileSize, y + tileSize);
        }
        if(dir == W) {
            vertex(x, y);
            vertex(x, y + tileSize);
        }
        vertex(x + tileSize / 2, y + tileSize / 2);
        endShape(CLOSE);
    }

    getVal() {
        return this.walls;
    }
}

let tileSize = 25;
let tableWidth = 39;
let tableHeight = 56;

let N = 0;
let E = 1;
let S = 2;
let W = 3;

grid = [];