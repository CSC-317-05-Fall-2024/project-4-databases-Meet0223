/* Initialize the data in the DB */
import { pool } from './database.js';

// Drop tables in the correct order
const dropTables = async () => {
    await pool.query(`DROP TABLE IF EXISTS reviews`);
    await pool.query(`DROP TABLE IF EXISTS restaurants`);
};

// Create tables
const createTables = async () => {
    await pool.query(`
        CREATE TABLE restaurants (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            address VARCHAR(100),
            photo VARCHAR(255)
        );
    `);

    await pool.query(`
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            rating INTEGER NOT NULL,
            content TEXT,
            restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
        );
    `);
};

const insertData = async () => {
    const restaurantIds = [];

    const restaurantRes = await pool.query(`
        INSERT INTO restaurants (name, phone, address, photo)
        VALUES 
            ('The Food Place', '(415) 123-4567', '123 Main St, San Francisco, CA 94132', 'https://picsum.photos/150/150'),
            ('Pizza Heaven', '(415) 234-5678', '456 Elm St, San Francisco, CA 94132', 'https://picsum.photos/150/150')
        RETURNING id;
    `);

    restaurantRes.rows.forEach(row => restaurantIds.push(row.id));

    await pool.query(`
        INSERT INTO reviews (rating, content, restaurant_id)
        VALUES 
            (5, 'Amazing food and great atmosphere!', $1),
            (4, 'Good food but a bit pricey.', $1),
            (3, 'Average pizza, nothing special.', $2),
            (5, 'Best pizza in town!', $2);
    `, [restaurantIds[0], restaurantIds[1]]);
};


const seed = async () => {
    await dropTables();
    await createTables();
    await insertData();
    console.log("Database seeded successfully!");
    pool.end();
};

seed().catch(error => {
    console.error("Error seeding the database:", error);
    pool.end();
});