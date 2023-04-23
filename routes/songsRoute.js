const express =require('express');
const router = express.Router();
const authMiddleware =require('../middlewares/authMiddleware');
const Song = require('../models/songModel');
const User = require('../models/userModel');
router.post('/get-all-songs',authMiddleware,async(req,res)=>{

    try {
        const songs= await Song.find();
        return res.status(200).send({ message: "songs fetched successfully", success: true, data:songs});
    } catch (error) {
        return res.status(500).send({ message: "Error fetching songs", success: true, data:error});
    }
})

router.post('/add-playlist',authMiddleware,async(req,res)=>{

    try {
        const user= await User.findById(req.body.userId);
        const existingPlaylists=user.playlists;
        existingPlaylists.push({
            name:req.body.name,
            songs:req.body.songs
        })
        const updatedUser = await User.findByIdAndUpdate(req.body.userId,{
            playlists:existingPlaylists},
            { new : true}
        );
        return res.status(200).send({ message: "playlists created successfully", success: true, data:updatedUser});
    } catch (error) {
        return res.status(500).send({ message: "Error fetching songs", success: true, data:error});
    }
})

router.post('/update-playlist',authMiddleware,async(req,res)=>{

    try {
        const user= await User.findById(req.body.userId);
        let existingPlaylists=user.playlists;
        existingPlaylists= existingPlaylists.map((playlist)=>{
            if(playlist.name === req.body.name){
                playlist.songs=req.body.songs;
            }
            return playlist;
        });
        const updatedUser = await User.findByIdAndUpdate(req.body.userId,{
            playlists:existingPlaylists},
            { new : true}
        );
        return res.status(200).send({ message: "playlists updated successfully", success: true, data:updatedUser});
    } catch (error) {
        return res.status(500).send({ message: "Error updated playlist", success: true, data:error});
    }
})

router.post('/delete-playlist',authMiddleware,async(req,res)=>{

    try {
        const user= await User.findById(req.body.userId);
        let existingPlaylists=user.playlists;
        existingPlaylists= existingPlaylists.filter((playlist)=>{
            if(playlist.name === req.body.name){
                return false;
            }
            return true;
        })
        const updatedUser = await User.findByIdAndUpdate(req.body.userId,{
            playlists:existingPlaylists},
            { new : true}
        );
        return res.status(200).send({ message: "playlists deleted successfully", success: true, data:updatedUser});
    } catch (error) {
        return res.status(500).send({ message: "Error deleting playlists", success: true, data:error});
    }
})

module.exports = router;