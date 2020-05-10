class Tile {
    walls = [];
    marked;

    setNewWalls() {
        this.walls = [false, false, false, false];
        this.marked = false;
    }

    buildWall(dir) {
        this.walls[dir] = true;

        var val = this.walls[N] && this.walls[E] && this.walls[S] && this.walls[W] && !this.marked;
        if(val)
            this.marked = true;
        return val;
        // returns true if a new square is completed
    }

    isWall(dir) {
        return this.walls[dir];
    }

    render(x, y) {
        if(this.walls[N])
            line(x, y, x + tileSize, y);
        if(this.walls[E])
            line(x + tileSize, y, x + tileSize, y + tileSize);
        if(this.walls[S])
            line(x, y + tileSize, x + tileSize, y + tileSize);
        if(this.walls[W])
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
}

let tileSize = 25;
let tableWidth = 39;
let tableHeight = 56;

let N = 0;
let E = 1;
let S = 2;
let W = 3;
