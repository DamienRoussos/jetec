// const inquirer = require('inquirer');
// const axios = require('axios').default;
// const inquirer = require('')
import axios from 'axios';
import { select } from '@inquirer/prompts';

const postcodes = [
  'CT12EH',
  'BS14DJ',
  'L40TH',
  'NE97TY',
  'SW1A1AA',
  'CF118AZ',
  'M160RA',
  'EH11RE',
  'BN11AE',
  'CB74DL',
  'LS27HY',
  'G38AG',
  'PL40DW',
  'B263QJ',
  'DH45QZ',
  'BT71NN',
];

async function apicall(postcode) {
  try {
    const response = await axios.get(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
    );
    if (response.status === 200) {
      const firstTenRestaurants = response.data.restaurants.slice(0, 10);
      const firstTenRestaurantsDetails = firstTenRestaurants.map(
        (restaurant) => {
          const name = restaurant.name;
          const cuisines = restaurant.cuisines
            .map((cuisine) => cuisine.name)
            .join(', ');
          const rating = restaurant.rating.starRating;
          const address = `${restaurant.address.firstLine} ${restaurant.address.postalCode} ${restaurant.address.city}`;
          return { name, cuisines, rating, address };
        }
      );

      console.table(firstTenRestaurantsDetails);
    } else {
      console.log(`No restaurants found for the postcode ${postcode}`);
    }
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
  }
}

const userInput = await select({
  message: 'Please select a postcode',
  choices: postcodes.map((code) => {
    return { value: code };
  }),
  loop: false,
});

apicall(userInput);
