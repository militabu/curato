import { ReactElement } from "react";
import { AlbumType } from "../../customTypes";
import Album from "../albumComponents/Album";


function AlbumListScreen() : ReactElement {

  const albumList : AlbumType[] = [
    {
      id:'1',
      title: 'Portugal',
      date: new Date(Date.now()),
      favourite: true,
      img: 'https://assets3.thrillist.com/v1/image/2418477/1536x864/crop;webp=auto;jpeg_quality=60;progressive.jpg'
    },
    {
      id:'2',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
    {
      id:'3',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
    {
      id:'4',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
    {
      id:'5',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
    {
      id:'6',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
    {
      id:'7',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
    {
      id:'8',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
    {
      id:'9',
      title: 'Boston',
      date: new Date(Date.now()),
      favourite: false,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
    },
  ]

  return (
    <div className="h-full w-full overflow-y-scroll flex flex-col justify-start items-center bg-customPurple">
      {albumList.map(album => <Album key={album.id} {...album} />)}
    </div>
  )
}

export default AlbumListScreen;