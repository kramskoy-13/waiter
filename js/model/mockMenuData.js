let randomWordToAdd = ["naturall", "with salt", "creamy", "baked", "with onion", "chocolate", "fried", "sliced", "spicy"],
    j = 0;

function generateMockData(c, num) {

    let mock = Array.from(Array(num), (_, x) => {

        let r = Math.floor(Math.random() * (randomWordToAdd.length - 0) + 0 * 100); /// <-- random word from randomWordToAdd array 
        let n = c.replace(/[\W|_]/g, " "); /// <-- cocktails_alc converts to cocktails alc

        ++j;

        return {
            name: [n, randomWordToAdd[r]].join(" "),
            id: [c, j].join("_"),
            price: Math.floor((Math.random() * (700 - 1) + 1) * 100) / 100,
            img: ["/img/", c, "/", c, x, ".jpg"].join(""),
            description: "Some description should be here. Some description should be here.Some description should be here.Some description should be here. Some description should be here.",
            ingredients: ["salt", "fish", "onion", "garlic", "lemon"]
        }
    });

    return mock

}

function createMockMenuData(num) {
    let categories = ["salads", "cocktails_alc", "cocktails_non_alc", "desserts", "first_courses", "fish_dishes", "meat_dishes"],
        mockMenuData = categories.map((c, i) => {

            let mock = generateMockData(c, num);

            return {
                name: c.replace(/_/g, " "),
                id: c,
                category: i,
                dishes: mock
            }
        });
    return mockMenuData;
};

function getMockDishesData(dish, num) {
    return generateMockData(dish, num);
};

export { createMockMenuData, getMockDishesData };
