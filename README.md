# Documentation

1. **Clone the repository**:

```
git clone https://github.com/DamienRoussos/jetec
```
Change directory by running

```
cd jetec
```

2. **Install Node.js**: (Requires Node.js installed)  
Node.js version used is 20.12.2  
Install via the official website

```
https://nodejs.org/en/download
```  
*or using brew by running*

```
brew install node@20
```

3. **Install project dependencies**  
Install dependencies by running

```
npm install
```

4. **Running the project**  
Run the project by running

```
node index.js
```

3. **Unclear points**:

- Should I perform exception handling? There was no mention in the requirements therefore my assumption is that this api is always working. (Besides a 200 status check in the beginning). Furthermore any possibility that a postcode might have less than 10 restaurants? In that case we still run the same functionality or should we inform the user about it? - Who's the user in this case also?

- I initially hard coded the provided postcodes and presented a selector to the user but I switched to a postcode validation eventually to check for postcodes from the UK so that I don't limit the functionality. However what about postcodes that we might not be live yet? Should we still have the option of that postcode available and just notify the user that no restaurants are present or limit the choice to the list from the database?

4. **Next steps**:

- Data clean up and alignment in the structure. Some addresses have the city name it seems in the firstline field of the address, or escape characters like "\n" "\r" as part of the address. I assumed that I should return the address in this format (Address name, postcode , city name as a logival representation)

- If this is an internal application it could be sufficient as such but I can imagine that for partners or customers it would be nice to display the results in a web interface using the JET look and feel.

- Exception handling as I mentioned above to cover all use cases of errors. Consider also programatically calling the api again (on a given limit) in case of failure so that the user doesn't have to.