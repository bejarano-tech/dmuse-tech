# DMuse Dedicator

## Overview

This repository contains a project developed for the Polkadot Global Series Hackathon. The project aims to showcase the integration of Ink! for smart contracts development on the Polkadot network, along with a frontend user interface using Next.js and Tailwind CSS.


## What is the DMuse Dedicator?

DMuse dedicator is a platform to give NFT Dedicated Songs that saves in the blockchain a dedication within the song NFT.

## How it works?

https://youtu.be/8etm0xLF6f0

- First you connect your wallet.
- Second you select the song to dedicated.
- Then you write your dedication.
- Later you write your honoree wallet (Wallet of your fellow)
- Then you confirm your dedication is correct
- Mint the dedication song NFT
- Once minted you can share the URL with your honoree wich is the only one that can see the NFT with the dedication.

## Working example

https://dmuse-ink.vercel.app/

### Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Smart Contracts](#smart-contracts)
- [Frontend](#frontend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before running the project, ensure you have the following prerequisites:

- Node.js (v14 or later)
- Yarn package manager
- Polkadot Extension for your browser
- Rust & Cargo: [Installation](https://doc.rust-lang.org/cargo/getting-started/installation.html)
- Cargo Contract: [Installation](https://github.com/paritytech/cargo-contract#installation)
- substrate-contracts-node: [Installation](https://github.com/paritytech/substrate-contracts-node)

## Installation

1. Clone this repository to your local machine:

```bash
git clone 
cd dmuse-tech
```

2. Install the dependencies for both the smart contracts and the frontend:

```bash
cd frontend
yarn install
```

## Smart Contracts

In this project, we are using the Ink! smart contract language for developing smart contracts for the Polkadot network. The smart contract code can be found in the `contracts` directory.

## Frontend

The frontend of the application is built using Next.js for React-based server-side rendering and Tailwind CSS for easy and customizable styling. The frontend code is available in the `frontend` directory.

## Usage

### 1. Smart Contracts Deployment

1. Compile the Ink! smart contract:

```bash
cd contracts/dmuseminter
cargo +nightly-2023-01-01 contract build --release
```

    After build copy /target/ink/dmuseminter/dmuseminter.json to frontend directory

2. Deploy the compiled smart contract to the Polkadot network. You can use the [Contracts UI](https://contracts-ui.substrate.io/).

### 2. Frontend Development

1. Enter directory:

```bash
cd frontend
```

2. Copy .env.example to .env

```bash
cp .env.example .env
```

3. Fill The values of the .env with your credentials

```bash
PINATA_API_KEY=
PINATA_API_SECRET=
PINATA_API_JWT=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Start development front end server

```bash
yarn dev
```




3. Access the application by visiting `http://localhost:3000` in your web browser.

### 3. Notes

1. The front end connects to the Aleph Zero Tesnet

2. Deployed Contracts:
  
  - Aleph Zero Testnet: 5HB4vskWTb1Bho3kdiQcaMsSfDskUC5DrTViMHpBujmJ2GKM 

## Contributing

We welcome contributions to this project! To contribute, follow these steps:

1. Fork this repository to your GitHub account.

2. Create a new branch with a descriptive name:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them with clear commit messages.

4. Push your changes to your forked repository.

5. Submit a pull request to this repository's `main` branch, describing your changes in detail.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per the license terms.
