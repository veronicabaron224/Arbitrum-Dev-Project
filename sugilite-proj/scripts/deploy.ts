import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("SugiliteCoin", ["0x920F014fC05F835bE1e75A935d56801A69AE2e0A"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});