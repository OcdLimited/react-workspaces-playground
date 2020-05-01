/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require("fs");
const path = require("path");

// const pageComponents = fs.readdirSync(
//   path.join(__dirname, "../../../src/components")
// );
// const pageContainers = fs.readdirSync(
//   path.join(__dirname, "../../../src/containers")
// );
// const slices = fs.readdirSync(path.join(__dirname, '../../../src/slices'));

// const components = [...pageComponents, ...pageContainers];

function componentExists(comp) {
  return false;
}

module.exports = componentExists;
