const readline = require('node:readline');
const axios = require('axios').default;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const postcodes = ["CT12EH", "BS14DJ", "L40TH", "NE97TY", "SW1A1AA", "CF118AZ", "M160RA", "EH11RE", "BN11AE", "CB74DL", "LS27HY", "G38AG", "PL40DW", "B263QJ", "DH45QZ", "BT71NN"]

async function apicall(postcode) {
  try {
    const response = await axios.get(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
    );
    const firstTenRestaurants = response.data.restaurants.slice(0, 10);
    const firstTenRestaurantsDetails = firstTenRestaurants.map((restaurant) => {
      const name = restaurant.name;
      const cuisines = restaurant.cuisines.map((cuisine) => cuisine.name).join();
      const rating = restaurant.rating.starRating;
      const address = `${restaurant.address.firstLine} ${restaurant.address.postalCode} ${restaurant.address.city}`;
      return { name, cuisines, rating, address };
    });

    console.table(firstTenRestaurantsDetails);

  } catch (error) {
    console.log(error);
  }
}


postcodes.forEach(postcode => console.log(postcode))
rl.question("Please select a postcode from the list above\n", postcode => {
  apicall(postcode)
  rl.close()
})
// apicall();
