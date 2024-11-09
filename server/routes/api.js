import express from 'express';
import { getRestaurants, createRestaurant, deleteRestaurant } from '../data/restaurants.js';  // Import necessary functions

const router = express.Router();

// GET all restaurants
router.get('/restaurants', (req, res) => {
    const restaurants = getRestaurants();
    res.json(restaurants);
});

// Create a new restaurant
router.post('/restaurants', (req, res) => {
    
    console.log('Incoming data:', req.body); 
    
    try {
        const restaurant = createRestaurant(req.body); 
        res.status(201).json(restaurant); 
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

// DELETE a restaurant by ID
router.delete('/restaurants/:id', async (req, res) => {
    const restaurantId = req.params.id; 
    
    try {
        const result = await deleteRestaurant(restaurantId);  

        if (result.success) {
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
export { router as backendRouter };
