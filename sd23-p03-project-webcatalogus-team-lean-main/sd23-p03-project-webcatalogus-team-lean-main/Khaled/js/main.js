// Functie om schoenen op te halen en weer te geven
async function fetchAndDisplayShoes() {
    try {
        // Haal de schoenen op van de API
        const response = await fetch('http://localhost:3600/api/sport');
        const shoes = await response.json();

        // Selecteer de grid container waarin de schoenen worden weergegeven
        const shoeGrid = document.querySelector('.shoeGrid');
        shoeGrid.innerHTML = '';

        // Itereer over elke schoen en maak een element voor elk
        shoes.forEach(shoe => {
            const shoeItem = document.createElement('div');
            shoeItem.className = 'shoeItem';
            shoeItem.innerHTML = `<img src="${shoe.imageUrl}" alt="${shoe.name}" style="width:100%; height:auto;"><p class="shoeName">${shoe.name}</p><p class="shoePrice">€${shoe.price}</p>`;
            
            // Voeg het schoenitem toe aan de grid container
            shoeGrid.appendChild(shoeItem);
        });
    } catch (error) {
        // Toon een foutmelding als het ophalen van de schoenen mislukt
        console.error('Failed to fetch shoes:', error);
    }
}

// Roep fetchAndDisplayShoes functie aan wanneer de pagina geladen is
window.addEventListener('load', fetchAndDisplayShoes);
