import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant } from './data/restaurants.js';
import { backendRouter } from './routes/api.js';
//import restaurantDataObj from './data/restaurants.js';
//const restaurantData = restaurantDataObj.restaurantData;

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/restaurants', (req, res) => {
    const restaurants = getRestaurants(); 
    res.render('restaurants', { restaurantData: restaurants });  
});

app.get('/new-restaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new-restaurants.html'));  
});

app.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;  
    const restaurant = getRestaurant(restaurantId); 
    
    if (restaurant) {
        res.render('restaurant-details', { restaurant });  
    } else {
        res.status(404).send('Restaurant not found');
    }
});

app.use('/api', backendRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});