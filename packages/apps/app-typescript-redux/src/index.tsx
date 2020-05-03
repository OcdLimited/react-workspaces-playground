import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { Notifier } from '@ocdlimited/abp.react.core';

import './index.css';
import App from './App';
import { store } from './app/redux/store';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import { Dark as theme } from './themes';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<ToastProvider placement="bottom-right">
					<App />
					<Notifier />
				</ToastProvider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
