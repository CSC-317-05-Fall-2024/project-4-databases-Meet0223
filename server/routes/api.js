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
router.delete('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id; 
    
    const result = deleteRestaurant(restaurantId); 
    
    if (result.success) {
        res.status(200).json(result); 
    } else {
        res.status(404).json(result); 
    }
});
export { router as backendRouter };
