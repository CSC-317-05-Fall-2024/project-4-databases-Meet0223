/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        await pool.query(`
        CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address VARCHAR(255),
        photo TEXT
        );
        `);
        console.log("Tables created successfully.");
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        await pool.query(`
        INSERT INTO restaurants (name, phone, address, photo)
        VALUES
            ('The Food Place', '(415) 123-4567', '123 Main St, San Francisco, CA 94132', 'https://picsum.photos/150/150'),
            ('The Blue Lobster', '987-654-3210', '456 Oak Avenue', 'https://picsum.photos/150/150'),
            ('Cafe Milano', '555-123-4567', '789 Elm Road', 'https://picsum.photos/150/150');
        `);
    console.log("Data inserted successfully.");
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
