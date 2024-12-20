import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, getReviewsForRestaurant } from './data/restaurants.js';
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

app.get('/restaurants', async (req, res) => {
    try {
      const restaurants = await getRestaurants();  
      res.render('restaurants', { restaurantData: restaurants });  
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      res.status(500).send('Something went wrong!');
    }
  });

app.get('/new-restaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new-restaurants.html'));  
});

app.get('/restaurants/:id', async (req, res) => {
    const restaurantId = req.params.id;

    try {
        const restaurant = await getRestaurant(restaurantId);
        const reviews = await getReviewsForRestaurant(restaurantId);

        if (restaurant) {
            res.render('restaurant-details', { restaurant, reviews }); 
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/api', backendRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});