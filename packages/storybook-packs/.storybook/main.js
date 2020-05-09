module.exports = {
	addons: [
		{
			name: '@storybook/preset-create-react-app',
			options: {
				scriptsPackageName: '@ocdlimited/react-scripts',
			},
		},
		,
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-knobs',
	],
};
