// Asynchrone functie die schoenen ophaalt en weergeeft
async function fetchAndDisplayShoes() {
    try {
        // Wacht op het ophalen van de schoenen van de server
        const response = await fetch('http://localhost:3600/api/shoes');
        // Converteer het JSON-antwoord naar een JavaScript-object
        const shoes = await response.json();
        // Zoek het rooster waarin de schoenen worden weergegeven
        const shoeGrid = document.querySelector('.shoeGrid');
        // Leeg het rooster voordat nieuwe schoenen worden toegevoegd
        shoeGrid.innerHTML = '';
        // Voor elke schoen in de verkregen lijst
        shoes.forEach(shoe => {
            // Maak een nieuw element aan voor de schoen
            const shoeItem = document.createElement('div');
            // Geef de klasse 'shoeItem' aan het element
            shoeItem.className = 'shoeItem';
            // Voeg HTML toe aan het element met de afbeelding, naam en prijs van de schoen
            shoeItem.innerHTML = `<img src="${shoe.imageUrl}" alt="${shoe.name}" style="width:100%; height:auto;"><p class="shoeName">${shoe.name}</p><p class="shoePrice">€${shoe.price}</p>`;
            // Voeg het schoenelement toe aan het rooster
            shoeGrid.appendChild(shoeItem);
        });
    } catch (error) {
        // Toon een foutmelding als het ophalen van de schoenen mislukt
        console.error('Failed to fetch shoes:', error);
    }
}

// Wacht tot de pagina volledig is geladen en roep fetchAndDisplayShoes aan
window.addEventListener('load', fetchAndDisplayShoes);






