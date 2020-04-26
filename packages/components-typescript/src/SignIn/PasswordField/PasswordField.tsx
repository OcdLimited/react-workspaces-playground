import React from 'react'; // we need this to make JSX compile
import { Field } from 'formik';
import { FieldProps } from 'formik';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { InputLabel, OutlinedInput, FormControl } from '@material-ui/core';

export interface TextFieldProps extends FieldProps {
	required: boolean;
	disabled: boolean;
	helperTest: string;
}

export function Password({ required, field }: TextFieldProps) {
	const [values, setValues] = React.useState({
		showPassword: false,
	});
	const { t } = useTranslation('AbpAccount');

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	return (
		<FormControl variant="outlined" margin="normal" fullWidth required={required}>
			<InputLabel htmlFor="password">{t('Password')}</InputLabel>
			<OutlinedInput
				id="password"
				type={values.showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{values.showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
				labelWidth={70}
				{...field}
			/>
		</FormControl>
	);
}

interface PasswordProps {
	required: boolean;
}

export const PasswordField = (props: PasswordProps) => (
	<Field component={Password} name="password" label="Username" {...props} />
);

PasswordField.defaultProps = {
	required: false,
	helperText: null,
};

export default PasswordField;
