import Image from 'next/image'
// import ScrollAnimation from 'react-animate-on-scroll'

export default function Track({ info, idx }) {
  const imgObject = info.album.images[1];
  return (
    <li key={info.name}>
      {`${idx}. ${info.name}`}
      <br />
      <Image
        src={imgObject.url}
        height={imgObject.height / 2}
        width={imgObject.width / 2}
      />
    </li>
  )
}

/* 
{
    album: {
      album_type: 'SINGLE',
      artists: [Array],
      available_markets: [Array],
      external_urls: [Object],
      href: 'https://api.spotify.com/v1/albums/1hwykI4yYe3FTcAhl1gadk',
      id: '1hwykI4yYe3FTcAhl1gadk',
      images: [Array],
      name: 'Catch the Stars',
      release_date: '2022-01-04',
      release_date_precision: 'day',
      total_tracks: 1,
      type: 'album',
      uri: 'spotify:album:1hwykI4yYe3FTcAhl1gadk'
    },
    artists: [ [Object] ],
    available_markets: [
      'AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH',
      'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY',
      'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG',
      'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN',
      'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO',
      'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC',
      'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM',
      'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA',
      'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN',
      'TR', 'TW', 'US', 'UY', 'ZA'
    ],
    disc_number: 1,
    duration_ms: 200106,
    explicit: false,
    external_ids: { isrc: 'KRA382164531' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/2yMIYu0O3TanoqmqpTcoEs'
    },
    href: 'https://api.spotify.com/v1/tracks/2yMIYu0O3TanoqmqpTcoEs',
    id: '2yMIYu0O3TanoqmqpTcoEs',
    is_local: false,
    name: 'Catch the Stars',
    popularity: 54,
    preview_url: 'https://p.scdn.co/mp3-preview/f6e9d5c2934f88caf9178ed1665983dc0dd81a2f?cid=c5b8c394e2934a82b5489b536dac28fb',
    track_number: 1,
    type: 'track',
    uri: 'spotify:track:2yMIYu0O3TanoqmqpTcoEs'
}
*/