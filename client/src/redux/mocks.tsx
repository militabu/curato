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
    id:'1',
    title: 'Portugal',
    date: Date.now(),
    description: 'Our trip to Portugal was in the winter, but everyone kept warm in the local bars, with sangria on tap, woop woop! #wingria #bestlife',
    favorite: true,
    // TODO: Set this to the index of the image in the images array to save space
    coverImg: 'https://assets3.thrillist.com/v1/image/2418477/1536x864/crop;webp=auto;jpeg_quality=60;progressive.jpg',
    images: imgList1,
    sharedWith: []
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