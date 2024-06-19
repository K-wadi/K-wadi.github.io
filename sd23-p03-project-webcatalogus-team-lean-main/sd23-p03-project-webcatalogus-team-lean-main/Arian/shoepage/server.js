// Importeer de express-module om een HTTP-server te maken en de cors-module voor Cross-Origin Resource Sharing
import express from 'express';
import cors from 'cors';

// Initialiseer een express-applicatie
const app = express();
// Kies een poort waarop de server zal luisteren
const port = 3600; // Je kan elke port gebruiken die beschikbaar is
app.use(cors());

// Handler voor de rootroute, geeft een welkomstbericht terug
app.get('/', (req, res) => {
    
    res.send('Welcome to the Shoe Store! Visit /api/shoes to see our products.');
});

// Bestaande route voor het /api/shoes-eindpunt, geeft een lijst van schoenen terug
app.get('/api/shoes', (req, res) => {
    // Voorbeeldgegevens van schoenen
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

     // Stuur de lijst met schoenen als JSON terug naar de client
    res.json(shoes);
});

// Bestaande route voor het /api/subcat1-eindpunt, geeft een lijst van schoenen terug
app.get('/api/subcat1', (req, res) => {
    // Voorbeeldgegevens van schoenen
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

     // Stuur de lijst met schoenen als JSON terug naar de client
    res.json(shoes);
});

// Bestaande route voor het /api/subcat2-eindpunt, geeft een lijst van schoenen terug
app.get('/api/subcat2', (req, res) => {
    // Voorbeeldgegevens van schoenen
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

     // Stuur de lijst met schoenen als JSON terug naar de client
    res.json(shoes);
})

// Bestaande route voor het /api/subcat3-eindpunt, geeft een lijst van schoenen terug
app.get('/api/subcat3', (req, res) => {
    // Voorbeeldgegevens van schoenen
    const shoes = [
        { name: 'Tatum 2', price: 129.99, imageUrl: '/Arian/img/tatum 2.png' },
        { name: 'KD16', price: 159.99, imageUrl: '/Arian/img/kd16.png' },
        { name: 'JA 1', price: 109.99, imageUrl: '/Arian/img/ja 1.png' },
        { name: 'Zion 3', price: 149.99, imageUrl: '/Arian/img/zion 3.png' },
        { name: 'LeBron XXI Freshwater', price: 199.99, imageUrl: '/Arian/img/Lebron freshwater.png' },
        { name: 'Nike Precision 6', price: 74.99, imageUrl: '/Arian/img/precision 6.png' },
        { name: 'Giannis Freak 5 ASW', price: 134.99, imageUrl: '/Arian/img/giannis freak.png' },
        { name: 'LeBron Witness 8', price: 119.99, imageUrl: '/Arian/img/Lebron witness.png' },
        { name: 'Zion 3 Gen Zion', price: 97.49, imageUrl: '/Arian/img/zion gen.png' },
        
    ];

     // Stuur de lijst met schoenen als JSON terug naar de client
    res.json(shoes);
})

app.get('/api/sale', (req, res) => {
    const shoes = [
        { name: 'Nike Air Max TW', price: 79.97, imageUrl: '/Dhakir/img/air-max-tw-herenschoenen-VMBzzV.png' },
        { name: 'Nike Revolution 6', price: 45.47, imageUrl: '/Dhakir/img/revolution-6-hardloopschoenen-heren-FgfhgR.png' },
        { name: 'Nike Tech Hera', price: 83.99, imageUrl: '/Dhakir/img/tech-hera-damesschoenen-qHsrRp.png'},
        { name: 'Jordan Max Aura 5', price: 64.99, imageUrl: '/Arian/img/Jordan Max.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Arian/img/Jordan.png' },
        { name: 'Nike Pegasus 40 Premium', price: 97.99, imageUrl: '/Dhakir/img/air-jordan-1-mid-herenschoenen-lQ6McN.png'},
        
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
        { name: 'Nike Air Max TW', price: 79.97, imageUrl: '/Dhakir/img/air-max-tw-herenschoenen-VMBzzV.png' },
        { name: 'Nike Revolution 6', price: 45.47, imageUrl: '/Dhakir/img/revolution-6-hardloopschoenen-heren-FgfhgR.png' },
        { name: 'Air Jordan Legacy 312 Low', price: 83.99, imageUrl: '/Dhakir/img/air-jordan-legacy-312-low-herenschoenen-b2dPSr.png' },
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
        { name: 'Nike Pegasus 40 Premium', price: 97.99, imageUrl: '/Dhakir/img/air-jordan-1-mid-herenschoenen-lQ6McN.png' },
        
    ];

    res.json(shoes);
})


// Start de server en luister naar verzoeken op de opgegeven poort


app.get('/api/sport', (req, res) => {
    const shoes = [
        { name: 'Nike Air Zoom Pegasus 38', price: 119.99, imageUrl: 'https://i.pinimg.com/236x/99/cf/ac/99cfac32d53781227b762cf28802acec.jpg' },
        { name: 'Nike Metcon 6', price: 130.99, imageUrl: 'https://i.pinimg.com/236x/e2/1f/10/e21f10c445815891921bb50be2c7ae64.jpg' },
        { name: 'Nike React Infinity Run Flyknit', price: 160.99, imageUrl: 'https://i.pinimg.com/236x/51/d6/30/51d63070e1a6a018b5bc03a5d837be59.jpg' },
        { name: 'Nike Air Zoom Terra Kiger 7', price: 140.99, imageUrl: 'https://i.pinimg.com/236x/d4/fd/78/d4fd7875d5cb080438e7cf8db48b10cd.jpg' },
        { name: 'Nike Phantom GT Elite FG', price: 250.99, imageUrl: 'https://i.pinimg.com/236x/48/ec/fa/48ecfab7ddf236d3e25b2172e9b6c162.jpg' },
        { name: 'Nike Tiempo Legend 8 Pro FG', price: 120.99, imageUrl: 'https://i.pinimg.com/236x/8f/d1/fd/8fd1fd65759069882bb33b609bd1b310.jpg' },
        { name: 'Nike LeBron 18', price: 200.99, imageUrl: 'https://i.pinimg.com/236x/5e/08/42/5e0842acb7cf5283b4237ab98248e00f.jpg' },
        { name: 'Nike Kyrie 7', price: 130.97, imageUrl: 'https://i.pinimg.com/236x/75/97/29/759729a8973cce0a312a9296f9521515.jpg' },
        { name: 'Nike Air Jordan 1 High', price: 170.99, imageUrl: 'https://i.pinimg.com/236x/b9/4e/0a/b94e0a343dd73647f2cb320ba650ea8d.jpg' },
        
    ];

    res.json(shoes);
});

app.get('/api/sportcat1', (req, res) => {
    const shoes = [
        { name: 'Nike Swift Run', price: 100.99, imageUrl: 'https://i.pinimg.com/236x/92/e7/47/92e74718f3aeb21a8f46082ecbdb6f3b.jpg' },
        { name: 'Nike Glide Path', price: 110.99, imageUrl: 'https://i.pinimg.com/236x/33/7c/9f/337c9fb03a534fa53b864d96d4e29d4a.jpg' },
        { name: 'Nike Pace Challenger', price: 120.99, imageUrl: 'https://i.pinimg.com/236x/c5/a1/a1/c5a1a194888de9faea1a46b3562d2a15.jpg' },
        { name: 'Nike Trail Blazer', price: 130.99, imageUrl: 'https://i.pinimg.com/236x/f4/66/6e/f4666ea8561f33b61a4c40a0a3784ae6.jpg' },
        { name: 'Nike Sprint Master', price: 140.99, imageUrl: 'https://i.pinimg.com/236x/ec/9b/a2/ec9ba2b2757e411037a2768ed74f4ab8.jpg' },
        { name: 'Nike Marathon Elite', price: 120.99, imageUrl: 'https://i.pinimg.com/236x/18/5f/c2/185fc26556dd5b36d38fc4985fae8a21.jpg' },
        { name: 'Nike Velocity Spike', price: 200.99, imageUrl: 'https://i.pinimg.com/236x/53/c4/7c/53c47c394d77f71cb1a6a9521314cded.jpg' },
        { name: 'Nike Endurance Pro', price: 130.97, imageUrl: 'https://i.pinimg.com/236x/f7/47/74/f7477424af4d6d58713968366f89cdf5.jpg' },
        { name: 'Nike Race Leader', price: 170.99, imageUrl: 'https://i.pinimg.com/236x/26/04/24/2604246b6e7b57ea1e93346cf88b3d82.jpg' },
        
    ];

    res.json(shoes);
});

app.get('/api/sportcat2', (req, res) => {
    const shoes = [
        { name: 'Nike Flex Trainer ', price: 80.99, imageUrl: 'https://i.pinimg.com/236x/98/53/9a/98539a667e967a9899f734e25f1e5f88.jpg' },
        { name: 'Nike Free Metcon', price: 100.99, imageUrl: 'https://i.pinimg.com/236x/89/bd/99/89bd9961b74b5dacdc14f59c442a4d2d.jpg' },
        { name: 'Nike Air Zoom SuperRep', price: 120.99, imageUrl: 'https://i.pinimg.com/236x/0b/aa/d2/0baad2eaad59d46fafecd3cd6ae845ef.jpg' },
        { name: 'Nike React Metcon', price: 130.99, imageUrl: 'https://i.pinimg.com/236x/3e/d3/9e/3ed39e8574383550c9f0ac23efa280dd.jpg' },
        { name: 'Nike Air Max Alpha Trainer', price: 90.99, imageUrl: 'https://i.pinimg.com/236x/66/01/9d/66019da7e6db6d4a7cd477705423745c.jpg' },
        { name: 'Nike In-Season TR', price: 70.99, imageUrl: 'https://i.pinimg.com/236x/18/5f/c2/185fc26556dd5b36d38fc4985fae8a21.jpg' },
        { name: 'Nike Renew Fusion', price: 85.99, imageUrl: 'https://i.pinimg.com/236x/53/c4/7c/53c47c394d77f71cb1a6a9521314cded.jpg' },
        { name: 'Nike Air Zoom Fearless', price: 110.97, imageUrl: 'https://i.pinimg.com/236x/f7/47/74/f7477424af4d6d58713968366f89cdf5.jpg' },
        { name: 'Nike Legend Essential', price: 75.99, imageUrl: 'https://i.pinimg.com/236x/26/04/24/2604246b6e7b57ea1e93346cf88b3d82.jpg' },
        
    ];

    res.json(shoes);
});

app.get('/api/sportcat3', (req, res) => {
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


