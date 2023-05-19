// Define the game variables
let money = 0;
let ores = 0;
let miners = 0;
let workers = 0;

// Define the game functions
function mine() {
  ores += miners;
  updateDisplay();
}

function produce() {
  money += ores;
  updateDisplay();
}

function hireMiner() {
  const cost = Math.pow(2, miners);
  if (money >= cost) {
    money -= cost;
    miners++;
    updateDisplay();
  }
}

function hireWorker() {
  const cost = Math.pow(2, workers);
  if (money >= cost) {
    money -= cost;
    workers++;
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("money").textContent = money;
  document.getElementById("ores").textContent = ores;
  document.getElementById("miners").textContent = miners;
  document.getElementById("workers").textContent = workers;
}

function exportSave() {
  const saveData = {
    money: money,
    ores: ores,
    miners: miners,
    workers: workers
  };
  const saveString = btoa(JSON.stringify(saveData));
  const saveLink = document.createElement("a");
  saveLink.href = "data:text/plain;charset=utf-8," + encodeURIComponent(saveString);
  saveLink.download = "save.txt";
  saveLink.click();
}

function importSave() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt";
  input.onchange = () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const saveString = reader.result;
      const saveData = JSON.parse(atob(saveString));
      money = saveData.money;
      ores = saveData.ores;
      miners = saveData.miners;
      workers = saveData.workers;
      updateDisplay();
    };
  };
  input.click();
}

// Attach the event handlers
document.getElementById("mine-button").addEventListener("click", mine);
document.getElementById("produce-button").addEventListener("click", produce);
document.getElementById("hire-miner-button").addEventListener("click", hireMiner);
document.getElementById("hire-worker-button").addEventListener("click", hireWorker);
document.getElementById("export-save-button").addEventListener("click", exportSave);
document.getElementById("import-save-button").addEventListener("click", importSave);
