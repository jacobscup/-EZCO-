import hre from "hardhat";

async function main() {
  console.log("🚀 Deploying RealEstateTrust contract...");

  const RealEstateTrust = await hre.ethers.getContractFactory("RealEstateTrust");
  const contract = await RealEstateTrust.deploy();

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ RealEstateTrust deployed to:", contractAddress);

  // Save deployment address
  const fs = require('fs');
  const deploymentData = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deploymentTime: new Date().toISOString(),
  };

  fs.writeFileSync(
    `deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentData, null, 2)
  );

  console.log("\n📝 Deployment data saved to deployments/" + hre.network.name + ".json");

  // Verify contract on Etherscan if on a public network
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("\n⏳ Waiting for block confirmations before verification...");
    await contract.deploymentTransaction()?.wait(6);
    
    console.log("🔍 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("✅ Contract verified!");
    } catch (error) {
      console.log("⚠️ Verification skipped or failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
