module.exports = {
	stories: ['../src/**/*.stories.js'],
	addons: [
		{
			name: '@storybook/preset-create-react-app',
			options: {
				scriptsPackageName: '@react-workspaces/react-scripts',
			},
		},
		,
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-knobs',
	],
};
