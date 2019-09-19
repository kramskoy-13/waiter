export default function createMockMenuData(num) {
	let categories = ["salads","cocktails_alc","cocktails_non_alc","desserts","first_courses","fish_dishes","meat_dishes"];	
	let mockMenuData = categories.map( (c,i) => {

		let dishes =  Array.from(Array(num), (_,x) => {
			return {
				name: [c,x].join(" "),
				id: [c,x].join("_"),
				price: Math.floor( (Math.random() * (700 - 1) + 1) * 100 ) / 100,
				img: ["/img/", c, "/", c, x, ".jpg"].join(""),
				description: "Some description should be here. Some description should be here.Some description should be here.Some description should be here. Some description should be here.",
                ingredients: ["salt", "fish", "onion", "garlic", "lemon"]
			}
		});

		return {
			name: c.replace(/_/g, " "),
			id: c,
			category:i,
			dishes
		}
	});

	console.log("mock data", mockMenuData)

	return mockMenuData;
 };

