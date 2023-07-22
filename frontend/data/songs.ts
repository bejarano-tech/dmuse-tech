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
  },
  {
    description: "El Encuentro - Song by L.L.D",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/el-encuentro.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/el-encuentro.png",
    name: "El Encuentro",
    attributes: [{trait_type: "artist", value: "L.L.D"}]
  },
  {
    description: "La Noche - Song by L.L.D",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/la-noche.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/la-noche.png",
    name: "La Noche",
    attributes: [{trait_type: "artist", value: "L.L.D"}]
  },
  {
    description: "Los Colores - Song by L.L.D",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/los-colores.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/los-colores.png",
    name: "Los Colores",
    attributes: [{trait_type: "artist", value: "L.L.D"}]
  },
  {
    description: "Sigo Chill - Song by L.L.D",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/sigo-chill.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/sigo-chill.png",
    name: "Sigo Chill",
    attributes: [{trait_type: "artist", value: "L.L.D"}]
  },
  {
    description: "Tu Pañuelo - Song by L.L.D",
    external_url: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/tu-panuelo.wav",
    image: "https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/QmePtaWQdj3KJMVDQv3w4sBMTpVhJX1V2tmZjnWVQirG7K/tu-panuelo.png",
    name: "Tu Pañuelo",
    attributes: [{trait_type: "artist", value: "L.L.D"}]
  },
]