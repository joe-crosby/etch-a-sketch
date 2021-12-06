let isLoaded = false;;
let defaultPenColor = '#000000';
let defaultSquareSize = 16;
let mouseIsDown = false;

function createGrid(rows, cols){
  let main = document.querySelector('.main');

  // remove previous grid
  let previousGrid = document.querySelector('.grid-container');
  if (previousGrid)
    previousGrid.remove();

  let grid = document.createElement('div');
  grid.classList.add('grid-container', 'solid-border');
  // set the grid css dynamically
  grid.style.setProperty('--rows', rows);
  grid.style.setProperty('--cols', cols);

  for (var i = 0; i < (rows * cols); i++){
    let cell = document.createElement('div');
    cell.classList.add('grid-element', 'solid-border');

    // attach hover listener
    cell.addEventListener("mouseenter", mouseInCell);

    grid.appendChild(cell);
  }
  main.appendChild(grid);
}

function mouseDown(e){
  if (!e.target.classList.contains('grid-element'))
    return;

  mouseIsDown = true
  editCell(e.target);
}

// on the window so it always releases
function mouseUp(){
  mouseIsDown = false;
}

function mouseInCell(e){
  editCell(e.currentTarget);
}

function editCell(target){
  if (mouseIsDown){
    // add color
    target.style.backgroundColor = getPenColor();
  }
}

function clearScreen(){
  let cells = document.querySelectorAll('.grid-element');

  // create an animation of the squares detaching before resetting?

  cells.forEach(c => {
    // clear the background-color
    c.style.backgroundColor = '';
    c.classList.remove('cell-entered');
  });
}

function regenerate(){
  let gridSize = 'N';
  while (isNaN(gridSize) || gridSize < 1 || gridSize > 100){
    gridSize = Number(prompt("how many squares would you like to use? (Max = 100)", defaultSquareSize));
  }

  initialize(gridSize);
}

function initialize(gridSize){
  // add events
  if (!isLoaded){
    updatePenColor(defaultPenColor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    document.querySelector('#colorPicker').addEventListener('change', colorPickerChanged)
    document.querySelector('#gridColorPicker').addEventListener('change', colorPickerChanged)
    isLoaded = true;
  }

  createGrid(gridSize, gridSize);
}

function colorPickerChanged(e){
  let color = e.currentTarget.value;

  if (e.currentTarget.id === 'gridColorPicker'){
    updateGridColor(color);
  }
  else{
    updatePenColor(color);
  }
}

function updatePenColor(colorValue){
  document.documentElement.style.setProperty('--ink-color', colorValue);
}

function updateGridColor(colorValue){
  document.documentElement.style.setProperty('--grid-background-color', colorValue);
}

function getPenColor(){
  return document.documentElement.style.getPropertyValue('--ink-color');
}

initialize(defaultSquareSize);
