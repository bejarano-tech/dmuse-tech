import SongCard from '../SongCard';

export interface Song {
  id: number;
  name: string;
  image: string;
  artist: string;
}

interface SongsListProps {
  songs: Array<Song>
}

const SongsList = ({songs}: SongsListProps) => {
  return (
    <>
      {songs.map((song, index) => (
        <SongCard key={`song-${index}`} song={song} />
      ))}
    </>
  );
}

export default SongsList