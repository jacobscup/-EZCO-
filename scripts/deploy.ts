import { mkdir, writeFile } from "node:fs/promises";
import { network } from "hardhat";

async function main() {
  const { viem } = await network.create();

  console.log("Deploying RealEstateTrust contract...");
  const contract = await viem.deployContract("RealEstateTrust");

  await mkdir("deployments", { recursive: true });
  const deploymentData = {
    network: "sepolia",
    contractAddress: contract.address,
    deploymentTime: new Date().toISOString(),
  };

  await writeFile(
    "deployments/sepolia.json",
    JSON.stringify(deploymentData, null, 2),
  );

  console.log("RealEstateTrust deployed to:", contract.address);
  console.log("Deployment data saved to deployments/sepolia.json");
}

await main();
