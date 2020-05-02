/**
 * Container Generator
 */
const fs = require('fs');
const path = require('path');
const componentExists = require('../utils/packageExists');

function traverseDir(dir) {
	return fs.readdirSync(dir).reduce((acc, file) => {
		let fullPath = path.join(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			return [...acc, ...traverseDir(fullPath)];
		} else {
			return [...acc, fullPath];
		}
	}, []);
}

module.exports = {
	description: 'Add a new package slice',
	prompts: [
		{
			type: 'input',
			name: 'package',
			message: 'What package?',
			default: 'Form',
		},
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			default: 'Form',
		},
	],
	actions: data => {
		const templatePath = path.join(__dirname, '/template');

		return [
			{
				type: 'addMany',
				destination: '../../packages/packs/{{lowerCase package}}/src/{{lowerCase name}}',
				base: templatePath,
				templateFiles: templatePath,
				verbose: true,
				force: true,
			},
		];
	},
};
