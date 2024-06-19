import express from 'express';
import cors from 'cors';
import fs from 'node:fs';

const app = express();
const port = 3600; // You can use any port that's available
app.use(cors()); //dit zorgt ervoor dat je veilig kan fetchen

// Handler for the root route
app.get('/', (req, res) => {
    // You can customize the message or send HTML content
    res.send('Welcome to the Shoe Store! Visit /api/shoes to see our products.');
});

// Existing route for the /api/shoes endpoint
app.get('/api/shoes', (req, res) => {
    const shoes = [
        { name: 'Nike Air Max Plus', price: 189.99, imageUrl: '/Arian/img/Nike Air Max Plus.png' },
        { name: 'Luke 2 Bred', price: 77.99, imageUrl: '/Arian/img/Luke 2 Bred.png' },
        { name: 'Nike P-6000', price: 109.99, imageUrl: '/Arian/img/Nike P-6000.png' },
        { name: 'Jordan Max Aura 5', price: 64.99, imageUrl: '/Arian/img/Jordan Max.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Arian/img/Jordan.png' },
        { name: 'Nike Pegasus 40 Premium', price: 97.99, imageUrl: '/Arian/img/Pegasus.png' },
        { name: 'Jordan Stay Loyal 2', price: 59.99, imageUrl: '/Arian/img/Jordan Loyal.png' },
        { name: 'Nike G.T. Hustle 2', price: 139.97, imageUrl: '/Arian/img/Nike Hustle.png' },
        { name: 'Nike Court Vision Low', price: 79.99, imageUrl: '/Arian/img/Nike Court.png' },

    ];

    res.json(shoes);
});

app.get('/api/subcat1', (req, res) => {
    const shoes = [
        { name: 'Air Jordan 1 Mid SE', price: 89.99, imageUrl: '/Arian/img/air jordan 1 mid se.png' },
        { name: 'Air Jordan 3 Retro', price: 209.99, imageUrl: '/Arian/img/jordan retro.png' },
        { name: 'Jordan True Flight', price: 149.99, imageUrl: '/Arian/img/true flight.png' },
        { name: 'Jordan Max Aura 5', price: 64.99, imageUrl: '/Arian/img/Jordan Max.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Arian/img/Jordan.png' },
        { name: 'Air Jordan 1 Hi FlyEase', price: 189.99, imageUrl: '/Arian/img/jordan fly ease.png' },
        { name: 'Jordan Stay Loyal 2', price: 59.99, imageUrl: '/Arian/img/Jordan Loyal.png' },
        { name: 'Jordan 6 Rings', price: 89.97, imageUrl: '/Arian/img/jordan rings.png' },
        { name: 'Jumpman MVP', price: 169.99, imageUrl: '/Arian/img/jumpman mvp.png' },

    ];

    res.json(shoes);
});

app.get('/api/subcat2', (req, res) => {
    const shoes = [
        { name: 'Nike Phantom Luna 2 Pro', price: 169.99, imageUrl: '/Arian/img/Nike phantom.png' },
        { name: 'Nike Phantom Luna 2 Elite LV8', price: 289.99, imageUrl: '/Arian/img/nike luna 2 elite.png' },
        { name: 'Nike Mercurial Vapor 15 Academy', price: 84.99, imageUrl: '/Arian/img/nike vapor.png' },
        { name: 'Nike Tiempo Legend 10 Elite', price: 249.99, imageUrl: '/Arian/img/nike tiempo.png' },
        { name: 'Nike Superfly 9 Elite Mercurial Dream Speed', price: 289.99, imageUrl: '/Arian/img/nike superfly.png' },
        { name: 'Nike Streetgato', price: 79.99, imageUrl: '/Arian/img/nike streetgato.png' },
        { name: 'Nike React Gato', price: 129.99, imageUrl: '/Arian/img/nike react.png' },
        { name: 'Nike Lunargato 2', price: 89.99, imageUrl: '/Arian/img/nike lunargato2.png' },
        { name: 'Nike Phantom GX 2 Club', price: 59.99, imageUrl: '/Arian/img/gx 2 club.png' },

    ];

    res.json(shoes);
})

app.get('/api/subcat3', (req, res) => {
    const shoes = [
        { name: 'Nike Air Max Plus', price: 189.99, imageUrl: '/Arian/img/Nike Air Max Plus.png' },
        { name: 'Luke 2 Bred', price: 77.99, imageUrl: '/Arian/img/Luke 2 Bred.png' },
        { name: 'Nike P-6000', price: 109.99, imageUrl: '/Arian/img/Nike P-6000.png' },
        { name: 'Jordan Max Aura 5', price: 64.99, imageUrl: '/Arian/img/Jordan Max.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Arian/img/Jordan.png' },
        { name: 'Nike Pegasus 40 Premium', price: 97.99, imageUrl: '/Arian/img/Pegasus.png' },
        { name: 'Jordan Stay Loyal 2', price: 59.99, imageUrl: '/Arian/img/Jordan Loyal.png' },
        { name: 'Nike G.T. Hustle 2', price: 139.97, imageUrl: '/Arian/img/Nike Hustle.png' },
        { name: 'Nike Court Vision Low', price: 79.99, imageUrl: '/Arian/img/Nike Court.png' },

    ];

    res.json(shoes);
})

app.get('/api/salesub1', (req, res) => {
    const shoes = [
        { name: 'Nike Air Max TW', price: 79.97, imageUrl: '/Dhakir/img/air-max-tw-herenschoenen-VMBzzV.png' },
        { name: 'Nike Revolution 6', price: 45.47, imageUrl: '/Dhakir/img/revolution-6-hardloopschoenen-heren-FgfhgR.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Dhakir/img/air-jordan-legacy-312-low-herenschoenen-b2dPSr.png' },
        { name: 'Jordan Max Aura 5', price: 64.99, imageUrl: '/Arian/img/Jordan Max.png' },
        { name: 'Air Jordan 1', price: 139.99, imageUrl: '/Dhakir/img/air-jordan-1-schoenen-T4DHrB.png' },
        { name: 'Air Jordan 2 Retro Low', price: 79.97, imageUrl: '/Dhakir/img/air-jordan-2-retro-low-herenschoenen-Q5b92T.png' },
        
    ];

    res.json(shoes);
})

app.get('/api/salesub2', (req, res) => {
    const shoes = [
        { name: 'Nike Air Max TW', price: 79.97, imageUrl: 'Dhakir/img/air-max-tw-herenschoenen-VMBzzV.png' },
        { name: 'Nike Revolution 6', price: 45.47, imageUrl: 'Dhakir/img/revolution-6-hardloopschoenen-heren-FgfhgR.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: 'Dhakir/img/air-jordan-legacy-312-low-herenschoenen-b2dPSr.png' },
        { name: 'Jordan Max Aura 5', price: 64.99, imageUrl: '/Arian/img/Jordan Max.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Arian/img/Jordan.png' },
        { name: 'Nike Pegasus 40 Premium', price: 97.99, imageUrl: '/Arian/img/Pegasus.png' },
        
    ];

    res.json(shoes);
})
 
app.get('/api/salesub3', (req, res) => {
    const shoes = [
        { name: 'Nike Air Max TW', price: 79.97, imageUrl: '/Dhakir/img/air-max-tw-herenschoenen-VMBzzV.png' },
        { name: 'Nike Revolution 6', price: 45.47, imageUrl: '/Dhakir/img/revolution-6-hardloopschoenen-heren-FgfhgR.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Dhakir/img/air-jordan-legacy-312-low-herenschoenen-b2dPSr.png' },
        { name: 'Jordan Max Aura 5', price: 64.99, imageUrl: '/Arian/img/Jordan Max.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Arian/img/Jordan.png' },
        { name: 'Nike Pegasus 40 Premium', price: 97.99, imageUrl: 'Dhakir/img/air-jordan-1-mid-herenschoenen-lQ6McN.png' },
        
    ];

    res.json(shoes);
})

app.get('/shoes-women', (req, res) => { // Dit zorgt ervoor dat er een route komt om get requests te krijgen voor /shoes-women
    res.setHeader('Content-type', 'application/json;charset=UTF-8'); //dit zorgt ervoor dat de JSON content 
    fs.readFile('data/nike.json', function(err, data) { //dit leest de content van de nike.json file in de data directie. 
        res.send(data); //wanneer de file is gelezen stuurt het de content van de file as response
    });
});

app.get('/jordans-women', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/jordans.json', function(err, data) {
        res.send(data);
    });
});

app.get('/airforce-women', (req, res) => {
    res.setHeader('Content-type', 'application/json;charset=UTF-8');
    fs.readFile('data/airforce.json', function(err, data) {
        res.send(data);
    });
});
    
app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}`);
});

