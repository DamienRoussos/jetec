const axios = require('axios').default;

async function apicall() {
  try {
    const response = await axios.get(
      'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/CT12EH'
    );
    const firstTenRestaurants = response.data.restaurants.slice(0, 10);
    const firstTenRestaurantsDetails = firstTenRestaurants.map((restaurant) => {
      const name = restaurant.name;
      const cuisines = restaurant.cuisines.map((cuisine) => cuisine.name);
      const rating = restaurant.rating.starRating;
      const address = `${restaurant.address.firstLine} ${restaurant.address.postalCode} ${restaurant.address.city}`;
      return { name, cuisines, rating, address };
    });

    console.table(firstTenRestaurantsDetails);

  } catch (error) {
    console.log(error);
  }
}

apicall();
