# Circular Cities Challenge Energy

## A tool for self-balancing energy communities
One of the issues of energy systems is how to deal with the mismatch of how/when we consume and when we produce energy. That means when energy generation is high and no one uses it we waste regenerative energy, whereas when use exceeds production energy is overused. Usually, this mismatch is balanced out by energy storage, but we’re trying to solve the problem of unused hours on a community level. An intervention in public space indicates the current energy situation via colors and a digital tool gives citizens the information to adapt their behaviors to the current availability of energy. So communities can autonomously reduce the pressure on the energy grid during peak hours and contribute to a more balanced energy system.


## The product
This piece lights up in different colours and by that serves as an indicator of when to use electricity and when to reduce energy-consumption. The QR-code on the piece links to a website on which the real-time data from the electricity consumption is set into relation to the real-time data of the energy-generation. Because we want it to be a community engaging work in which citizens are getting aware of the "hidden" structures and imbalances of our urban energy-cycles, it will be installed in public spaces. Here, the community can come together to exchange thought and experience with their use of electricity. The piece has the potential to be transformed into a smaller version portable version that might be installed in private areas to also here indicate clearly what times one can use electricity.


## The process


<img src="https://github.com/stella-dikmans/CCCEnergy/assets/115219314/76566e94-81d2-4cbd-a730-6daa8d24bfe2" width="400">




## The code

the real live data for the energy production we get from [red electrica](https://demanda.ree.es/visiona/peninsula/demandaqh/total/2023-7-5)

therefore we are extracting the right data as CSV-sheets from [red electrica's demands](https://demanda.ree.es/visiona/peninsula/demandaqh/total/2023-7-5](https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2023-7-5/1)https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2023-7-5/1) and from [red electrica's generacion](https://demanda.ree.es/visiona/peninsula/demandaqh/total/2023-7-5](https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2023-7-5/1)https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2023-7-5/1](https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2023-7-5/2)https://demanda.ree.es/visiona/peninsula/demandaqh/tablas/2023-7-5/2) sites. Because we are multiple people, we code together in [replit](https://replit.com/~). Here we create a new HTML, CSS, JS-repl and start working in our javascript file.


first in the code is defining classes - this is to link the two data-tables (demand="RowDemand" and production="RowProd" of energy). These classes have constructor functions to initialize objects which we later on define as "hora" and "energy" for the production data (the rows of the production table that we are taking into account) and the object "real" (the row of the demand-data-table that we take into account). 

```js
{

class RowProd {
  constructor(hora, energy) {
    this.hora = hora;
    this.energy = energy;
    this.diameter = 5;//energy / 80;
    // this.radius = this.diameter / 2;
  }
}

class RowDemand {
  constructor(hora, real) {
    this.hora = hora;
    this.real = real;
    this.diameter = 5;//energy / 80;
    // this.radius = this.diameter / 2;
  }
}
```


then, we declare the variables

```js
{
let table; // Global object to hold results from the loadTable call
let prodrow = [];//arraw of my rows (objects)
let demandrow = [];//arraw of my rows (objects)

  }
}
```


then, we introduce a "preload" functioon which is part of [p5.js](https://p5js.org/) which we are using.

```js
{
function preload() {
  table = loadTable("production2.csv", "header");
  demandTable = loadTable("demand2.csv", "header");
}
```


The next block defines the loadData function, which processes the loaded tables and populates the prodrow and demandrow arrays with objects created from the data in the tables. 


```js
{
// Convert saved data into Objects
function loadData() {
  const elecData = table.getRows();
  const length = table.getRowCount();
  const demandData = demandTable.getRows();
  const demandLength = demandTable.getRowCount();
  //console.log(elecData)
  //console.log(demandData)
```

according to red electrica, the renovable energy sources are:<br>
• Eólica <br>
• Hidáulica <br>
• Solar fotovoltaica <br>
• Solar térmica <br>
• Térmica renovable <br>

so what we do is, we define the colums we want to itegrate into the code and make them one variable = energy

```js
{
  for (let i = 0; i < length; i++) {
    // Get only relevant rows and additional one all together.
    const hora = elecData[i].getString("Hora");
    const eolica = elecData[i].getNum("Eolica");
    const hidraulica = elecData[i].getNum("Hidraulica");
    const pv = elecData[i].getNum("Solar fotovoltaica");
    const solart = elecData[i].getNum("Solar termica");
    const termica = elecData[i].getNum("Termica renovable");
    const energy = eolica + hidraulica + pv + solart + termica

    //let rows = demandTable.findRows(hora, 'Hora');
    //console.log(rows[0][1])

    //console.log(hora, energy)

    // Put object in array
    prodrow.push(new RowProd(hora, energy));
  }
  for (let i = 0; i < demandLength; i++) {
    // Get only relevant rows and additional one all together.
    const hora = demandData[i].getString("Hora");
    const real = demandData[i].getNum("Real");

    //let rows = demandTable.findRows(hora, 'Hora');
    //console.log(rows[0][1])

    //console.log(hora, energy)

    // Put object in array
    //console.log(hora,real)
    demandrow.push(new RowDemand(hora, real));
  }
}
```


now we set the window style-wise so that we are able to see it in any browser and size in a user-friendly way


```js
{
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //background(220);
}
```


then we come to the "set up" function to design the main interface


```js
{
//showing the data on the webpage as a background
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  loadData();
  frameRate(5);
  //resizing the canvas each time the window is being resized
  window.addEventListener('resize', windowResized);
}
```


we come to the "draw" function that will actually push the data so we can see it


```js
{
let frameIndex = 0; // Current frame index for animation
function draw() {
  //plot();
  animate();
}
```


and the "plot" function to plot ALL the points of the data-tables in space


```js
{
//plotting the energy production and the energydemand data in relation to each other
function plot() {
  const xSpacing = width / (prodrow.length + 1);
  const prodMax = max(prodrow.map(dataPoint => dataPoint.energy));
  //console.log(prodMax);
  const demMax = max(demandrow.map(dataPoint => dataPoint.real));
  //console.log(demMax);
  const prodMin = min(prodrow.map(dataPoint => dataPoint.energy));
  //console.log(prodMax);
  const demMin = min(demandrow.map(dataPoint => dataPoint.real));
  //console.log(demMax);
  const ySpacing = height / (demandrow.length + 1);

  for (let i = 0; i < prodrow.length; i++) {
    const prodPoint = prodrow[i];
    const demandPoint = demandrow[i];
    let prod = map(prodPoint.energy, prodMin, prodMax, 0, width);
    let demand = map(demandPoint.real, demMin, demMax, 0, height);
    //const x = (i + 1) * xSpacing;
    //const y = height - dataPoint.energy * ySpacing;

    fill(255);
    noStroke();
    console.log("plot")
    circle(prod, height - demand, 5);
  }
}
```


before we then "plot" only the choosen points that we wish to present

```js
{
//highlighting one specific data-point in time (choose a row with date and time)
//this potentially is replaced by a real-time API situation
function plotPoint(rowNum) {
  const xSpacing = width / (prodrow.length + 1);
  const prodMax = max(prodrow.map(dataPoint => dataPoint.energy));
  //console.log(prodMax);
  const demMax = max(demandrow.map(dataPoint => dataPoint.real));
  //console.log(demMax);
  const prodMin = min(prodrow.map(dataPoint => dataPoint.energy));
  //console.log(prodMax);
  const demMin = min(demandrow.map(dataPoint => dataPoint.real));
  //console.log(demMax);
  const ySpacing = height / (demandrow.length + 1);

  const prodPoint = prodrow[rowNum];
  const demandPoint = demandrow[rowNum];

  let prod = map(prodPoint.energy, prodMin, prodMax, 0, width);
  let demand = map(demandPoint.real, demMin, demMax, 0, height);
  console.log("prodPoint", prod);
  console.log("demandPoint", demand);
  //const x = (i + 1) * xSpacing;
  //const y = height - dataPoint.energy * ySpacing;

  fill(255, 255, 255);
  stroke(51);
  strokeWeight(3);
  circle(prod, height - demand, 25);
}
```


and now we come to make the whole thing move and we let our specific data-point, move through space

```js
{
function animate() {
  const totalRows = prodrow.length;

  if (frameIndex < totalRows) {
    clear(); // Clear the canvas on each frame
    plot();
    plotPoint(frameIndex); // Plot the current frame
    frameIndex++; // Move to the next frame
  }
}
```

e voila!

the result of the webpage:
<img src="Screenshot 2023-07-06 at 17 15 18" src="https://github.com/stella-dikmans/CCCEnergy/assets/115219314/17a38a94-6de4-4d69-8f35-c4e9f521a73e" width="400">





