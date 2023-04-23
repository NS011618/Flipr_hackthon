import React from "react";
import { useSelector } from "react-redux";

import SongsList from "../components/SongsList";
import Playlists from "../components/Playlists";
import Player from "../components/Player";

function Home() {
  const { user } = useSelector((state) => state.user);

  console.log(user);
  return (
    <>
      <div className="flex gap-5">
        <div className="w-1/2">
          <SongsList />
        </div>
        <div className="w-1/2">
          <Playlists />
        </div>
      </div>
      <Player />
    </>
  );
}

export default Home;
