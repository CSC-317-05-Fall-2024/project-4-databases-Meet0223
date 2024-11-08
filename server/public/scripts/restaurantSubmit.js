const handleSubmit = async (event) => {
    event.preventDefault(); 
    const form = event.target; 
    const formData = new FormData(form); 

    const newRestaurant = {
        name: formData.get('name'), 
        phone: formData.get('phone'), 
        address: formData.get('address'),
        photo: formData.get('photo'),
    };

    try {
        const response = await fetch('/api/restaurants', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(newRestaurant), 
        });

        if (response.ok) {
            console.log('Restaurant created successfully!');
            window.location.href = '/restaurants'; 
        } else {
            console.error('Failed to create restaurant:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating restaurant:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('restaurant-form'); 
    form.addEventListener('submit', handleSubmit); 
});
