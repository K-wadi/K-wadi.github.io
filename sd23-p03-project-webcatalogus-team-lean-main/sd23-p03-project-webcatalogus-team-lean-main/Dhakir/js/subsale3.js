async function fetchAndDisplayShoes() {
    try {
        const response = await fetch('http://localhost:3600/api/salesub3');
        const shoes = await response.json();
        const shoeGrid = document.querySelector('.shoeGrid');
        shoeGrid.innerHTML = '';
        shoes.forEach(shoe => {
            const shoeItem = document.createElement('div');
            shoeItem.className = 'shoeItem';
            shoeItem.innerHTML = `<div class="sale-bar">sale</div><img src="${shoe.imageUrl}" alt="${shoe.name}" style="width:100%; height:auto;"><p class="shoeName">${shoe.name}</p><p class="shoePrice">€${shoe.price}</p>`;
            shoeGrid.appendChild(shoeItem);
        });
    } catch (error) {
        console.error('Failed to fetch shoes:', error);
    }
  }
  window.addEventListener('load', fetchAndDisplayShoes);
  