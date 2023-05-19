let money = 0;
let productionRate = 1;
let sellingPrice = 10;

function produce() {
  money += productionRate;
  updateMoney();
}

function sell() {
  if (money > 0) {
    money -= 1;
    money += sellingPrice;
    updateMoney();
  }
}

function updateMoney() {
  document.getElementById('money').textContent = money;
}

function save() {
  const saveData = {
    money: money,
    productionRate: productionRate,
    sellingPrice: sellingPrice
  };
  localStorage.setItem('saveData', JSON.stringify(saveData));
}

function load() {
  const saveData = JSON.parse(localStorage.getItem('saveData'));
  if (saveData) {
    money = saveData.money;
    productionRate = saveData.productionRate;
    sellingPrice = saveData.sellingPrice;
    updateMoney();
  }
}
