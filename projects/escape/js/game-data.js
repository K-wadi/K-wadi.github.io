const gameData = {
    rooms: {
        room1: {
            name: "The Study",
            description: "A dimly lit study room with antique furniture and mysterious objects.",
            image: "img/room1.jpg",
            items: [
                {
                    id: "key",
                    name: "Golden Key",
                    description: "A mysterious golden key with strange markings.",
                    image: "img/key.jpg",
                    isCollectible: true,
                    isUsable: true
                },
                {
                    id: "book",
                    name: "Ancient Book",
                    description: "A leather-bound book with cryptic symbols.",
                    image: "img/book.jpg",
                    isCollectible: true,
                    isUsable: true
                },
                {
                    id: "lamp",
                    name: "Oil Lamp",
                    description: "An old oil lamp that might reveal hidden messages.",
                    image: "img/lamp.jpg",
                    isCollectible: true,
                    isUsable: true
                }
            ],
            puzzles: [
                {
                    id: "book_puzzle",
                    type: "combination",
                    description: "The book seems to have a hidden mechanism.",
                    solution: "1234",
                    hint: "Look for numbers in the book's pages.",
                    requiredItems: ["book"]
                },
                {
                    id: "lamp_puzzle",
                    type: "pattern",
                    description: "The lamp reveals a pattern on the wall.",
                    solution: ["top", "right", "bottom", "left"],
                    hint: "Follow the light's reflection.",
                    requiredItems: ["lamp"]
                }
            ],
            exits: {
                north: "room2",
                east: null,
                south: null,
                west: null
            }
        },
        room2: {
            name: "The Library",
            description: "A vast library with towering bookshelves and a central desk.",
            image: "img/room2.jpg",
            items: [
                {
                    id: "map",
                    name: "Old Map",
                    description: "A detailed map of the building.",
                    image: "img/map.jpg",
                    isCollectible: true,
                    isUsable: true
                },
                {
                    id: "compass",
                    name: "Magnetic Compass",
                    description: "A compass that seems to point to something specific.",
                    image: "img/compass.jpg",
                    isCollectible: true,
                    isUsable: true
                }
            ],
            puzzles: [
                {
                    id: "map_puzzle",
                    type: "maze",
                    description: "The map reveals a hidden path.",
                    solution: ["up", "right", "down", "left", "up"],
                    hint: "Follow the compass direction.",
                    requiredItems: ["map", "compass"]
                }
            ],
            exits: {
                north: null,
                east: "room3",
                south: "room1",
                west: null
            }
        },
        room3: {
            name: "The Laboratory",
            description: "A mysterious laboratory with strange equipment and formulas.",
            image: "img/room3.jpg",
            items: [
                {
                    id: "formula",
                    name: "Chemical Formula",
                    description: "A complex chemical formula written on a piece of paper.",
                    image: "img/formula.jpg",
                    isCollectible: true,
                    isUsable: true
                },
                {
                    id: "vial",
                    name: "Mysterious Vial",
                    description: "A vial containing a glowing liquid.",
                    image: "img/vial.jpg",
                    isCollectible: true,
                    isUsable: true
                }
            ],
            puzzles: [
                {
                    id: "chemical_puzzle",
                    type: "sequence",
                    description: "The formula needs to be completed.",
                    solution: ["red", "blue", "green"],
                    hint: "Mix the colors in the correct order.",
                    requiredItems: ["formula", "vial"]
                }
            ],
            exits: {
                north: null,
                east: null,
                south: null,
                west: "room2"
            }
        }
    },
    hints: [
        "Check the book's pages carefully.",
        "The lamp might reveal something on the wall.",
        "The compass points to important locations.",
        "The chemical formula needs specific colors.",
        "The map shows a hidden path."
    ],
    gameStart: {
        room: "room1",
        timeLimit: 1800, // 30 minutes in seconds
        maxHints: 3
    }
}; 