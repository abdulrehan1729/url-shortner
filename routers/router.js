const router = require("express").Router();
const urlShortenController = require("../controller/urlShortner");

//GET API for redirecting to Original URL
router.get("/:code", async (req, res) => {
  await urlShortenController.getShortenUrl(req, res);
});

//POST API for creating short url from Original URL
router.post("/", (req, res) => {
  urlShortenController.createShortenUrl(req, res);
});

module.exports = router;
