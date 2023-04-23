import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        allSongs:[],
        currentSong:null,
        currentSongIndex:0,
        selectedPlaylist:null,
    },
    reducers:{
        SetUser:(state,action)=>{
            state.user = action.payload;
        },
        SetAllSongs:(state,action)=>{
            state.allSongs = action.payload;
        },
        SetCurrentSong:(state,action)=>{
            state.currentSong = action.payload;
        },
        SetCurrentSongIndex:(state,action)=>{
            state.currentSongIndex = action.payload;
        },
        SetSelectedPlaylist:(state,action)=>{
            state.selectedPlaylist = action.payload;
        },
    }
})

export const { SetUser,SetAllSongs,SetCurrentSong,SetCurrentSongIndex,SetSelectedPlaylist} = userSlice.actions;