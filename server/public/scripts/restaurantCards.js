document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteRestaurantCard);
    });
});

async function deleteRestaurantCard(event) {
    const card = event.target.closest('.restaurant-card'); 
    if (card) {
        const restaurantId = card.getAttribute('data-id'); 
        console.log(`Deleting restaurant ID: ${restaurantId}`); 

        try {
            const response = await fetch(`/api/restaurants/${restaurantId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Restaurant with ID ${restaurantId} deleted successfully.`);
                card.remove(); 
            } else {
                console.error('Failed to delete restaurant:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    }
}
