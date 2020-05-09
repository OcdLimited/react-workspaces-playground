/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'; // we need this to make JSX compile
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';

export interface UsernameFieldProps {
	required: boolean;
	autoFocus: boolean;
}

export const UsernameField = (props: UsernameFieldProps) => {
	const { t } = useTranslation('AbpAccount');

	return (
		<Field
			component={TextField}
			name="username"
			label={t('UserNameOrEmailAddress')}
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
