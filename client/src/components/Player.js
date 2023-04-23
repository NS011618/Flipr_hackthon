import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../redux/userSlice";

function Player() {
  const [volume,setVolume] = useState(0.5);
  const [currentTime , setCurrentTime] = useState(0);
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const { currentSong ,currentSongIndex,allSongs} = useSelector((state) => state.user);

  const onPlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  const onPause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const onPrev = () => {
    dispatch(SetCurrentSongIndex(currentSongIndex-1));
    dispatch(SetCurrentSong(allSongs[currentSongIndex-1]));
  };
  const onNext = () => {
    dispatch(SetCurrentSongIndex(currentSongIndex+1));
    dispatch(SetCurrentSong(allSongs[currentSongIndex+1]));
  };

  useEffect(()=>{
    if(isPlaying){
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play();
    }
  },[currentSong]);
  useEffect(()=>{
    if(!currentSong && allSongs.length > 0){
        dispatch(SetCurrentSong(allSongs[0]));
    }
  },[allSongs]);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-5 shadow-lg bg-gray-100 border">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-20 w-32"
            src="https://www.pngimages.pics/images/quotes/english/general/music-symbol-png-clipart-52650-297684.png"
            alt=""
          />
          <div>
            <h1>{currentSong?.title}</h1>
            <h1>
              {currentSong?.artist} , {currentSong?.album} , {currentSong?.year}
            </h1>
          </div>
        </div>
        <div className="w-96 flex flex-col items-center ">
          <audio src={currentSong?.src} ref={audioRef} onTimeUpdate={(e)=>{
            setCurrentTime(e.target.currentTime);
          }}></audio>
          <div className="flex gap-3">
            <i class="ri-skip-back-line text-4xl" onClick={onPrev}></i>
            {isPlaying ? (
              <i className="ri-pause-line text-4xl" onClick={onPause}></i>
            ) : (
              <i className="ri-play-line text-4xl" onClick={onPlay}></i>
            )}
            <i class="ri-skip-forward-line text-4xl" onClick={onNext}></i>
          </div>
          <div class='flex gap-3 items-center w-full'>
            <h1>
                {Math.floor(currentTime/60)}:{Math.floor(currentTime%60)}
            </h1>
            <input type='range' className="p-0 w-full" min={0} max={Number(currentSong?.duration)*60}
            value={currentTime}
             onChange={(e)=>{
                audioRef.current.currentTime = e.target.value;
                setCurrentTime(e.target.value);
             }} />
            <h1>{currentSong?.duration}</h1>
          </div>
        </div>
        <div className="flex gap-3 items-center">
            <i class="ri-volume-mute-line text-3xl" onClick={()=>{
             setVolume(0);
             audioRef.current.volume = 0;
            }}></i>
           <i className="ri-volume-down-line text-3xl"></i>
           <input type='range' className="p-0"
             min={0}
             max={1}
             step={0.1}
             value={volume}
             onChange={(e)=>{
              audioRef.current.volume = e.target.value;
              setVolume(e.target.value);
            }}/>
            <i className="ri-volume-down-line text-3xl"
              onClick={()=>{
                setVolume(1);
                audioRef.current.volume = 1 ;
              }}
            ></i>
                      
        </div>
      </div>
    </div>
  );
}

export default Player;
