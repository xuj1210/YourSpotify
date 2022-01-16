import Artist from './artist'

export default function ArtistsList({ artists }) {
    let i = 0;
    return (
        <ol>
            {artists && artists.map((artist) => {
                ++i;
                return (
                    <Artist info={artist} idx={i} />
                )
            })}
        </ol>
    )
}