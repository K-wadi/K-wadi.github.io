console.log("example loaded");

const container = document.querySelector(".card-container");

fetch('http://localhost:3600/jordans-women')
.then(data => data.json())
.then(myJsonData => showCards(myJsonData));

function showCards(shoes) {
    console.log(shoes);

    let htmlCode = '';
    for (let i = 0; i < shoes.length; i++) {
        const shoe = shoes[i];
        htmlCode += createCard(shoe);
    }
    container.innerHTML = htmlCode;
}

function createCard(shoe) {
    const card = `
        <div class="shoe-card">
            <h2>${shoe.title}</h2>
            <img src="${shoe.imageUrl}"/>
            <p>${shoe.price}</p>
        </div>
    `;
    return card;
}