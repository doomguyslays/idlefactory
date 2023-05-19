// Define the game variables
let money = 0;
let ores = 0;
let miners = 0;
let worker = 0;

// Define the game functions
function mine() {
  ores += miners;
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
  const cost = Math.pow(2, worker);
  if (money >= cost) {
    money -= cost;
    worker++;
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("money").textContent = money;
  document.getElementById("ores").textContent = ores;
  document.getElementById("miners").textContent = miners;
  document.getElementById("workers").textContent = worker;
}

function exportSave() {
  const saveData = {
    money: money,
    ores: ores,
    miners: miners,
    worker: worker
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
  input.accept = ".factorysave";
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
      worker = saveData.worker;
      updateDisplay();
    };
  };
  input.click();
}

// Attach the event handlers
document.getElementById("mine-button").addEventListener("click", mine);
document.getElementById("hire-miner-button").addEventListener("click", hireMiner);
document.getElementById("hire-worker-button").addEventListener("click", hireWorker);
document.getElementById("export-save-button").addEventListener("click", exportSave);
document.getElementById("import-save-button").addEventListener("click", importSave);

