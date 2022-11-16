import { ethers } from 'hardhat';

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log('Deploying MyAINFT ...');
  console.log('Network:', network.name);

  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  const MyAINFT = await ethers.getContractFactory('MyAINFT');
  const myAINFT = await MyAINFT.deploy(
    'My Test AINFTs', // name
    'MTA', // symbol
    'https://us-central1-nft-server-dev.cloudfunctions.net/ainftTestMetadata/', // baseURI
    ethers.constants.MaxUint256, // maxTokenId
  );

  await myAINFT.deployed();

  console.log(`MyAINFT deployed to ${myAINFT.address} !`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
