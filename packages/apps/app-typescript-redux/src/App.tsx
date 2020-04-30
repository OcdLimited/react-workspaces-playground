import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useAppConfig, useLocalization } from '@ocdlimited/abp.react.core';

import Routes from './routes';

function App() {
	var [loaded, setLoaded] = useState(false);
	useAppConfig(() => setLoaded(true));
	useLocalization();

	return loaded ? (
		<Routes />
	) : (
		<div className="loading-content">
			<CircularProgress color="secondary" />
		</div>
	);
}

export default App;
