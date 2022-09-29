export interface Album {
  title: string, 
  date: number,
  description: string,
  favorite: boolean,
  coverImg: string,
  sharedWith: string[],
  images: string[]
}