import AlbumType from './Album.d.ts'

export interface UserType {
    userName: string,
    userImg: string,
    contacts: string[],
    friendsAlbums: [
        { 
            userId: string, 
            albumId: string 
        }
    ],
    albums: AlbumType[]
}