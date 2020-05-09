import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useAppConfig, useLocalization } from '@ocdlimited/abp.react.core';

import Routes from './routes';

function App() {
	useLocalization();
	const loaded = useAppConfig();

	return loaded ? (
		<Routes />
	) : (
		<div className="loading-content">
			<CircularProgress color="secondary" />
		</div>
	);
}

export default App;
