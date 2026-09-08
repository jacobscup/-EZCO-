import hre from "hardhat";

async function main() {
  const connection = await hre.network.connect();
  const [wallet] = await connection.viem.getWalletClients();

  const address = wallet.account.address;
  const publicClient = await connection.viem.getPublicClient();
  const balance = await publicClient.getBalance({ address });

  console.log("Wallet address:", address);
  console.log("Sepolia ETH (wei):", balance.toString());
  console.log(
    "Sepolia ETH:",
    Number(balance) / 1e18
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
