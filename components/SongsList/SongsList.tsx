import { SongItem } from '@/data/songs';
import SongCard from '../SongCard';

interface SongsListProps {
  songs: Array<SongItem>
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