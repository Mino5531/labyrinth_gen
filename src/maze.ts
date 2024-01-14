import { DisjointSet } from './disjointSet';

class Segment {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(t: boolean, r: boolean, b: boolean, l: boolean, x: number, y: number, w: number, h: number) {
        this.top = t;
        this.right = r;
        this.bottom = b;
        this.left = l;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        if (this.top) {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y);
        }
        if (this.right) {
            ctx.moveTo(this.x + this.width, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height);
        }
        if (this.bottom) {
            ctx.moveTo(this.x + this.width, this.y + this.height);
            ctx.lineTo(this.x, this.y + this.height);
        }
        if (this.left) {
            ctx.moveTo(this.x, this.y + this.height);
            ctx.lineTo(this.x, this.y);
        }
        ctx.stroke();
    }

    removeWall(dir: string) {
        switch (dir) {
            case 'top':
                this.top = false;
                break;
            case 'right':
                this.right = false;
                break;
            case 'bottom':
                this.bottom = false;
                break;
            case 'left':
                this.left = false;
                break;
        }
    }
}

export class Maze {
    size: number;
    canvas: HTMLCanvasElement;
    grid: Segment[][];
    navSet: DisjointSet;
    constructor(size: number, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.size = size;
        this.grid = [[]];
        this.navSet = new DisjointSet();
        const height = Math.ceil(canvas.height / size);
        const width = Math.ceil(canvas.width / size);
        canvas.height = height * size;
        canvas.width = width * size;
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = new Segment(true, true, true, true, j * width, i * height, width, height);
                this.navSet.add(this.grid[i][j]);
            }
        }
        this.draw();
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j].draw(ctx);
            }
        }
    }
    generate() {
        this.grid[0][0].removeWall('top');
        this.grid[0][0].removeWall('left');
        this.grid[this.size - 1][this.size - 1].removeWall('bottom');
        this.grid[this.size - 1][this.size - 1].removeWall('right');
        while (this.navSet.find(this.grid[0][0]) !== this.navSet.find(this.grid[this.size - 1][this.size - 1])) {
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);
            const dir = Math.floor(Math.random() * 4);
            switch (dir) {
                case 0: // Top
                    if (y > 0 && this.navSet.find(this.grid[y][x]) !== this.navSet.find(this.grid[y - 1][x])) {
                        this.grid[y][x].removeWall('top');
                        this.grid[y - 1][x].removeWall('bottom');
                        this.navSet.union(this.grid[y][x], this.grid[y - 1][x]);
                    }
                    break;
                case 1: // Right
                    if (x < this.size - 1 && this.navSet.find(this.grid[y][x]) !== this.navSet.find(this.grid[y][x + 1])) {
                        this.grid[y][x].removeWall('right');
                        this.grid[y][x + 1].removeWall('left');
                        this.navSet.union(this.grid[y][x], this.grid[y][x + 1]);
                    }
                    break;
                case 2: // Bottom
                    if (y < this.size - 1 && this.navSet.find(this.grid[y][x]) !== this.navSet.find(this.grid[y + 1][x])) {
                        this.grid[y][x].removeWall('bottom');
                        this.grid[y + 1][x].removeWall('top');
                        this.navSet.union(this.grid[y][x], this.grid[y + 1][x]);
                    }
                    break;
                case 3: // Left
                    if (x > 0 && this.navSet.find(this.grid[y][x]) !== this.navSet.find(this.grid[y][x - 1])) {
                        this.grid[y][x].removeWall('left');
                        this.grid[y][x - 1].removeWall('right');
                        this.navSet.union(this.grid[y][x], this.grid[y][x - 1]);
                    }
                    break;
            }
        }
    }
}