# Documentation

1. **Clone the repository**:

```
git clone https://github.com/DamienRoussos/jetec
```

2. **Running**: (Requires Node.js installed) - MORE SPECIFIC
   Node.js version used is 20.12.2
   Install via the official website

```
https://nodejs.org/en/download
```

or using brew by running

```
brew install node@20
```

Change directory by running

```
cd jetec
```

Install dependencies by running

```
npm install
```

Run the project by running

```
node index.js
```

3. **Unclear points**:

- Should I perform exception handling? There was no mention in the requirements therefore my assumption is that the api is always working. (Besides a 200 status check in the beginning).
- I have the safety of providing a list of hardcoded postcodes for a better UX with a selector, but it has the limitation of not accepting any other UK postcode - which was given as an option in the description of the assesment. (I explain my thought process on this below as well)

4. **Next steps**:

- Data check and alignment in the structure. Some addresses have the city name it seems in the firstline field of the address, or escape characters like "\n" "\r" as part of the address.

- Hardcoding the postcodes limits the user's options, as a next step I can imagine I can use the same approach but retrieving the full list of available postcodes from a database. We shouldn't have a postcode where we don't provide a service either way.
