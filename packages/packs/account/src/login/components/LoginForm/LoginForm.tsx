import React from 'react';
import { Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { CheckboxWithLabel } from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PasswordField } from '../PasswordField/PasswordField';
import { UsernameField } from '../UsernameField/UsernameField';

interface LoginFormProps {
	isSelfRegistrationEnabled: boolean;
	isSubmitting: boolean;
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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

export function LoginForm({ isSubmitting, ...props }: LoginFormProps) {
	const classes = useStyles();
	const { t } = useTranslation('AbpAccount');

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{t('Login')}
				</Typography>
				<Form className={classes.form} noValidate>
					<React.Fragment>
						<UsernameField required autoFocus />
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
						{props.isSelfRegistrationEnabled && (
							<Grid container>
								<Grid item>
									<Link href="#" variant="body2">
										{t('AreYouANewUser')} {t('Register')}
									</Link>
								</Grid>
							</Grid>
						)}
					</React.Fragment>
				</Form>
			</div>
		</Container>
	);
}

LoginForm.defaultProps = {
	isSelfRegistrationEnabled: true,
	isSubmitting: false,
};

export default LoginForm;
