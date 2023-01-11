import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import * as readline from 'readline-sync';
import { MyAINFT__factory } from '../typechain-types';
import { filter } from 'lodash';

async function mintMyAINFT(contractAddress: string, signer: SignerWithAddress, address: string) {
  const tx = await MyAINFT__factory.connect(contractAddress, signer).mint(address, 1);
  console.log('\n\nTx sent:', tx.hash);
  const receipt = await tx.wait();
  const mintEvents = filter(receipt.events, x => {
    return x.event === 'Mint';
  });
  const tokenId = mintEvents[0].args?.startTokenId;
  console.log('MyAINFT minted! Tx receipt:', receipt);
  console.log(
    `\n\nCheck out the minted token at https://testnets.opensea.io/assets/goerli/${contractAddress}/${tokenId}`,
  );
}

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log('Minting MyAINFT ...');
  console.log('Network:', network.name);

  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  const contractAddress = readline.question('\n\nEnter the contract address: ');
  const address = readline.question('Enter an ETH address to mint to: ');
  console.log('\n\nContract:', contractAddress);
  console.log('NFT recipient:', address);

  await mintMyAINFT(contractAddress, signer, address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
