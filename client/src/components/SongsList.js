import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetCurrentSongIndex, SetCurrentSong } from '../redux/userSlice';

function SongsList() {
    const dispatch = useDispatch();
  const {allSongs,currentSong , selectedPlaylist} = useSelector((state)=>state.user)
  return (
    <div className='flex-col gap-5'>
        <input type='text' placeholder='Song,Artist,Album' className='rounded w-full' />
        <div className='overflow-y-scroll'>
        {selectedPlaylist?.songs?.map((song,index)=>{
            const isPlaying = currentSong?._id === song._id;
            return( <div className={` p-2 flex items-center justify-between cursor-pointer ${isPlaying && 'shadow rounded border border-gray-300'}`} onClick={()=>{
               dispatch(SetCurrentSong(song))
               dispatch(SetCurrentSongIndex(index))
            }}>
                <div>
                   <h1>{song.title}</h1>
                   <h1>{song.artist} {song.album} {song.year}</h1>
                </div>
                <div>
                  <h1>{song.duration}</h1>           
                </div>
            </div>
            
            );
        })}
        </div>
    </div>
  )
}

export default SongsList