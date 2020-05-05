import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { Notifier } from '@ocdlimited/abp.react.core';
import { CssBaseline } from '@material-ui/core';
import { useBasicTheme } from '@ocdlimited/abp.react.theme.shared';

import './index.css';
import App from './App';
import { store } from './app/redux/store';
import * as serviceWorker from './serviceWorker';

const AbpThemedApp = ({ children }: any) => {
	const { currentTheme } = useBasicTheme();

	return (
		<ThemeProvider theme={currentTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AbpThemedApp defaultThemeName="dark">
				<ToastProvider placement="bottom-right">
					<App />
					<Notifier />
				</ToastProvider>
			</AbpThemedApp>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
