import tabbis from './lib/tabs.js';
import {data} from './data.js';

tabbis({ memory: true });

const mapDOM = document.querySelector('.map');
const inventoryDOM = document.querySelector('.inventory-container');

let explore = data.explore;
let inventory = data.inventory;

console.log(inventory)

const loadMap = () => {
  mapDOM.innerHTML = '';
  explore.forEach(item => {
    mapDOM.innerHTML += `
      <div class="map-item">
        <button class="explore-btn" data-id=${item.id}>Explore</button>
        <h3>${item.title}</h3>
        <p>${item.items.map(item => item.name).join(', ')}</p>
      </div>
    `;
  });

  let exploreBtns = [...document.querySelectorAll('.explore-btn')];
  exploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      startExplore(e.target);
    });
  });
};

const startExplore = (target) => {
  let id = target.dataset.id;
  let item = explore.map(item => { item.items.find(item => item.amount > 0) });
  item.amount++;
  loadInventory();
}

const loadInventory = () => {
  inventoryDOM.innerHTML = '';
  inventory = explore.map(item => {
    console.log(item.items)
    item.items.find(item => item.amount > 0);
  });

  console.log(inventory)

  inventory.forEach(item => {
    inventoryDOM.innerHTML += `
      <div class="item">
        <h3>${item.name}</h3>
        <p>${item.amount}</p>
      </div>
    `;
  });
};

(() => {
  loadMap();
  loadInventory();
})();