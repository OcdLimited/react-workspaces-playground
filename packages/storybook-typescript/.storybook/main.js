module.exports = {
	addons: [
		{
			name: '@storybook/preset-create-react-app',
			options: {
				scriptsPackageName: '@ocdlimited/react-scripts',
			},
		},
		'@storybook/addon-knobs',
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'storybook-formik',
	],
};
