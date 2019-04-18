const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");


  
// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../../public/images/',
  limits: {
    fileSize: 10000000
  }
});

//
const users = require("./users.js");
const User = users.model;
//
const petSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  species: String,
  path: String,
  description: String,
  attributes: [String],
  adopted: Boolean,
});

const Pet= mongoose.model('Pet', petSchema);

// upload pet
router.post("/", upload.single('photo'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const pet = new Pet({
      user: null,
      name: req.body.name,
      species: req.body.species,
      path: '/images/' +  req.file.filename,
      attributes: req.body.attributes,
      description: req.body.description,
      adopted: req.body.adopted,
    });
    try {
      await pet.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return photos
    try {
      let pets = await Pet.find({
        user: req.user
      }).sort({
        created: -1
      });
      return res.send(pets);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/all", async (req, res) => {
    try {
      let pets = await Pet.find().sort({
        created: -1
      }).populate('user');
      return res.send(pets);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.put("/adopt/:id", auth.verifyToken, User.verify, async(req, res) => {
    try {
      let pet = await Pet.findOne( {
        _id: req.params.id
      });
      pet.user = req.user;
      await pet.save();
      res.sendStatus(200);
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }

  });

  router.put('/:id', auth.verifyToken, User.verify, async (req,res) => {
    try {
      let pet = await Pet.findOne({
        _id: req.params.id
      });
      pet.name = req.body.name;
      pet.species = req.body.species;
      pet.description = req.body.description;
      pet.attributes = req.body.attributes;
      pet.adopted = req.body.adopted;
      await pet.save();
      res.sendStatus(200);
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });




  
module.exports = {
    model: Pet,
    routes: router,
  }
