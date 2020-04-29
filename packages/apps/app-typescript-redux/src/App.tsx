import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useAppConfig } from '@ocdlimited/abp.react.core';

import Routes from './routes';

function App() {
	var [show, setShow] = useState(false);
	useAppConfig(() => setShow(true));

	return show ? (
		<Routes />
	) : (
		<div className="loading-content">
			<CircularProgress color="secondary" />
		</div>
	);
}

export default App;
