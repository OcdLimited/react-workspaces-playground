import React from 'react'; // we need this to make JSX compile
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export interface UsernameFieldProps {
	required: boolean;
	autoFocus: boolean;
}

export const UsernameField = (props: UsernameFieldProps) => {
	return (
		<Field
			component={TextField}
			name="username"
			label="Username"
			variant="outlined"
			margin="normal"
			autoComplete="username"
			fullWidth
			{...props}
		/>
	);
};

UsernameField.defaultProps = {
	autoFocus: false,
	required: false,
};

export default UsernameField;
