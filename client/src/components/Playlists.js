import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedPlaylist, SetSelectedPlaylistForEdit, SetUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";

function Playlists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.user
  );
  const allPlaylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user.playlists,
  ];

  const onDelete = async(name)=>{
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/songs/delete-playlist',{
          name,
      },{
          headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
          }
      })
      dispatch(HideLoading());
      if(response.data.success){
          toast.success("Playlist delete successfully");
          dispatch(SetSelectedPlaylist({
            name:'All Songs',
            songs:allSongs,
          }))
          dispatch(SetUser(response.data.data));        
          
      }else{
          toast.error(response.data.message);
      }
  } catch (error) {
      dispatch(HideLoading());
      toast.error('something went wrong');
  }
  };

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlaylists[0]));
    }
  }, [selectedPlaylist, allSongs]);

  return (
    <div>
      <div className="flex justify-between w-full">
        <h1>Your Playlists</h1>
        <h1 className="underline cursor-pointer" onClick={()=>{
          navigate("/create-edit-playlist");
        }}>Create Playlists</h1>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {allPlaylists?.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div className={`flex flex-col gap-1 shadow border p-2 cursor-pointer rounded ${isSelected && 'border-orange-500 border-4'}`} 
            onClick={()=>{
              dispatch(SetSelectedPlaylist(playlist));
            }} >
              <h1 className="text-3xl">{playlist?.name}</h1>
              <h1 className="text-xl">
                {playlist?.songs?.length} Songs
              </h1>
              <hr />
              <div className="flex gap-3 justify-between">
              <i className="ri-delete-bin-line text-2xl text-gray-500" onClick={()=>{
                onDelete(playlist.name);
              }}></i>
                <i className="ri-pencil-line text-2xl text-gray-500" onClick={()=>{
                  dispatch(SetSelectedPlaylistForEdit(playlist));
                  navigate(`/create-edit-playlist/`);
                }}></i>                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
