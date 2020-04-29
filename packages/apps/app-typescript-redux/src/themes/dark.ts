import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
	interface ThemeOptions {
		themeName?: string; // optional
	}
}

export default createMuiTheme({
	palette: {
		type: 'dark',
	},
	themeName: 'Dark',
});
