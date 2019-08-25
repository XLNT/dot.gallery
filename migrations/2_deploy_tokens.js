const DotGalleryItem = artifacts.require("DotGalleryItem");

module.exports = function(deployer) {
  deployer.deploy(DotGalleryItem).then(console.log.bind(console));
};
