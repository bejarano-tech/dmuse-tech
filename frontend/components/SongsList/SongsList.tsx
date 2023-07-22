import { SongItem } from '@/data/songs';
import SongCard from '../SongCard';

interface SongsListProps {
  songs: Array<SongItem>
  dedicate?: boolean
}

const SongsList = ({songs, dedicate = true}: SongsListProps) => {
  return (
    <>
      {songs.map((song, index) => (
        <SongCard key={`song-${song.id}`} dedicate={dedicate} song={song} />
      ))}
    </>
  );
}

export default SongsList