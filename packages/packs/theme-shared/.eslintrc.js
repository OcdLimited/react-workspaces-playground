module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	extends: [
		// Extend on the config used in `react-scripts`
		require.resolve('eslint-config-react-app'),
		// If you want extra rules/extensions, it can be added here:
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'prettier/react',
	],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		'no-tabs': 0,
		indent: ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'@typescript-eslint/indent': ['error', 'tab'],
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		'@typescript-eslint/explicit-function-return-type': 'off',
		'arrow-parens': ['error', 'as-needed'],
		'import/prefer-default-export': 0,
		'react/jsx-indent-props': ['error', 'tab'],
	},
	settings: {
		react: {
			version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
};
