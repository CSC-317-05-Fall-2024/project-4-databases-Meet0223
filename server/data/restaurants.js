// Fill this in
let restaurantData = [
    {
        "id": 0,
        "name": "The Food Place",
        "phone": "(415) 123-4567",
        "address": "123 Main St, San Francisco, CA 94132",
        "photo": "https://picsum.photos/150/150"
    },
    {
        "id": 1,
        "name": "Pizza Heaven",
        "phone": "(415) 234-5678",
        "address": "456 Elm St, San Francisco, CA 94132",
        "photo": "https://picsum.photos/150/150"
    },
    {
        "id": 2,
        "name": "Sushi Express",
        "phone": "(415) 345-6789",
        "address": "789 Pine St, San Francisco, CA 94132",
        "photo": "https://picsum.photos/150/150"
    }
];

export default { restaurantData };

let lastId = restaurantData.length - 1;

const getNextId = () => {
    lastId += 1;
    return lastId;
}

// Get a list of restaurants
const getRestaurants = () => {
    return restaurantData;
};


// Get a restaurant by id
const getRestaurant = (id) => {
    const restaurant = restaurantData.find(r => r.id === parseInt(id)); // Find restaurant by ID
    return restaurant;
};

// Create a new restaurant entry
const createRestaurant = (newRestaurant) => {
    
    if (!newRestaurant || !newRestaurant.name) {
        throw new Error("Invalid restaurant data: 'name' is required");
    }

    const id = getNextId(); 
    const restaurant = {
        id,                    
        name: newRestaurant.name,
        phone: newRestaurant.phone,
        address: newRestaurant.address,
        photo: newRestaurant.photo
    };

    
    restaurantData.push(restaurant);
    return restaurant; 
};


// Delete a restaurant by id
const deleteRestaurant = (id) => {
    const restaurantId = Number(id); 

    
    const index = restaurantData.findIndex(restaurant => restaurant.id === restaurantId);

    
    if (index === -1) {
        return { message: 'Restaurant not found', success: false };
    }

    
    restaurantData.splice(index, 1);
    
    return { message: 'Restaurant deleted successfully', success: true, restaurantData };
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };