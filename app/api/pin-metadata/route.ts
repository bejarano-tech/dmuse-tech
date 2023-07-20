import pinataSDK from '@pinata/sdk';

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_API_JWT})


import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  const body = await request.json()
  const uploadToIpfs = await pinata.pinJSONToIPFS(body)
  console.log(uploadToIpfs)
  return NextResponse.json({body})
}