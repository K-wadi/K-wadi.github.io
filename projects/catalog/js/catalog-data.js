const catalogData = {
    categories: [
        'Running',
        'Basketball',
        'Casual',
        'Formal',
        'Training'
    ],
    brands: [
        'Nike',
        'Adidas',
        'Puma',
        'New Balance',
        'Under Armour'
    ],
    products: [
        {
            id: 1,
            title: 'Nike Air Zoom Pegasus',
            brand: 'Nike',
            category: 'Running',
            price: 129.99,
            image: 'img/nike-pegasus.jpg',
            description: 'The Nike Air Zoom Pegasus is perfect for runners who want a tried-and-true shoe that's light, fast and responsive.',
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
            isNew: true
        },
        {
            id: 2,
            title: 'Adidas Ultraboost',
            brand: 'Adidas',
            category: 'Running',
            price: 179.99,
            image: 'img/adidas-ultraboost.jpg',
            description: 'Experience epic energy with the Adidas Ultraboost. These running shoes deliver unmatched comfort and responsive cushioning.',
            sizes: [7, 8, 9, 10, 11],
            isNew: false
        },
        {
            id: 3,
            title: 'Jordan XXXVI',
            brand: 'Nike',
            category: 'Basketball',
            price: 184.99,
            image: 'img/jordan-xxxvi.jpg',
            description: 'The Jordan XXXVI features a minimal yet durable upper with reinforcement in high-wear areas.',
            sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
            isNew: true
        },
        {
            id: 4,
            title: 'Puma Suede Classic',
            brand: 'Puma',
            category: 'Casual',
            price: 69.99,
            image: 'img/puma-suede.jpg',
            description: 'The Puma Suede Classic is a timeless sneaker that never goes out of style.',
            sizes: [6, 7, 8, 9, 10, 11],
            onSale: true,
            salePrice: 49.99
        },
        {
            id: 5,
            title: 'New Balance 574',
            brand: 'New Balance',
            category: 'Casual',
            price: 79.99,
            image: 'img/nb-574.jpg',
            description: 'The New Balance 574 is a classic lifestyle shoe that provides all-day comfort.',
            sizes: [7, 8, 9, 10, 11, 12],
            onSale: true,
            salePrice: 59.99
        },
        {
            id: 6,
            title: 'Under Armour HOVR',
            brand: 'Under Armour',
            category: 'Training',
            price: 99.99,
            image: 'img/ua-hovr.jpg',
            description: 'The Under Armour HOVR provides a zero gravity feel to maintain energy return and help eliminate impact.',
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10],
            isNew: true
        }
    ]
}; 