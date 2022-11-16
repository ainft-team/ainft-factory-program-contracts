// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import '@ainft-team/ainft-contracts/contracts/ainft/AINFTBaseV1.sol';

contract MyAINFT is AINFTBaseV1 {
  constructor(
    string memory name_,
    string memory symbol_,
    string memory baseURI_,
    uint256 maxTokenId_
  ) AINFTBaseV1(name_, symbol_, baseURI_, maxTokenId_) {}
}
