export type SongItem = {
  id?: number;
  description?: string,
  external_url?: string, 
  image?: string, 
  name?: string,
  attributes?: { trait_type?: string, value: string }[]
}

export const songs: SongItem[] = [
  {
    description: "Caprichos - Song by Fermata",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmdPiAYFhnhT3LRiF2C5vnCyFUbv4tcutuNjGgjAzK9Ntt/caprichos.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmdPiAYFhnhT3LRiF2C5vnCyFUbv4tcutuNjGgjAzK9Ntt/front-page.png",
    name: "Caprichos",
    attributes: [{trait_type: "artist", value: "Fermata"}]
  }
]