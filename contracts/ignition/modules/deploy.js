const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreenTokenModule", (m) => {
  // Deploy the GreenToken contract
  const greenToken = m.contract("GreenToken", [
    "GreenToken",  // Token name
    "GTN",         // Token symbol
    1000000        // Initial supply (in whole tokens, will be multiplied by decimals)
  ]);

  // Return the deployed contract
  return { greenToken };
});
