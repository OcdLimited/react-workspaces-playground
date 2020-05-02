/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
	description: 'Add an unconnected component',
	prompts: [
		{
			type: 'input',
			name: 'package',
			message: 'What package?',
			default: 'core',
			validate: value => {
				// TODO: Improve
				if (/.+/.test(value)) {
					return componentExists(value) ? 'A component or container with this name already exists' : true;
				}

				return 'The package is required';
			},
		},
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			default: 'Button',
			validate: value => {
				if (/.+/.test(value)) {
					return componentExists(value) ? 'A component or container with this name already exists' : true;
				}

				return 'The name is required';
			},
		},
		{
			type: 'confirm',
			name: 'wantLoadable',
			default: true,
			message: 'Do you want to load the component asynchronously?',
		},
		{
			type: 'confirm',
			name: 'wantTests',
			default: true,
			message: 'Do you want tests?',
		},
		{
			type: 'confirm',
			name: 'wantStorybook',
			default: true,
			message: 'Do you want a Storybook story?',
		},
		{
			type: 'list',
			name: 'type',
			message: 'Select the type of component',
			default: 'Stateless Function',
			choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component'],
		},
	],
	actions: data => {
		let componentTemplate;
		const componentStyleSheet = './component/index.scss.hbs';

		switch (data.type) {
			case 'Stateless Function': {
				componentTemplate = './component/stateless.js.hbs';
				break;
			}
			default: {
				componentTemplate = './component/class.js.hbs';
			}
		}

		const basePath = '../../packages/packs/{{package}}/src/';

		const actions = [
			{
				type: 'add',
				path: basePath + 'components/{{properCase name}}/{{properCase name}}.tsx',
				templateFile: componentTemplate,
				abortOnFail: true,
				force: true,
			},
			{
				type: 'add',
				path: basePath + 'components/{{properCase name}}/index.ts',
				templateFile: './component/index.js.hbs',
				abortOnFail: true,
				force: true,
			},
		];

		if (data.wantTests) {
			actions.push({
				type: 'add',
				path: basePath + 'components/{{properCase name}}/{{properCase name}}.test.tsx',
				templateFile: './component/test.js.hbs',
				abortOnFail: true,
				force: true,
			});
		}

		if (data.wantStorybook) {
			actions.push({
				type: 'add',
				path: basePath + 'components/{{properCase name}}//{{properCase name}}.stories.tsx',
				templateFile: './component/story.js.hbs',
				abortOnFail: true,
				force: true,
			});
		}

		// If want Loadable.js to load the component asynchronously
		if (data.wantLoadable) {
			actions.push({
				type: 'add',
				path: basePath + 'components/{{properCase name}}/Loadable.tsx',
				templateFile: './component/loadable.js.hbs',
				abortOnFail: true,
				force: true,
			});
		}

		actions.push({
			type: 'prettify-package',
			path: 'components/{{properCase name}}',
		});

		return actions;
	},
};
