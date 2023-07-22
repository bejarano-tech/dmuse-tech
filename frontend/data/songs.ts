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
  },
  {
    description: "Para que me quieras - Song by Popilopi",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmRWzA16tAGoxNeKHFJedLCdKh5ZgcvsjyZgNpQF2CGB5N/para-que-me-quieras.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmRWzA16tAGoxNeKHFJedLCdKh5ZgcvsjyZgNpQF2CGB5N/font-page.png",
    name: "Para que me quieras",
    attributes: [{trait_type: "artist", value: "Popilopi"}]
  },
  {
    description: "Buenas noticias - Song by L.L.D",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/buenas-noticias.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/buenas-noticias.png",
    name: "Buenas noticias",
    attributes: [{trait_type: "artist", value: "L.L.D"}]
  }
]