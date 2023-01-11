import { ethers } from 'hardhat';

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log('Deploying MyAINFT ...');
  console.log('Network:', network.name);

  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  const MyAINFT = await ethers.getContractFactory('MyAINFT');
  const myAINFT = await MyAINFT.deploy(
    'Bready Cat', // name
    'BCA', // symbol
    'https://develop-bready-cat-ainft-server-laeyoung.endpoint.dev.ainize.ai/metadata/', // baseURI
    ethers.constants.MaxUint256, // maxTokenId
  );

  console.log(`MyAINFT deployed to ${myAINFT.address} !`);
  console.log(`Check out the deployed contract at https://goerli.etherscan.io/address/${myAINFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
