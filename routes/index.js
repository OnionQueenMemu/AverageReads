const express = require("express");
const { asyncHandler } = require("../utils");
const db = require("../db/models");
const fetch = require('node-fetch');

const router = express.Router();


router.get("/home", asyncHandler(async (req, res) => {
  const books = await db.Book.findAll({ limit: 6 })

  const data = await fetch('https://type.fit/api/quotes')
  const quote = await data.json()
  const qod = quote[Math.floor(Math.random() * 1000)]

  res.cookie('stormCloudApi', process.env.STORM_GLASS_API_KEY, {'maxAge': 259200000})
  res.render("start-page", { books, qod });

}));

router.post("/weather", asyncHandler(async (req, res) => {
  const { lat, lng }= req.body
  const apiKey = process.env.WEATHER_API_KEY
  const reverseGeoUrl =
      'https://api.opencagedata.com/geocode/v1/json'
      + '?' + 'key=' + apiKey + '&q=' + encodeURIComponent(lat + ',' + lng)
      + '&pretty=1' + '&no_annotations=1';
  const data = await fetch(reverseGeoUrl)
  const location = await data.json()
  console.log(location)
  res.json(location)
}))

//homepage
router.get("/", (req, res) => {
  res.render("homepage");
});

//viewer
router.get("/viewer", (req, res) => {
  res.render("viewer");
});

//DB Populate Route
router.get('/db-populate', (req, res) => {
  res.render('db-populate');
})

//aboutus page
router.get('/about-us', (req, res) => {
  res.render('about-us')
})

router.get('/our-mission', (req, res) => {
  //placeholder for mission
  res.send('our-mission')
})

module.exports = {
  router
}