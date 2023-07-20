export type SongItem = {
  id: number;
  description: string,
  external_url: string, 
  image: string, 
  name: string,
  attributes: { trait_type?: string, value: string }[]
}

export const songs: SongItem[] = [
  {
    id: 0,
    description: "Caprichos - Song by Fermata",
    external_url: "https://gateway.pinata.cloud/ipfs/QmZbJJfasGXjZwG5rwgKSnBEkB8B6wtrYpHVR1c2KwtLDh/Caprichos.wav",
    image: "https://gateway.pinata.cloud/ipfs/QmXsSvbYoDF3hwVKtSZQtgKNUkrzHTeers9x4oViYvWXQt",
    name: "Caprichos",
    attributes: [{trait_type: "Artist", value: "Fermata"}]
  }
]