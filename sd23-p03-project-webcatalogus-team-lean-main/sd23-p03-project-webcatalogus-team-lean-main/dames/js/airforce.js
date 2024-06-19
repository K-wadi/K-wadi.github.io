console.log("example loaded");

const container = document.querySelector(".card-container"); 

fetch('http://localhost:3600/airforce-women') 
.then(data => data.json()) 
.then(myJsonData => showCards(myJsonData));

function showCards(shoes) { //dit zorgt ervoor dat de creatcard function in de html word gezet
    console.log(shoes);

    let htmlCode = '';
    for (let i = 0; i < shoes.length; i++) { //dit zorgt ervoor dat er cards worden gemaakt op basis van hoeveel objecten je in je json hebt
        const shoe = shoes[i];
        htmlCode += createCard(shoe);
    }
    container.innerHTML = htmlCode;
}

function createCard(shoe) { //deze function zorgt ervoor dat er html word aangemaakt (zie showcards)
    const card = `
        <div class="shoe-card">
            <h2>${shoe.title}</h2>
            <img src="${shoe.imageUrl}"/>
            <p>${shoe.price}</p>
        </div>
    `;
    return card; //dit zorgt ervoor dat de card daadwerkelijk word teruggegeven
}