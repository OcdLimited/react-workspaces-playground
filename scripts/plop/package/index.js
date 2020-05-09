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
	description: 'Add a new package',
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			default: 'Form',
			validate: value => {
				if (/.+/.test(value)) {
					return componentExists(value) ? 'A package with this name already exists' : true;
				}

				return 'The name is required';
			},
		},
	],
	actions: data => {
		const templatePath = path.join(__dirname, '/template');
		const destPath = path.join('../../packages/packs/{{name}}');

		return [
			{
				type: 'addMany',
				destination: '../../packages/packs/{{lowerCase name}}',
				base: templatePath,
				templateFiles: templatePath,
				force: true,
			},
		];
	},
};
