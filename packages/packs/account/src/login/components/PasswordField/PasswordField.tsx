import React from 'react'; // we need this to make JSX compile
import { Field, getIn, FieldProps } from 'formik';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { InputLabel, OutlinedInput, FormControl, FormHelperText, OutlinedTextFieldProps } from '@material-ui/core';

export interface TextFieldProps extends OutlinedTextFieldProps, FieldProps {
	required: boolean;
	disabled: boolean;
	helperText?: string;
	id?: string;
}

export function Password({
	required,
	disabled,
	field,
	form: { isSubmitting, touched, errors },
	id,
	FormHelperTextProps,
	...props
}: TextFieldProps) {
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

	const fieldError = getIn(errors, field.name);
	const showError = getIn(touched, field.name) && !!fieldError;

	const helperText = showError ? fieldError : props.helperText;

	const meta = {
		error: showError,
		disabled: disabled ?? isSubmitting,
	};

	const helperTextId = props.helperText && id ? `${id}-helper-text` : undefined;

	return (
		<FormControl variant="outlined" margin="normal" fullWidth required={required} error={showError}>
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
				{...meta}
			/>
			{helperText && (
				<FormHelperText id={helperTextId} {...FormHelperTextProps}>
					{helperText}
				</FormHelperText>
			)}
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
