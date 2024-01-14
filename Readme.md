# Maze generator

### How to run
1. Install npm
2. Install dependencies `npm i`
3. Run the programm `npm start`

This will automatically start a web-server that hosts the code for generating a maze. The server should have HMR enabled so feel free to leave it running while changing some code

### Publish/Distribute
1. Install npm
2. Install dependencies `npm i`
3. Pack the files `npm run pack`

Webpack will generate a `bundle.js` file in the `dist/` directory. You need to distribute the `bundle.js` and `index.html` file together. 