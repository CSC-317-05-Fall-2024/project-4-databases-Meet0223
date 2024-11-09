// Fill this in
import { pool } from '../config/database.js';

// Get a list of restaurants
const getRestaurants = async () => {
    try {
      const result = await pool.query('SELECT * FROM restaurants');
      return result.rows;  // Return the list of restaurants
    } catch (error) {
      console.error('Error getting restaurants:', error);
      throw new Error('Failed to retrieve restaurants');
    }
  };


// Get a restaurant by id
const getRestaurant = async (id) => {
  try {
      const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
      return result.rows[0]; // Return the restaurant if found, else undefined
      
  } catch (error) {
      console.error('Error getting restaurant:', error);
      throw new Error('Failed to retrieve restaurant');
  }
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
  try {
      // Check if there are any rows in the table
      const { rowCount } = await pool.query('SELECT 1 FROM restaurants LIMIT 1');

      // If no rows, reset the sequence
      if (rowCount === 0) {
          await pool.query('ALTER SEQUENCE restaurants_id_seq RESTART WITH 1');
      }

      // Insert the new restaurant
      const result = await pool.query(
          'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
          [newRestaurant.name, newRestaurant.phone, newRestaurant.address, newRestaurant.photo]
      );

      return result.rows[0]; // Return the newly created restaurant
  } catch (error) {
      console.error('Error creating restaurant:', error);
      throw new Error('Failed to create restaurant');
  }
};
  


// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    const query = 'DELETE FROM restaurants WHERE id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);

        if (result.rowCount > 0) {
            return { success: true };  // Restaurant deleted successfully
        } else {
            return { success: false, message: 'Restaurant not found' };  // No restaurant found with this id
        }
    } catch (error) {
        console.error('Error deleting restaurant from DB:', error);
        throw error;
    }
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };