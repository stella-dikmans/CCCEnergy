
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

let table; // Global object to hold results from the loadTable call
let prodrow = [];//arraw of my rows (objects)
let demandrow = [];//arraw of my rows (objects)

function preload() {
  table = loadTable("production2.csv", "header");
  demandTable = loadTable("demand2.csv","header");
}

// Convert saved data into Objects
function loadData() {
  const elecData = table.getRows();
  const length = table.getRowCount();
  const demandData = demandTable.getRows();
  const demandLength = demandTable.getRowCount();
  //console.log(elecData)
  //console.log(demandData)

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


//showing the data on the webpage as a background
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  loadData();

//resizing the canvas each time the window is being resized
  window.addEventListener('resize', windowResized);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //background(220);
}
s
//plotting the energy production and the energydemand data in relation to each other
function plot() {
  const xSpacing = width / (prodrow.length + 1);
  const prodMax = max(prodrow.map(dataPoint => dataPoint.energy));
  console.log(prodMax);
  const demMax = max(demandrow.map(dataPoint => dataPoint.real));
  console.log(demMax);
  const prodMin = min(prodrow.map(dataPoint => dataPoint.energy));
  console.log(prodMax);
  const demMin = min(demandrow.map(dataPoint => dataPoint.real));
  console.log(demMax);
  const ySpacing = height / (demandrow.length + 1);

  for (let i = 0; i < prodrow.length; i++) {
    const prodPoint = prodrow[i];
    const demandPoint = demandrow[i];
    let prod = map(prodPoint.energy, prodMin, prodMax, 0, width);
    let demand = map(demandPoint.real, demMin, demMax, 0, height);
    //const x = (i + 1) * xSpacing;
    //const y = height - dataPoint.energy * ySpacing;

    fill(0);
    noStroke();
    circle(prod, height-demand, 5);
  }
}

//highlighting one specific data-point in time (choose a row with date and time)
//this potentially is replaced by a real-time API situation
function plotPoint(rowNum) {
  const xSpacing = width / (prodrow.length + 1);
  const prodMax = max(prodrow.map(dataPoint => dataPoint.energy));
  console.log(prodMax);
  const demMax = max(demandrow.map(dataPoint => dataPoint.real));
  console.log(demMax);
  const prodMin = min(prodrow.map(dataPoint => dataPoint.energy));
  console.log(prodMax);
  const demMin = min(demandrow.map(dataPoint => dataPoint.real));
  console.log(demMax);
  const ySpacing = height / (demandrow.length + 1);

  const prodPoint = prodrow[rowNum];
  const demandPoint = demandrow[rowNum];
  let prod = map(prodPoint.energy, prodMin, prodMax, 0, width);
  let demand = map(demandPoint.real, demMin, demMax, 0, height);
  //const x = (i + 1) * xSpacing;
  //const y = height - dataPoint.energy * ySpacing;

  fill(255,0,0);
  noStroke();
  circle(prod, height-demand, 15);
}

function draw() {
  clear();
  plot();
  plotPoint(186);

}

