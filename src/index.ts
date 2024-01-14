import { Maze } from './maze';

const canvas = document.getElementById('maze-canvas') as HTMLCanvasElement;
const maze_size = document.getElementById('maze-size') as HTMLInputElement;
let maze = new Maze(maze_size.valueAsNumber, canvas);
document.getElementById('solve').addEventListener('click', () => {
});
document.getElementById('generate').addEventListener('click', () => {
    maze = new Maze(maze_size.valueAsNumber, canvas);
    maze.generate();
    maze.draw();
});
document.getElementById('download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'maze.png';
    link.href = canvas.toDataURL();
    link.click();
});