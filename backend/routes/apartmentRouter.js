const express = require("express");
const { createApartment , getApartments , getApartment , updateApartment , deleteApartment} = require("../middleware/apartment.js");
const {authenticate} = require("../middleware/auth.js");

const router = express.Router();

router.post("/create" , authenticate , createApartment);
router.get("/" , getApartments);
router.get("/:id" , getApartment);

module.exports = router;