require("@nomicfoundation/hardhat-ignition");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/62ea68f978fa4aa89c251a5778254b1b",
      accounts: ["1188b976361f89f3e540e86af6d40de230949e359e49778ae09e820552e8b7e6"],
    },
  },
};
