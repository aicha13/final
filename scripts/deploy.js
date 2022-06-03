const hre = require("hardhat");

async function main() {

  const yourcollection = await hre.ethers.getContractFactory("yourcollection");
  const yourCollection = await yourcollection.deploy();

  await yourCollection.deployed();

  console.log("yourcollection deployed to:", yourCollection.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
