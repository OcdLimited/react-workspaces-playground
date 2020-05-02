/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const packageGenerator = require('./package/index.js');
const sliceGenerator = require('./slice/index.js');

module.exports = plop => {
	plop.setGenerator('component', componentGenerator);
	plop.setGenerator('container', containerGenerator);
	plop.setGenerator('package', packageGenerator);
	plop.setGenerator('slice', sliceGenerator);

	plop.addHelper('directory', comp => {
		try {
			fs.accessSync(path.join(__dirname, `../../react/containers/${comp}`), fs.F_OK);
			return `containers/${comp}`;
		} catch (e) {
			return `components/${comp}`;
		}
	});
	plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
	plop.addHelper('split', object => object.split(/(?=[A-Z])/).join(' '));
	plop.setActionType('prettify-package', (answers, config) => {
		const folderPath = `${path.join(
			__dirname,
			'../../packages/packs/',
			answers.package,
			'src/components',
			plop.getHelper('properCase')(answers.name),
			'**/*.ts*',
		)}`;
		exec(`yarn run prettify "${folderPath}"`);
		console.log(`yarn run prettify "${folderPath}"`);
		return folderPath;
	});
};
