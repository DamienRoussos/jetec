import axios from 'axios';
import readline from 'node:readline'

async function apicall(postcode) {
  try {
    //  call the api
    const response = await axios.get(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
    );
    // if the request is succesful
    if (response.status === 200) {
      // get the first 10 restaurants
      const firstTenRestaurants = response.data.restaurants.slice(0, 10);
      // get the details required for the restaurants
      const firstTenRestaurantsDetails = firstTenRestaurants.map(
        (restaurant) => {
          const name = restaurant.name;
          // join the cuisines so that they all appear in the column of the table
          const cuisines = restaurant.cuisines
            .map((cuisine) => cuisine.name)
            .join(', ');
          const rating = restaurant.rating.starRating;
          // format the address to address name, postcode and city name
          const address = `${restaurant.address.firstLine} ${restaurant.address.postalCode} ${restaurant.address.city}`;
          return { name, cuisines, rating, address };
        }
      );
      // log a table showing the details requested
      console.table(firstTenRestaurantsDetails);
    } else {
      // throw error if the request is not succesful
      throw new Error('Something went wrong')
    }
  } catch (error) {
    // in case of an error log the error
    console.log(`Something went wrong: ${error.message}`);
  }
}

// validate the postcode belongs to the UK - return true or false
const postcodeValidation = postcode => {
  const regexp = /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;
  return regexp.test(postcode)
}

// configure the interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// prompt for the user
rl.question("Please provide a postcode (UK postcodes only)\n", userinput => {
  // convert to uppercase
  userinput = userinput.toUpperCase()
  // if the postcode belongs to the UK call the api function above otherwise inform the user that the postcode doesn't belong to the UK
  postcodeValidation(userinput) ? apicall(userinput) : console.log("This postcode doesn't belong to the UK")
  // exit
  rl.close()
})