import Track from './track';

export default function TracksList({ tracks }) {
  let i = 0;
  return (
    <ol>
      {tracks && tracks.map(track => {
        ++i;
        return <Track info={track} idx={i} key={track.name} />
      })}
    </ol>
  )
}