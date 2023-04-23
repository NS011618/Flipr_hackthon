import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedPlaylist } from "../redux/userSlice";

function Playlists() {
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

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlaylists[0]));
    }
  }, [selectedPlaylist, allSongs]);

  return (
    <div>
      <div className="flex justify-between w-full">
        <h1>Your Playlists</h1>
        <h1 className="underline">Create Playlists</h1>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {allPlaylists?.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div className="flex flex-col gap-3 shadow border p-2">
              <h1 className="text-3xl">{selectedPlaylist?.name}</h1>
              <h1 className="text-xl">
                {selectedPlaylist?.songs?.length} Songs
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
