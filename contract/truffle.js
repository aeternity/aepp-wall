
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    kovan: {
      network_id: 42,
      host: "192.168.99.100",
      port: 8545
    }
  }
};
