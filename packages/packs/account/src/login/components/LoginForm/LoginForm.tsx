/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { CheckboxWithLabel } from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PasswordField } from '../PasswordField/PasswordField';
import { UsernameField } from '../UsernameField/UsernameField';

interface LoginFormProps {
	isSelfRegistrationEnabled: boolean;
	isSubmitting: boolean;
	autoFocus: boolean;
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export function LoginForm({ isSubmitting, autoFocus, isSelfRegistrationEnabled }: LoginFormProps) {
	const classes = useStyles();
	const { t } = useTranslation('AbpAccount');

	return (
		<Paper elevation={2} className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{t('Login')}
			</Typography>
			<Form className={classes.form} noValidate>
				<>
					<UsernameField required autoFocus={autoFocus} />
					<PasswordField required />
					<Field
						component={CheckboxWithLabel}
						color="primary"
						name="remember"
						type="checkbox"
						Label={{ label: t('RememberMe') }}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={isSubmitting}
					>
						{isSubmitting ? <CircularProgress color="secondary" /> : t('Login')}
					</Button>
					{isSelfRegistrationEnabled && (
						<Grid container>
							<Grid item>
								<Link href="/account/register" variant="inherit" color="textPrimary">
									{t('AreYouANewUser')} {t('Register')}
								</Link>
							</Grid>
						</Grid>
					)}
				</>
			</Form>
		</Paper>
	);
}

LoginForm.defaultProps = {
	isSelfRegistrationEnabled: true,
	isSubmitting: false,
};

export default LoginForm;
