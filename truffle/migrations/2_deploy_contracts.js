/* global artifacts */

const Wall = artifacts.require('Wall');

module.exports = (deployer) => {
  deployer.deploy(Wall);
};
