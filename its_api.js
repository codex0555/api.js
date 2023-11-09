const axios = require('axios');
const express = require('express');
const app = express();

const options = {
  method: 'GET',
  url: 'https://myanimelist.p.rapidapi.com/anime/',
  headers: {
    'X-RapidAPI-Key': '5af31ac484msh4c94ae035d36213p12339fjsnd0beffac615f',
    'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
  }
};

// Function to fetch anime details based on ID
async function fetchAnimeDetails(id) {
  const requestUrl = options.url + id;
  try {
    const response = await axios.get(requestUrl, { headers: options.headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch anime details');
  }
}

// Endpoint to get anime details by ID
app.get('/anime/:id', async (req, res) => {
  const animeId = req.params.id;
  try {
    const animeDetails = await fetchAnimeDetails(animeId);
    res.json(animeDetails);
  } catch (error) {
    res.status(500).send('Error fetching anime details');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
