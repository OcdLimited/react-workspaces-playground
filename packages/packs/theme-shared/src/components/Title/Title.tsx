import React from 'react';
import Typography from '@material-ui/core/Typography';

export function Title({ children }: { children: React.ReactNode }) {
	return (
		<Typography component="h1" variant="h5" gutterBottom>
			{children}
		</Typography>
	);
}

export default Title;
