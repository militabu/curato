import { AlbumType } from "../customTypes";

const imgList1 = [
  'https://assets3.thrillist.com/v1/image/2418477/1536x864/crop;webp=auto;jpeg_quality=60;progressive.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9',
  'https://media.cntraveller.com/photos/62d14e029bbb08746e6fd952/16:9/w_1600%2Cc_limit/barcelonaGettyImages-1386922276.jpeg',
  'https://cdn.britannica.com/06/171306-050-C88DD752/Aurora-borealis-peninsula-Snaefellsnes-Iceland-March-2013.jpg',
];

const imgList2 = [
  "https://assets3.thrillist.com/v1/image/2418477/1536x864/crop;webp=auto;jpeg_quality=60;progressive.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9",
  "https://cdn.britannica.com/06/171306-050-C88DD752/Aurora-borealis-peninsula-Snaefellsnes-Iceland-March-2013.jpg",
];

export const albumList : AlbumType[] = [
  {
    "id":"",
    "title": "Portugal",
    "date": 1664057413493,
    "description": "Our trip to Portugal was in the winter, but everyone kept warm in the local bars, with sangria on tap, woop woop! #wingria #bestlife",
    "favorite": true,
    "coverImg": "https://res.cloudinary.com/doeffypwo/image/upload/v1664189849/heccfvxvrkj5gngu12hi.jpg",
    "images": [
      "https://res.cloudinary.com/doeffypwo/image/upload/v1664189849/heccfvxvrkj5gngu12hi.jpg",
      "https://res.cloudinary.com/doeffypwo/image/upload/v1664189867/srypo50tgsrzzzwt6vxw.jpg",
      "https://res.cloudinary.com/doeffypwo/image/upload/v1664190957/kmsiajhrkhakp7nognb8.jpg",
      "https://res.cloudinary.com/doeffypwo/image/upload/v1664191368/sizkvwnpglh7dpxfen6v.jpg"
    ],
    "sharedWith": []
  },
  {
    id:'2',
    title: 'Boston',
    date: Date.now(),
    description: 'Wow, Boston sucks. What were we even thinking coming here? That accent especially... yikes! #smahtpahk #bostonlife',
    favorite: false,
    coverImg: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9',
    images: imgList2,
    sharedWith: []
  },
]

const mockUser = {
  "userName": "Ben",
  "userImg": "https://avatars.githubusercontent.com/u/102311146?v=4",
  "contacts":["632a22090543901fa725a84c"],
  "albums": []
}
const mockAlbum = {
  "id":"",
  "title": "Curato",
  "date": 1664057413493,
  "description": "Do I get paid for this advertising?",
  "favorite": false,
  "coverImg": "https://res.cloudinary.com/doeffypwo/image/upload/v1664267416/benimg1_wqhzau.jpg",
  "images": [
    "https://res.cloudinary.com/doeffypwo/image/upload/v1664267416/benimg1_wqhzau.jpg",
    "https://res.cloudinary.com/doeffypwo/image/upload/v1664267416/benimg3_xeb0yv.jpg",
    "https://res.cloudinary.com/doeffypwo/image/upload/v1664267416/benimg2_wf7xdv.jpg"
  ],
  "sharedWith": []
}