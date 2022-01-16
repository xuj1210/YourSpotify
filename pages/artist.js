import Image from 'next/image'

export default function Artist({ info, idx }) {
    const imgObject = info.images[2];
    return (
        <li key={info.name}>
            {`${idx}. ${info.name}`}
            <br />
            <Image
                src={imgObject.url}
                height={imgObject.height}
                width={imgObject.width}
            />
        </li>
    )
}

/*
{
    "external_urls": {
        "spotify": "https://open.spotify.com/artist/6hhqsQZhtp9hfaZhSd0VSD"
    },
    "followers": {
        "href": null,
        "total": 543317
    },
    "genres": [
        "k-pop",
        "k-pop girl group"
    ],
    "href": "https://api.spotify.com/v1/artists/6hhqsQZhtp9hfaZhSd0VSD",
    "id": "6hhqsQZhtp9hfaZhSd0VSD",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab6761610000e5eb688110f953532d9da57225eb",
            "width": 640
        },
        {
            "height": 320,
            "url": "https://i.scdn.co/image/ab67616100005174688110f953532d9da57225eb",
            "width": 320
        },
        {
            "height": 160,
            "url": "https://i.scdn.co/image/ab6761610000f178688110f953532d9da57225eb",
            "width": 160
        }
    ],
    "name": "WJSN",
    "popularity": 58,
    "type": "artist",
    "uri": "spotify:artist:6hhqsQZhtp9hfaZhSd0VSD"
}
*/