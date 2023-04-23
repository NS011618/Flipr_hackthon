const express =require('express');
const router = express.Router();
const authMiddleware =require('../middlewares/authMiddleware');
const Song = require('../models/songModel');

router.post('/get-all-songs',authMiddleware,async(req,res)=>{

    try {
        const songs= await Song.find();
        return res.status(200).send({ message: "songs fetched successfully", success: true, data:songs});
    } catch (error) {
        return res.status(500).send({ message: "Error fetching songs", success: true, data:error});
    }
})

module.exports = router;